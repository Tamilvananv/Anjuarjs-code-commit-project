import { Component, Output, AfterViewInit, ViewChild, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { EditService, SortService, GridLine, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { elnDataService } from "../service/experiment.data.service";
import { ExperimentService } from "../service/experiment.service";
import { ExpVersionEnt, ProcessEnt } from "../service/experiment.model";
import { FormBuilder, FormGroup, FormControlName } from '@angular/forms';
import { DocumentEditorAppComponent } from 'src/app/shared HTML/document-editor/app-document-editor-component';
import { DocumentEditorAppConfiguration } from 'src/app/shared HTML/document-editor/app-document-editor-model';
import { isDefined } from '@angular/compiler/src/util';
import { LoginService } from 'src/app/login/Service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eln-precautions',
  templateUrl: './eln-precautions.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./eln-precautions.component.css']
})
export class ElnPrecautionsComponent implements OnInit {
  @Output('callback') parentCallback: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('documentEditor', { static: false }) public docEditorControl: DocumentEditorAppComponent;
  public configSetting: DocumentEditorAppConfiguration = {
    defaultContent: null, currentUser: null, allowEdit: true, allowComment: true, allowTrackChanges: false
  };

  constructor(
    private formbuilder: FormBuilder,
    private data: elnDataService,
    private _commonListService: CommonListService,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private loginUserSer: LoginService,
    private _elnExperimentService: ExperimentService,
  ) { }

  closeResult: string;
  public height: string = '220px';
  expVersionObj: ExpVersionEnt;
  elnPrecautionForm: FormGroup;
  versionWatch: Subscription;
  IsRefreshView: boolean = true;

  ngOnInit(): void {
    this.initForm();
    this.versionWatch = this.data.currenntVersionObj.subscribe(obj => {
      this.expVersionObj = obj;
      if (this.expVersionObj.ExperimentId > 0) {
        this.GetPrecaution();
      }
      let loginUser = this.loginUserSer.getLoginUser();
      this.configSetting.allowEdit = this.expVersionObj.IsAllowEdit;
      this.configSetting.allowTrackChanges = this.expVersionObj.IsAllowEdit &&
        (this.expVersionObj.StatusCode == 'P' || this.expVersionObj.StatusCode == 'R');
      this.configSetting.allowComment = this.expVersionObj.StatusCode == 'P' || this.expVersionObj.StatusCode == 'R';
      this.configSetting.currentUser = loginUser['UserEmail'];
    });
  }

  initForm() {
    this.elnPrecautionForm = this.formbuilder.group({
      ExperimentId: [''],
      VersionId: [''],
      ContentBody: [''],
      OldContent: [''],
      ContentType: ['Precaution']
    })
  }

  resetForm() {
    this.elnPrecautionForm.reset();
  }

  moveToTab(tabToMove) {
    this.parentTabMove.emit(tabToMove);
  }

  SavePrecaution() {
    if (this.elnPrecautionForm.valid) {
      this.elnPrecautionForm.patchValue({
        ExperimentId: this.expVersionObj.ExperimentId,
        VersionId: this.expVersionObj.VersionId,
        ContentType: 'Precaution'
      });
      this.docEditorControl.container.documentEditor.saveAsBlob('Docx').then((doc) => {
        let docData = doc;
        this._elnExperimentService.savePrecaution(this.elnPrecautionForm.value, docData).subscribe((data) => {
          this._toastr.success(data['ResultMessage']);
          this.GetPrecaution();
          this.parentCallback.emit(true);
          this.elnPrecautionForm.markAsPristine();
        });
      });
    }
  }

  GetPrecaution() {
    if (this.expVersionObj != null && this.expVersionObj.VersionId > 0) {
      this._elnExperimentService.getPrecaution(this.expVersionObj).subscribe((data) => {
        this.elnPrecautionForm.patchValue(data['Object']);
        this.elnPrecautionForm.patchValue({
          OldContent: data['Object']['ContentBody']
        });
        this.configSetting.defaultContent = this.elnPrecautionForm.get('ContentBody').value;
        this.elnPrecautionForm.markAsPristine();
        this.parentCallback.emit(true);
      });
    }
  }

  onContentChanged(flag) {
    if (flag && isDefined(this.elnPrecautionForm)) {
      this.elnPrecautionForm.markAsDirty();
    }
  }

  ngOnDestroy() {
    this.versionWatch.unsubscribe();
  }
}