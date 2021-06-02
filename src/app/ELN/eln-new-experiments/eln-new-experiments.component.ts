import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ExperimentEnt, ExpVersionEnt, ProcessEnt } from './service/experiment.model';
import { elnDataService } from "./service/experiment.data.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ExperimentService } from "./service/experiment.service";
import { NgbModal, NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { ElnHeaderComponent } from './eln-header/eln-header.component';
import { ElnIceqimDetailsComponent } from './eln-iceqim-details/eln-iceqim-details.component';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { ElnPrecautionsComponent } from './eln-precautions/eln-precautions.component';
import { ElnProcessSummaryComponent } from './eln-experiments-process-result/eln-experiments-process-result.component';
import { ElnSignSubmitsComponent } from './eln-sign-submits/eln-sign-submits.component';
import { ToastrService } from 'ngx-toastr';
import { ElnExperimentsAttachmentComponent } from './eln-experiments-attachment/eln-experiments-attachment.component';
import { isDefined } from '@angular/compiler/src/util';
import { ElnSopComponent } from './eln-sop/eln-sop.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eln-new-experiments',
  templateUrl: './eln-new-experiments.component.html',
  styleUrls: ['./eln-new-experiments.component.css']
})
export class ElnNewExperimentsComponent implements OnInit, OnDestroy {
  @ViewChild('tabset', { static: false }) private tabset: NgbTabset;
  @ViewChild('tabAttachmentComponent', { static: false }) private tabAttachmentComponent: ElnExperimentsAttachmentComponent;
  @ViewChild('tabHeaderComponent', { static: false }) private tabHeader: ElnHeaderComponent;
  @ViewChild('tabPrecautionsComponent', { static: false }) private tabPrecautionsComponent: ElnPrecautionsComponent;
  @ViewChild('tabProcedureComponent', { static: false }) private tabProcedureComponent: ElnProcessSummaryComponent;
  @ViewChild('tabResultRemarkComponent', { static: false }) private tabResultRemarkComponent: ElnProcessSummaryComponent;
  @ViewChild('tabConclusionSummaryComponent', { static: false }) private tabConclusionSummaryComponent: ElnProcessSummaryComponent;
  @ViewChild('tabSigningComponent', { static: false }) private tabSigningComponent: ElnSignSubmitsComponent;
  @ViewChild('tabICEQComponent', { static: false }) private tabICEQComponent: ElnIceqimDetailsComponent;
  @ViewChild('tabSOPComponent', { static: false }) private tabSOPComponent: ElnSopComponent;
  expVersionObj: ExpVersionEnt;
  private tabToMove: string = '';
  ProcedureComment: ProcessEnt[] = [{
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Procedure", OldContent: '', IsRefreshView: true
  }, {
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Comments", OldContent: '', IsRefreshView: true
  }];
  ResultRemarks: ProcessEnt[] = [{
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Result", OldContent: '', IsRefreshView: true
  }, {
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Remarks", OldContent: '', IsRefreshView: true
  }];
  ConclusionSummary: ProcessEnt[] = [{
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Conclusion", OldContent: '', IsRefreshView: true
  }, {
    ExperimentId: null, VersionId: null, Id: null,
    ContentBody: '', ContentType: "Summary", OldContent: '', IsRefreshView: true
  }];
  pdfData: object = {};
  versionWatch: Subscription
  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private _elnExperimentService: ExperimentService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private _toastr: ToastrService,
    private data: elnDataService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (!isNaN(Number(params['Id']))) {
        this.GetVersionInfo(Number(params['Id']));
      }
      this.versionWatch = this.data.currenntVersionObj.subscribe(obj =>
        this.expVersionObj = obj
      );
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
    this.versionWatch.unsubscribe();
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
              this.tabPrecautionsComponent.IsRefreshView = false;
              let oldValue = this.tabPrecautionsComponent.elnPrecautionForm.get('OldContent').value;
              console.log(oldValue);
              this.tabPrecautionsComponent.elnPrecautionForm.patchValue({
                ContentBody: oldValue
              });
              setTimeout(() => {
                this.tabPrecautionsComponent.IsRefreshView = true;
              }, 500);
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
              this.tabResultRemarkComponent.list.forEach((item) => {
                item['ContentBody'] = item['OldContent'];
                item['IsRefreshView'] = false;
              });
              setTimeout(() => {
                this.tabResultRemarkComponent.list.forEach((item) => {
                  item['IsRefreshView'] = true;
                });
              }, 500);
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
              this.tabResultRemarkComponent.list.forEach((item) => {
                item['ContentBody'] = item['OldContent'];
                item['IsRefreshView'] = false;
              });
              setTimeout(() => {
                this.tabResultRemarkComponent.list.forEach((item) => {
                  item['IsRefreshView'] = true;
                });
              }, 500);
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
              this.tabConclusionSummaryComponent.list.forEach((item) => {
                item['ContentBody'] = item['OldContent'];
                item['IsRefreshView'] = false;
              });
              setTimeout(() => {
                this.tabConclusionSummaryComponent.list.forEach((item) => {
                  item['IsRefreshView'] = true;
                });
              }, 500);
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
                    item.OldContent = element.ContentBody;
                    item.Id = element.Id;
                  }
                });
              }
              else if (element.ContentType == 'Result' || element.ContentType == 'Remarks') {
                this.ResultRemarks.forEach(item => {
                  if (item.ContentType == element.ContentType) {
                    item.ContentBody = element.ContentBody;
                    item.OldContent = element.ContentBody;
                    item.Id = element.Id;
                  }
                });
              }
              else if (element.ContentType == 'Conclusion' || element.ContentType == 'Summary') {
                this.ConclusionSummary.forEach(item => {
                  if (item.ContentType == element.ContentType) {
                    item.ContentBody = element.ContentBody;
                    item.OldContent = element.ContentBody;
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
    this.pdfData['ExperimentObj'] = this.tabHeader.expVersionObj;
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
    }.bind(this));

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
          this._elnExperimentService.commitAndNewVersion(this.expVersionObj).subscribe((data) => {
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

  onApproverChanged() {
    this.tabSigningComponent.GetUserSignature();
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