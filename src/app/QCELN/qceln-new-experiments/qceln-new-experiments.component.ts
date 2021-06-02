import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ExperimentEnt, ExpVersionEnt, ProcessEnt } from './service/qcelnexperiment.model';
import { elnDataService } from "./service/qcelnexperiment.data.service";
import { ActivatedRoute, Router } from '@angular/router';
import { QCExperimentService } from "./service/qcelnexperiment.service";
import { NgbModal, NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { QCElnHeaderComponent } from './qceln-header/qceln-header.component';
import { QCElnIceqimDetailsComponent } from './qceln-iceqim-details/qceln-iceqim-details.component';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { QCElnPrecautionsComponent } from './qceln-precautions/qceln-precautions.component';
import { QCElnProcessSummaryComponent } from './qceln-experiments-process-result/qceln-experiments-process-result.component';
import { QCElnSignSubmitsComponent } from './qceln-sign-submits/qceln-sign-submits.component';
import { ToastrService } from 'ngx-toastr';
import { QCElnExperimentsAttachmentComponent } from './qceln-experiments-attachment/qceln-experiments-attachment.component';
import { isDefined } from '@angular/compiler/src/util';
import { QCElnSopComponent } from './qceln-sop/qceln-sop.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qceln-new-experiments',
  templateUrl: './qceln-new-experiments.component.html',
  styleUrls: ['./qceln-new-experiments.component.css']
})
export class QCElnNewExperimentsComponent implements OnInit, OnDestroy {
  @ViewChild('tabset', { static: false }) private tabset: NgbTabset;
  @ViewChild('tabAttachmentComponent', { static: false }) private tabAttachmentComponent: QCElnExperimentsAttachmentComponent;
  @ViewChild('tabHeaderComponent', { static: false }) private tabHeader: QCElnHeaderComponent;
  @ViewChild('tabPrecautionsComponent', { static: false }) private tabPrecautionsComponent: QCElnPrecautionsComponent;
  @ViewChild('tabProcedureComponent', { static: false }) private tabProcedureComponent: QCElnProcessSummaryComponent;
  @ViewChild('tabResultRemarkComponent', { static: false }) private tabResultRemarkComponent: QCElnProcessSummaryComponent;
  @ViewChild('tabConclusionSummaryComponent', { static: false }) private tabConclusionSummaryComponent: QCElnProcessSummaryComponent;
  @ViewChild('tabSigningComponent', { static: false }) private tabSigningComponent: QCElnSignSubmitsComponent;
  @ViewChild('tabICEQComponent', { static: false }) private tabICEQComponent: QCElnIceqimDetailsComponent;
  @ViewChild('tabSOPComponent', { static: false }) private tabSOPComponent: QCElnSopComponent;
  expVersionObj: ExpVersionEnt;
  private tabToMove: string = '';
  ProcedureComment: ProcessEnt[] = [{
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Procedure"
  }, {
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Comments"
  }];
  ResultRemarks: ProcessEnt[] = [{
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Result"
  }, {
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Remarks"
  }];
  ConclusionSummary: ProcessEnt[] = [{
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Conclusion"
  }, {
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Summary"
  }];
  subscription: Subscription;
  pdfData: object = {};
  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private _elnExperimentService: QCExperimentService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private _toastr: ToastrService,
    private data: elnDataService
  ) { }

  ngOnInit(): void {
    this.subscription = this.data.currenntVersionObj.subscribe(obj =>
      this.expVersionObj = obj
    );
    this.route.params.subscribe(params => {
      if (!isNaN(Number(params['Id']))) {
        this.GetVersionInfo(Number(params['Id']));
      }
    });
    this.setPageTitle('Header');
  }

  setPageTitle(title) {
    let NewEditLabel = (this.expVersionObj.VersionId > 0 ? 'Edit' : 'New') + ' Experiment - ';
    this.route.data['value'].urls[2].title = NewEditLabel + title;
  }

  ngOnDestroy() {
    this.expVersionObj = {
      ExperimentId: null, VersionId: null, IsAllowEdit: true, IsSendForApproval: false, VersionNo: null,
      IsRework: false, StatusCode: 'N', IsFavourite: false, IsAllowDiscontinue: false
    };
    this.data.setVersionInfo(this.expVersionObj);
    this.subscription.unsubscribe();
  }

  tabChanged(event) {
    this.tabToMove = event.nextId;
    switch (event.activeId) {
      case "tabHeader":
        if (this.expVersionObj.VersionId > 0) {
          if (this.expVersionObj.IsAllowEdit && this.tabHeader.elnHeaderForm.dirty) {
            event.preventDefault();
            this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
              if (result) {
                this.tabHeader.SaveExperiment();
              } else {
                this.tabHeader.elnHeaderForm.markAsPristine();
                this.tabset.select(this.tabToMove);
              }
            });
          }
        } else {
          event.preventDefault();
          this.tabHeader.SaveExperiment();
        }
        break;
      case "tabPrecautions":
        if (this.tabPrecautionsComponent.elnPrecautionForm.dirty) {
          event.preventDefault();
          this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
            if (result) {
              this.tabPrecautionsComponent.SavePrecaution();
            } else {
              this.tabPrecautionsComponent.elnPrecautionForm.markAsPristine();
              this.tabset.select(this.tabToMove);
            }
          });
        }
        break;
      case "tabProcedure":
        if (this.tabProcedureComponent.processSummaryForm.dirty) {
          event.preventDefault();
          this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
            if (result) {
              this.tabProcedureComponent.SaveProcessResult();
            } else {
              this.tabProcedureComponent.processSummaryForm.markAsPristine();
              this.tabset.select(this.tabToMove);
            }
          });
        }
        break;
      case "tabResultRemark":
        if (this.tabResultRemarkComponent.processSummaryForm.dirty) {
          event.preventDefault();
          this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
            if (result) {
              this.tabResultRemarkComponent.SaveProcessResult();
            } else {
              this.tabResultRemarkComponent.processSummaryForm.markAsPristine();
              this.tabset.select(this.tabToMove);
            }
          });
        }
        break;
      case "tabConclusionSummary":
        if (this.tabConclusionSummaryComponent.processSummaryForm.dirty) {
          event.preventDefault();
          this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
            if (result) {
              this.tabConclusionSummaryComponent.SaveProcessResult();
            } else {
              this.tabConclusionSummaryComponent.processSummaryForm.markAsPristine();
              this.tabset.select(this.tabToMove);
            }
          });
        }
        break;
      case "tabSigning":
        if (this.tabSigningComponent.userSignaturePad != null && this.tabSigningComponent.userSignaturePad.isEmpty() != true) {
          event.preventDefault();
          this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
            if (result) {
              this.tabSigningComponent.SendForApproval();
            } else {
              this.tabSigningComponent.userSignaturePad.clear();
              this.tabset.select(this.tabToMove);
            }
          });
        }
        break;
      default:
        break;
    }
    switch (event.nextId) {
      case "tabHeader":
        this.setPageTitle('Header');
        break;
      case "tabICEQ":
        this.setPageTitle(this.tabICEQComponent.tabset.activeId.replace('tab', ''));
        break;
      case "tabSOP":
        this.setPageTitle('SOP');
        break;
      case "tabSampleInformation":
        this.setPageTitle('Sample Information');
        break;
      case "tabAttachment":
        this.setPageTitle('Attachment');
        this.tabAttachmentComponent.fileManagerCtrl.refresh();
        break;
      case "tabPrecautions":
        this.setPageTitle('Precaution');
        if (!this.tabPrecautionsComponent.elnPrecautionForm.touched) {
          setTimeout(() => {
            this.tabPrecautionsComponent.docEditorControl.container.resize();
            this.tabPrecautionsComponent.docEditorControl.container.documentEditor.focusIn();
          });
          this.tabPrecautionsComponent.docEditorControl.configureDocumentEditor(this.tabPrecautionsComponent.docEditorControl.container);
          this.tabPrecautionsComponent.elnPrecautionForm.markAsPristine();
        }
        break;
      case "tabProcedure":
        this.tabProcedureComponent.tabChanged(2);
        break;
      case "tabResultRemark":
        this.tabResultRemarkComponent.tabChanged(2);
        break;
      case "tabConclusionSummary":
        this.tabConclusionSummaryComponent.tabChanged(2);
        break;
      case "tabSigning":
        this.setPageTitle('Sign & Submit');
        break;
      default: break;
    }
  }

  SaveFavouriteVersion() {
    this.expVersionObj.IsFavourite = !this.expVersionObj.IsFavourite;
    this._elnExperimentService.saveFavouriteVersion(this.expVersionObj).subscribe((data) => {
      this._toastr.success(data['ResultMessage']);
    });
  }

  GetVersionInfo(versionId: number) {
    if (versionId > 0) {
      this._elnExperimentService.getVersionInfo(versionId).subscribe((data) => {
        if (data['Result'] == true && data['Object'] != null) {
          this.data.setVersionInfo(data['Object']);
          this.setPageTitle('Header');
          if (this.expVersionObj.IsAllowEdit && this.expVersionObj.StatusCode == 'R') {
            this.tabset.select('tabSigning');
          }
          this._elnExperimentService.getProcessResultList(this.expVersionObj).subscribe((data) => {
            let objList = data['Object'];
            objList.forEach(element => {
              if (element.ContentType == 'Procedure' || element.ContentType == 'Comments') {
                this.ProcedureComment.forEach(item => {
                  if (item.ContentType == element.ContentType) {
                    item.ContentBody = element.ContentBody;
                    item.Id = element.Id;
                  }
                });
              }
              else if (element.ContentType == 'Result' || element.ContentType == 'Remarks') {
                this.ResultRemarks.forEach(item => {
                  if (item.ContentType == element.ContentType) {
                    item.ContentBody = element.ContentBody;
                    item.Id = element.Id;
                  }
                });
              }
              else if (element.ContentType == 'Conclusion' || element.ContentType == 'Summary') {
                this.ConclusionSummary.forEach(item => {
                  if (item.ContentType == element.ContentType) {
                    item.ContentBody = element.ContentBody;
                    item.Id = element.Id;
                  }
                });
              }
            });
          });
        }
      });
    }
  }

  PrintReport(printMoodel) {
    this.pdfData['Header'] = this.tabHeader.elnHeaderForm.getRawValue();
    this.pdfData['InstrumentList'] = this.tabICEQComponent.ELNInstrumentList;
    this.pdfData['EquipmentList'] = this.tabICEQComponent.ELNEquipmentList;
    this.pdfData['SOPList'] = this.tabSOPComponent.SOPList;
    this.pdfData['ReworkList'] = this.tabSigningComponent.ReworkList;
    this.pdfData['Precaution'] = this.tabPrecautionsComponent.elnPrecautionForm.get('ContentBody').value;
    let arrayList = [];
    this.ProcedureComment.forEach(function (item) {
      arrayList.push(item);
    });
    this.ResultRemarks.forEach(function (item) {
      arrayList.push(item);
    });
    this.ConclusionSummary.forEach(function (item) {
      arrayList.push(item);
    });
    this.pdfData['DocumentEditorList'] = arrayList;
    this.pdfData['InitiatorSignature'] = this.tabSigningComponent.InitiatorSignature;
    if (this.pdfData['InitiatorSignature']['UserSignature'] != null) {
      this._elnExperimentService.getBase64Img(this.pdfData['InitiatorSignature']['UserSignature'])
        .subscribe(base64ImageUrl => {
          this.pdfData['InitiatorSignature']['UserSignatureBase64'] = base64ImageUrl;
        });
    }

    this.tabSigningComponent.UserSignatureList.forEach(function (item: ProcessEnt) {
      if (item['UserSignature'] != null) {
        this._elnExperimentService.getBase64Img(item['UserSignature'])
          .subscribe(base64ImageUrl => {
            item['UserSignatureBase64'] = base64ImageUrl;
          });
      }
    }, this)

    this.pdfData['UserSignatureList'] = this.tabSigningComponent.UserSignatureList;
    this.modalService.open(printMoodel, {
      centered: true, size: 'lg', backdrop: 'static', keyboard: false
    }).result.then(result => {
    });
  }

  PrintPDF() {
    let pdfContent = document.getElementById('pdfDivContent').innerHTML;
    //pdfContent ="<div><h5>h5 content</h5><label>test</label></div>";
    this._elnExperimentService.printReport({ 'htmlContent': pdfContent }).subscribe((result) => {
      var file = new Blob([result], { type: 'application/pdf;base64' });
      var fileURL = window.URL.createObjectURL(file);
      window.open(fileURL, '_blank', '');
    });
  }

  CreateNewVersion() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you want to create new version this experiment ?', 'Yes', 'No').then((result) => {
      if (result) {
        this._elnExperimentService.createNewVersion(this.expVersionObj).subscribe((data) => {
          if (data['Result']) {
            this._toastr.success(data['ResultMessage']);
            let versionObj = data['Object'] as ExpVersionEnt;
            this.router.navigate(['/elnexperiments/edit', versionObj.VersionId]);
          } else {
            this._toastr.error(data['ResultMessage']);
          }
        });
      }
    });
  }

  openPopup(content) {
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static', keyboard: false
    }).result.then(result => {
      if (isDefined(result)) {
        if (result) {
          this._elnExperimentService.createNewVersion(this.expVersionObj).subscribe((data) => {
            if (data['Result']) {
              this._toastr.success(data['ResultMessage']);
              let versionObj = data['Object'] as ExpVersionEnt;
              this.router.navigate(['/elnexperiments/edit', versionObj.VersionId]);
            } else {
              this._toastr.error(data['ResultMessage']);
            }
          });
        } else {
          this._elnExperimentService.commitExperiment(this.expVersionObj).subscribe((data) => {
            if (data['Result']) {
              this._toastr.success(data['ResultMessage']);
              this.data.setVersionInfo(data['Object']);
            } else {
              this._toastr.error(data['ResultMessage']);
            }
          });
        }
      }
    });
  }

  moveToTab(tabId) {
    this.tabset.select(tabId);
  }

  ManageTabChange(resp) {
    if (resp) {
      setTimeout(() => {
        this.tabset.select(this.tabToMove);
      });
    }
  }
}