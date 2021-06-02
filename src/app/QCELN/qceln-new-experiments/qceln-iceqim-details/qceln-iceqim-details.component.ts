
import { Component, OnInit, EventEmitter, Output, ViewChild, QueryList } from '@angular/core';
import { FilterSettingsModel, GridComponent, GridLine, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from "ngx-toastr";
import { QCExperimentService } from "../service/qcelnexperiment.service";
import { ExpVersionEnt } from "../service/qcelnexperiment.model";
import { elnDataService } from "../service/qcelnexperiment.data.service";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qceln-iceqim-details',
  templateUrl: './qceln-iceqim-details.component.html',
  styleUrls: ['./qceln-iceqim-details.component.css'],
})
export class QCElnIceqimDetailsComponent implements OnInit {
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();;
  @ViewChild('tabset', { static: false }) public tabset: NgbTabset;
  closeResult: string;
  public lines: GridLine;
  public InstrumentList: object[];
  public InstrumentTypeList: object[];
  public MaterialList: object[];
  public EquipmentList: object[];
  public EquipmentTypeList: object[];
  // maps the appropriate column to fields property
  public drpdwnfields: Object = { text: 'Name', value: 'Id' };
  public drpdwntypefields: Object = { text: 'Name', value: 'Code' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to ComboBox input element
  public watermark: string = 'Select';
  ELNInstrumentList: object[];
  ELNEquipmentList: object[];
  ELNMaterialList: object[];
  subscription: Subscription;
  expVersionObj: ExpVersionEnt;
  public toolbar: string[];
  public searchSettings: SearchSettingsModel;
  public filterOptions: FilterSettingsModel;
  constructor(
    private data: elnDataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private _elnExperimentService: QCExperimentService,
  ) { }

  openPopup(content, popupType) {
    if (popupType == 'instrument') {
      this.GetInstrumentList();
    } else if (popupType == 'equipment') {
      this.GetEquipmentList();
    } else if (popupType == 'material') {
      this.GetMaterialList();
    }
    this.modalService.open(content, {
      centered: true, size: <any>'xl', backdrop: 'static',
      keyboard: false, windowClass: 'maxSizePopup'
    }).result.then(result => {
      this.closeResult = `Closed with: ${result}`;
    }, reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  CloseModal() {
    this.modalService.dismissAll();
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
  ngOnInit(): void {
    this.toolbar = ['Search'];
    this.filterOptions = { type: 'Menu' };
    this.subscription =this.data.currenntVersionObj.subscribe(obj => {
      const IsChanged = this.expVersionObj != undefined && this.expVersionObj.VersionId !== obj.VersionId;
      this.expVersionObj = obj;
      if (this.expVersionObj != null && this.expVersionObj.VersionId > 0 && IsChanged) {
        this.GetELNInstrumentList(this.expVersionObj);
        this.GetELNEquipmentList(this.expVersionObj);
        this.GetELNMaterialList(this.expVersionObj);
      }
    });
    this.lines = 'Both';
  }

  moveToTab(tabToMove) {
    this.parentTabMove.emit(tabToMove);
  }

  GetInstrumentList() {
    this._elnExperimentService.getInstrumentList(this.expVersionObj.VersionId).subscribe((data) => {
      this.InstrumentList = data['Object'];
      this.InstrumentList.forEach(function (item) {
        item['IsSelected'] = item['QualificationStatus'] != null;
      });
    });
  }

  GetEquipmentList() {
    this._elnExperimentService.getEquipmentList(this.expVersionObj.VersionId).subscribe((data) => {
      this.EquipmentList = data['Object'];
      this.EquipmentList.forEach(function (item: object) {
        item['IsSelected'] = item['QualificationStatus'] != null;
      });
    });
  }

  GetMaterialList() {
    this._elnExperimentService.getMaterialList(this.expVersionObj.VersionId).subscribe((data) => {
      this.MaterialList = data['Object'];
    });
  }

  GetELNInstrumentList(obj) {
    if (this.expVersionObj != null && this.expVersionObj.VersionId > 0) {
      this._elnExperimentService.getELNInstrumentList(obj).subscribe((data) => {
        this.ELNInstrumentList = data['Object'];
      });
    }
  }
  GetELNEquipmentList(obj) {
    if (this.expVersionObj != null && this.expVersionObj.VersionId > 0) {
      this._elnExperimentService.getELNEquipmentList(obj).subscribe((data) => {
        this.ELNEquipmentList = data['Object'];
      });
    }
  }
  GetELNMaterialList(obj) {
    if (this.expVersionObj != null && this.expVersionObj.VersionId > 0) {
      this._elnExperimentService.getELNMaterialList(obj).subscribe((data) => {
        this.ELNMaterialList = data['Object'];
      });
    }
  }

  remarkTyping(event, dataRow, type: string) {
    let wordTyped = dataRow['Remark'];
    setTimeout(() => {
      if (wordTyped == dataRow['Remark']) {
        if (type == 'instrument') {
          this.InstrumentList.forEach(function (item: object) {
            if (dataRow.InstrumentId == item['InstrumentId']) {
              item['Remark'] = dataRow.Remark;
            }
          });
        } else {
          this.EquipmentList.forEach(function (item: object) {
            if (dataRow.EquipmentId == item['EquipmentId']) {
              item['Remark'] = dataRow.Remark;
            }
          });
        }
      }
    }, 2000);
  }

  onSelectionChange(event, dataRow, type: string, grid: GridComponent) {
    if (type == 'instrument') {
      this.InstrumentList.forEach(function (item: object) {
        if (dataRow.InstrumentId == item['InstrumentId']) {
          item['IsSelected'] = !dataRow.IsSelected;
          if (dataRow.IsSelected) {
            dataRow['QualificationStatus'] = null;
            item['QualificationStatus'] = null;
          }
        }
      });
    } else {
      this.EquipmentList.forEach(function (item: object) {
        if (dataRow.EquipmentId == item['EquipmentId']) {
          item['IsSelected'] = !dataRow.IsSelected;
          if (dataRow.IsSelected) {
            dataRow['QualificationStatus'] = null;
            item['QualificationStatus'] = null;
          }
        }
      });
    }
    grid.refresh();
  }

  onQualificationStatusChange(event, dataRow, type: string) {
    if (type == 'instrument') {
      this.InstrumentList.forEach(function (item: object) {
        if (dataRow.InstrumentId == item['InstrumentId']) {
          item['QualificationStatus'] = dataRow.QualificationStatus == 'true';
        }
      });
    } else {
      this.EquipmentList.forEach(function (item: object) {
        if (dataRow.EquipmentId == item['EquipmentId']) {
          item['QualificationStatus'] = dataRow.QualificationStatus == 'true';
        }
      });
    }
  }

  SaveInstrument() {
    let validationFlag = true;
    let selectedRecords = [];
    this.InstrumentList.forEach(function (item: object) {
      if (validationFlag && item['IsSelected']) {
        if (item['QualificationStatus'] == null) {
          this._toastr.error("Please select user qualification status for instrument '" + item['InstrumentNo'] + "'");
          validationFlag = false;
        } else {
          selectedRecords.push(item);
        }
      }
    }.bind(this));
    if (validationFlag) {
      this._elnExperimentService.saveInstrument(selectedRecords, this.expVersionObj.VersionId).subscribe((data) => {
        if (data['Result'] == true) {
          this._toastr.success(data['ResultMessage']);
          this.CloseModal();
          this.GetELNInstrumentList(this.expVersionObj);
        } else {
          this._toastr.error(data['ResultMessage']);
        }
      });
    }
  }
  SaveEquipment() {
    let validationFlag = true;
    let selectedRecords = [];
    this.EquipmentList.forEach(function (item: object) {
      if (validationFlag && item['IsSelected']) {
        if (item['QualificationStatus'] == null) {
          this._toastr.error("Please select user qualification status for equipment '" + item['EquipmentNo'] + "'");
          validationFlag = false;
        } else {
          selectedRecords.push(item);
        }
      }
    }.bind(this));
    if (validationFlag) {
      this._elnExperimentService.saveEquipment(selectedRecords, this.expVersionObj.VersionId).subscribe((data) => {
        if (data['Result'] == true) {
          this._toastr.success(data['ResultMessage']);
          this.CloseModal();
          this.GetELNEquipmentList(this.expVersionObj);
        } else {
          this._toastr.error(data['ResultMessage']);
        }
      });
    }
  }
  SaveMaterial() {
    let validationFlag = true;
    let selectedRecords = [];
    this.EquipmentList.forEach(function (item: object) {
      if (validationFlag && item['IsSelected']) {
        if (item['QualificationStatus'] == null) {
          this._toastr.error("Please select user qualification status for equipment '" + item['InstrumentNo'] + "'");
          validationFlag = false;
        } else {
          selectedRecords.push(item);
        }
      }
    }.bind(this));
    if (validationFlag) {
      this._elnExperimentService.saveMaterial(selectedRecords, this.expVersionObj.VersionId).subscribe((data) => {
        if (data['Result'] == true) {
          this._toastr.success(data['ResultMessage']);
          this.CloseModal();
          this.GetELNMaterialList(this.expVersionObj);
        } else {
          this._toastr.error(data['ResultMessage']);
        }
      });
    }
  }

  tabChanged(event) {
    let NewEditLabel = (this.expVersionObj.VersionId > 0 ? 'Edit' : 'New') + ' Experiment - ';
    this.route.data['value'].urls[2].title = NewEditLabel + event.nextId.replace('tab', '');
  }
}