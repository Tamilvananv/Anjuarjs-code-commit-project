import { Component, Input, ViewChild, OnInit, ViewEncapsulation, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { ExperimentService } from "../service/experiment.service";
import { elnDataService } from "../service/experiment.data.service";
import { ProcessEnt, ExpVersionEnt } from "../service/experiment.model";
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { DocumentEditorAppConfiguration } from 'src/app/shared HTML/document-editor/app-document-editor-model';
import { DocumentEditorAppComponent } from 'src/app/shared HTML/document-editor/app-document-editor-component';
import { isDefined } from '@angular/compiler/src/util';
import { LoginService } from 'src/app/login/Service/login.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { isNumber } from 'lodash';

@Component({
  selector: 'app-eln-experiments-process-result',
  templateUrl: './eln-experiments-process-result.component.html',
  providers: [ToolbarService],
  styleUrls: ['./eln-experiments-process-result.component.css']
})
export class ElnProcessSummaryComponent implements OnInit {
  @ViewChildren('documentEditor') public docEditorControl: QueryList<DocumentEditorAppComponent>;
  public configSetting: DocumentEditorAppConfiguration = {
    defaultContent: null, currentUser: null, allowEdit: true, allowComment: true, allowTrackChanges: false
  };
  processSummaryForm: FormGroup;
  @Output('callback') parentCallback: EventEmitter<boolean> = new EventEmitter<boolean>();;
  @ViewChild('tabset', { static: false }) public tabset: NgbTabset;
  @Input() list: ProcessEnt[];
  expVersionObj: ExpVersionEnt;
  IsDocumentEditorResized: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private data: elnDataService,
    private route: ActivatedRoute,
    private _toastr: ToastrService,
    private _commonListService: CommonListService,
    private _elnExperimentService: ExperimentService,
    private loginUser: LoginService
  ) { }

  GetTools() {
    return this._commonListService.GetTools();
  }

  ngOnInit() {
    //this.initForm();
    this.data.currenntVersionObj.subscribe(obj => {
      this.expVersionObj = obj;
      if (this.expVersionObj.VersionId > 0) {
        this.initForm();
      }
      let loginUser = this.loginUser.getLoginUser();
      this.configSetting.allowEdit = this.expVersionObj.IsAllowEdit;
      this.configSetting.allowComment = this.expVersionObj.StatusCode == 'P' || this.expVersionObj.StatusCode == 'R';
      this.configSetting.allowTrackChanges = this.expVersionObj.IsAllowEdit &&
        (this.expVersionObj.StatusCode == 'P' || this.expVersionObj.StatusCode == 'R');
      this.configSetting.currentUser = loginUser['UserEmail'];
    });
  }

  initForm() {
    this.processSummaryForm = this.formBuilder.group({
      RTFList: new FormArray([])
    });
    this.list.forEach(element => {
      (this.processSummaryForm.controls.RTFList as FormArray).push(this.formBuilder.group({
        ContentType: [element.ContentType],
        Content: [element.ContentBody],
        ExperimentId: [this.expVersionObj ? this.expVersionObj.ExperimentId : null],
        VersionId: [this.expVersionObj ? this.expVersionObj.VersionId : null]
      }));
    });
  }

  tabChanged(event) {
    this.docEditorControl.forEach(ctrl => {
      setTimeout(obj => {
        ctrl.container.resize();
        ctrl.container.documentEditor.focusIn();
      });
      ctrl.configureDocumentEditor(ctrl.container);
      //this.processSummaryForm.markAsPristine();
    });
    let NewEditLabel = (this.expVersionObj.VersionId > 0 ? 'Edit' : 'New') + ' Experiment - ';
    if (isNumber(event)) {
      this.route.data['value'].urls[2].title = NewEditLabel + this.tabset.activeId;
    } else {
      this.route.data['value'].urls[2].title = NewEditLabel + event.nextId;
    }
  }

  //get RTFList() { return this.processSummaryForm.controls.RTFList as FormArray; }

  SaveProcessResult() {
    let fileArray = [];
    let instance = this;
    instance.list.forEach(element => {
      element.ExperimentId = this.expVersionObj.ExperimentId;
      element.VersionId = this.expVersionObj.VersionId;
    });
    async function awaitingRequest() {
      for (var i = 0; i < instance.docEditorControl.length; i++) {
        await instance.docEditorControl.toArray()[i].container.documentEditor.saveAsBlob('Docx').then(async doc => {
          await fileArray.push({
            Type: instance.list[i].ContentType,
            File: doc
          });
        });
      }
    }
    awaitingRequest().then((resp) => {
      this._elnExperimentService.saveProcessResult(instance.list, fileArray).subscribe((data) => {
        this._toastr.success(data['ResultMessage']);
        instance.list.forEach(function (item) {
          data['Object'].forEach(function (saveItem) {
            if (item.ContentType == saveItem.ContentType) {
              item.ContentBody = saveItem.ContentBody;
              item.OldContent = saveItem.ContentBody;
            }
          });
        });
        this.processSummaryForm.markAsPristine();
        this.parentCallback.emit(true);
      })
    });
  }

  onContentChanged(flag) {
    if (flag && isDefined(this.processSummaryForm)) {
      this.processSummaryForm.markAsDirty();
    }
  }
}