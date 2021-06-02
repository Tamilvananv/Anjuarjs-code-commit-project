import { Component, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { EditService, SortService, GridLine, EditSettingsModel, ToolbarItems, IEditCell, FilterService, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { elnDataService } from "../service/qcelnexperiment.data.service";
import { QCExperimentService } from "../service/qcelnexperiment.service";
import { ExpVersionEnt } from "../service/qcelnexperiment.model";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { Formatter } from '@syncfusion/ej2-angular-richtexteditor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qceln-sign-submits',
  templateUrl: './qceln-sign-submits.component.html',
  providers: [EditService, SortService, FilterService],
  styleUrls: ['./qceln-sign-submits.component.css']
})
export class QCElnSignSubmitsComponent implements OnInit, AfterViewInit {
  @ViewChild('approvalModel', { static: false }) approvalModel;
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();;
  closeResult: string;
  public lines: GridLine = "Both";
  public editSettings: EditSettingsModel;
  public filterOptions: FilterSettingsModel;
  expVersionObj: ExpVersionEnt = {
    ExperimentId: null, VersionId: null, IsAllowEdit: true, IsSendForApproval: false,VersionNo: null,
    IsRework: false, StatusCode: 'N', IsFavourite: false, IsAllowDiscontinue: false
  };
  ReworkForm: FormGroup;
  public UserSignatureList: [];
  public InitiatorSignature: object;
  ReworkList: object[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private formError: FormErrorDisplayService,
    private _toastr: ToastrService,
    private data: elnDataService,
    private _elnExperimentService: QCExperimentService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.ReworkList = [];
    this.UserSignatureList = [];
    this.InitiatorSignature = {};
    this.initForm();
    this.data.currenntVersionObj.subscribe(obj => {
      const IsChanged = this.expVersionObj.VersionId !== obj.VersionId;
      this.expVersionObj = obj;
      this.expVersionObj.VersionId = obj.VersionId;
      if (this.expVersionObj != null && IsChanged && this.expVersionObj.ExperimentId > 0) {
        this.GetUserSignature();
        this.GetReworkList();
      }
    });
  };

  initForm() {
    this.ReworkForm = this.formBuilder.group({
      ExperimentId: [''],
      VersionId: [''],
      Reason: ['', Validators.required],
      Date: ['', Validators.required]
    });
  }

  moveToTab(tabToMove) {
    this.parentTabMove.emit(tabToMove);
  }

  resetForm() {
    this.ReworkForm.reset();
  }

  loadFile(fileUrl) {
    return environment.apiUrl + '/FileManager/GetAWSFile?filePath=' + fileUrl;
  }

  ngAfterViewInit() {
  }

  @ViewChild(SignaturePad, { static: false }) userSignaturePad: SignaturePad;

  public signaturePadOptions = {
    dotSize: 1.5,
    minWidth: 1,
    maxWidth: 3,
    canvasWidth: 260,
    canvasHeight: 150,
    throttle: 16,
    backgroundColor: '#ffff80',
    penColor: '#000',
    velocityFilterWeight: 0.7
  };

  openReworkPopup(content) {
    this.ReworkForm.patchValue({
      Date: new Date()
    });
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static',
      keyboard: false
    }).result.then(result => {
      this.closeResult = `Closed with: ${result}`;
    }, reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  CloseModal() {
    this.modalService.dismissAll();
    this.ReworkForm.reset();
  }

  ResetSignaturePad() {
    this.userSignaturePad.clear();
  }

  UndoSignaturePad() {
    let signatureData = this.userSignaturePad.toData();
    signatureData.pop();
    this.userSignaturePad.fromData(signatureData);
  }

  drawComplete() {
    console.log(this.userSignaturePad.toDataURL());
    console.log(this.userSignaturePad.toDataURL("image/svg+xml"));
    let fileobj = this.dataURLtoFile(this.userSignaturePad.toDataURL("image/svg+xml"), "signa.svg");
    console.log(fileobj);
  }

  private dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  GetUserSignature() {
    this._elnExperimentService.getUserSignature(this.expVersionObj).subscribe((data) => {
      this.UserSignatureList = data['Object'].UserSignatureList;
      this.InitiatorSignature = data['Object'].InitiatorSignature;
    });
  }

  GetReworkList() {
    this._elnExperimentService.getReworkList(this.expVersionObj).subscribe((data) => {
      this.ReworkList = data['Object'];
    });
  }

  AddRework() {
    if (this.ReworkForm.valid) {
      this.ReworkForm.patchValue({
        ExperimentId: this.expVersionObj.ExperimentId,
        VersionId: this.expVersionObj.VersionId,
      });
      this._elnExperimentService.addRework(this.ReworkForm.value).subscribe((data) => {
        this.CloseModal();
        this._toastr.success(data['ResultMessage']);
        this.data.setVersionInfo(data['Object']);
        this.GetReworkList();
        this.GetUserSignature();
      });
    } else {
      this.formError.showErrors(this.ReworkForm);
    }
  }

  MarkAsComplete(event, reworkObj) {
    this._elnExperimentService.reworkMarkAsComplete(reworkObj).subscribe((data) => {
      this._toastr.success(data['ResultMessage']);
    });
  }

  SendForApproval() {
    if ((this.userSignaturePad == undefined && this.InitiatorSignature['UserSignature'] != null) || !this.userSignaturePad.isEmpty()) {
      let fileobj;
      if (this.userSignaturePad) {
        fileobj = this.dataURLtoFile(this.userSignaturePad.toDataURL("image/svg+xml"), "signature.svg");
      }
      this._elnExperimentService.sendForApproval(this.expVersionObj, fileobj).subscribe((data) => {
        if (data['Result']) {
          this._toastr.success(data['ResultMessage']);
          this.GetUserSignature();
          this.data.setVersionInfo(data['Object']);
        } else {
          this._toastr.error(data['ResultMessage']);
        }
      });
    } else {
      this._toastr.error("Signature is required");
    }
  }

  SaveApproval(obj) {
    if ((this.userSignaturePad == undefined && obj.UserSignature != null) || !this.userSignaturePad.isEmpty()) {
      obj.ExperimentId = this.expVersionObj.ExperimentId;
      obj.VersionId = this.expVersionObj.VersionId;

      let fileobj;
      if (this.userSignaturePad) {
        fileobj = this.dataURLtoFile(this.userSignaturePad.toDataURL("image/svg+xml"), "approval.svg");
      }
      this._elnExperimentService.saveApproval(obj, fileobj).subscribe((data) => {
        if (data['Result']) {
          if (data['Object']['IsAllowRework']) {
            this.modalService.open(this.approvalModel, {
              centered: true, size: 'lg', backdrop: 'static', keyboard: false
            }).result.then(result => {
              this.closeResult = `Closed with: ${result}`;
            }, reason => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
          }
          this.data.setVersionInfo(data['Object']);
          this.GetUserSignature();
        } else {
          this._toastr.error(data['ResultMessage']);
        }
      });
    } else {
      this._toastr.error("Signature is required for approval");
    }
  }
}