import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { EditService, SortService, GridLine, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { elnDataService } from "../service/qcelnexperiment.data.service";
import { QCExperimentService } from "../service/qcelnexperiment.service";
import { ExpVersionEnt, SOPEnt } from "../service/qcelnexperiment.model";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { EmitType } from '@syncfusion/ej2-base';
import { environment } from 'src/environments/environment';
import { SelectedEventArgs } from '@syncfusion/ej2-inputs';

@Component({
  selector: 'app-qceln-sop',
  templateUrl: './qceln-sop.component.html',
  providers: [EditService, SortService],
  styleUrls: ['./qceln-sop.component.css']
})
export class QCElnSopComponent implements OnInit {
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();;
  readonly _restApi = environment.apiUrl + '/api/experiment/';

  constructor(
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService,
    private data: elnDataService,
    private _commonListService: CommonListService,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private _elnExperimentService: QCExperimentService,
  ) { }

  GetTools() {
    return this._commonListService.GetTools();
  }

  closeResult: string;
  public lines: GridLine = "Both";
  public height: string = '220px';
  expVersionObj: ExpVersionEnt;
  SOPList: object[];
  SOPForm: FormGroup;

  openPopup(content) {
    this.resetForm();
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static', keyboard: false
    }).result.then(result => {
      this.closeResult = 'Closed with:' + result;
    }, reason => {
      this.closeResult = 'Dismissed';
    });
  }
  CloseModal() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.initForm();
    this.data.currenntVersionObj.subscribe(obj => {
      const IsChanged = this.expVersionObj != undefined && this.expVersionObj.VersionId !== obj.VersionId;
      this.expVersionObj = obj;
      if (this.expVersionObj != null && this.expVersionObj.VersionId > 0 && IsChanged) {
        this.GetSOPList();
      }
    });
  }

  moveToTab(tabToMove) {
    this.parentTabMove.emit(tabToMove);
  }

  initForm() {
    this.SOPForm = this.formBuilder.group({
      ExperimentId: [''],
      VersionId: [''],
      Title: ['', Validators.required],
      QualificationStatus: ['', Validators.required],
      GeneralProcedureAttachment: [],
      Remark: ['']
    });
  }

  resetForm() {
    this.SOPForm.reset();
    this.SOPForm.patchValue({
      QualificationStatus: 'true'
    });
  }

  DownlLoadFile(filePath) {
    this._elnExperimentService.downloadFile(filePath).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  }

  GetSOPList() {
    if (this.expVersionObj != null && this.expVersionObj.VersionId > 0) {
      this._elnExperimentService.getSOPList(this.expVersionObj).subscribe((data) => {
        this.SOPList = data['Object'];
      });
    }
  }

  public onremoving: EmitType<SelectedEventArgs> = (args: any) => {
    this.SOPForm.patchValue({
      GeneralProcedureAttachment: null
    });
  };

  AddSOP() {
    if (this.SOPForm.valid) {
      this.SOPForm.patchValue({
        ExperimentId: this.expVersionObj.ExperimentId,
        VersionId: this.expVersionObj.VersionId
      });
      let file = this.SOPForm.get('GeneralProcedureAttachment').value;
      if (file != null) {
        this._elnExperimentService.addSOP(this.SOPForm.value, file).subscribe((data) => {
          this.resetForm();
          this.CloseModal();
          this._toastr.success(data['ResultMessage']);
          this.GetSOPList();
        });
      } else {
        this._toastr.error('General procedure file is required');
      }
    } else {
      this.formErrorDisplay.showErrors(this.SOPForm);
    }
  }

  public onFileSelect: EmitType<Object> = (args: any) => {
    this.SOPForm.patchValue({
      GeneralProcedureAttachment: args.filesData[0].rawFile
    });
  }
}