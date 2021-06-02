import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FilterService, FilterSettingsModel, GridComponent, GridLine, SearchSettingsModel, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from "ngx-toastr";
import { ExperimentService } from "../service/experiment.service";
import { ExpVersionEnt } from "../service/experiment.model";
import { elnDataService } from "../service/experiment.data.service";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eln-iceqim-details',
  templateUrl: './eln-iceqim-details.component.html',
  styleUrls: ['./eln-iceqim-details.component.css'],
  providers: [FilterService, ToolbarService],
})
export class ElnIceqimDetailsComponent implements OnInit {
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();;
  @ViewChild('tabset', { static: false }) public tabset: NgbTabset;
  @ViewChild("instrumentGrid", { static: false }) public instrumentGrid: GridComponent;
  @ViewChild("enquipementGrid", { static: false }) public enquipementGrid: GridComponent;
  @ViewChild("materialGrid", { static: false }) public materialGrid: GridComponent;
  closeResult: string;
  public lines: GridLine;
  public InstrumentList: object[];
  public InstrumentTypeList: object[];
  public MaterialList: object[];
  public EquipmentList: object[];
  public EquipmentTypeList: object[];
  public btnDisable: boolean;
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
  public toolbar: string[];
  public searchSettings: SearchSettingsModel;
  public filterOptions: FilterSettingsModel;
  expVersionObj: ExpVersionEnt;
  versionWatch: Subscription;
  constructor(
    private data: elnDataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private _elnExperimentService: ExperimentService,
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
    this.versionWatch = this.data.currenntVersionObj.subscribe(obj => {
      const IsChanged = this.expVersionObj != undefined && this.expVersionObj.VersionId !== obj.VersionId;
      this.expVersionObj = obj;
      if (this.expVersionObj != null && this.expVersionObj.VersionId > 0 && IsChanged) {
        this.GetELNInstrumentList(this.expVersionObj);
        this.GetELNEquipmentList(this.expVersionObj);
        //this.GetELNMaterialList(this.expVersionObj);
      }
    });
    this.lines = 'Both';
  }
  ngOnDestroy() {
    this.versionWatch.unsubscribe();
  }

  remarkTyping(event, dataRow, type: string) {
    let wordTyped = dataRow['Remark'];
    this.btnDisable = true;
    setTimeout(() => {
      if (wordTyped == dataRow['Remark']) {
        if (type == 'instrument') {
          this.InstrumentList.forEach(function (item: object) {
            if (dataRow.InstrumentId == item['InstrumentId']) {
              item['Remark'] = dataRow.Remark;
            }
          });
        } else if (type == 'equipment') {
          this.EquipmentList.forEach(function (item: object) {
            if (dataRow.EquipmentId == item['EquipmentId']) {
              item['Remark'] = dataRow.Remark;
            }
          });
        } else {
          this.MaterialList.forEach(function (item: object) {
            if (dataRow.MaterialId == item['MaterialId']) {
              item['Remark'] = dataRow.Remark;
            }
          });
        }
        this.btnDisable = false;
      } else {
        this.btnDisable = false;
      }
    }, 2000);
  }

  moveToTab(tabToMove) {
    this.parentTabMove.emit(tabToMove);
  }

  GetInstrumentList() {
    this._elnExperimentService.getInstrumentList(this.expVersionObj.VersionId).subscribe((data) => {
      this.InstrumentList = data['Object'];
      this.InstrumentList.forEach(function (item) {
        item['IsSelected'] = item['Id'] != null;
      });
    });
  }

  GetEquipmentList() {
    this._elnExperimentService.getEquipmentList(this.expVersionObj.VersionId).subscribe((data) => {
      this.EquipmentList = data['Object'];
      this.EquipmentList.forEach(function (item: object) {
        item['IsSelected'] = item['Id'] != null;
      });
    });
  }

  GetMaterialList() {
    this._elnExperimentService.getMaterialList(this.expVersionObj.VersionId).subscribe((data) => {
      this.MaterialList = data['Object'];
      this.MaterialList.forEach(function (item: object) {
        item['IsSelected'] = item['Id'] != null;
      });
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

  onSelectionChange(event, dataRow, type: string, grid: GridComponent) {
    if (type == 'instrument') {
      this.InstrumentList.forEach(function (item: object) {
        if (dataRow.InstrumentId == item['InstrumentId']) {
          item['IsSelected'] = !dataRow.IsSelected;
          if (dataRow.IsSelected) {
            dataRow['QualificationStatus'] = null;
            item['QualificationStatus'] = null;
            dataRow['Remark'] = null;
            item['Remark'] = null;
          }
        }
      });
    } else if (type == 'equipment') {
      this.EquipmentList.forEach(function (item: object) {
        if (dataRow.EquipmentId == item['EquipmentId']) {
          item['IsSelected'] = !dataRow.IsSelected;
          if (dataRow.IsSelected) {
            dataRow['QualificationStatus'] = null;
            item['QualificationStatus'] = null;
            dataRow['Remark'] = null;
            item['Remark'] = null;
          }
        }
      });
    } else {
      this.MaterialList.forEach(function (item: object) {
        if (dataRow.MaterialId == item['MaterialId']) {
          item['IsSelected'] = !dataRow.IsSelected;
          if (dataRow.IsSelected) {
            dataRow['Remark'] = null;
            item['Remark'] = null;
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
    this.MaterialList.forEach(function (item: object) {
      if (item['IsSelected']) {
        selectedRecords.push(item);
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

  created(args) {
    var gridElement = this.instrumentGrid.element;
    this.appendEvent(gridElement, 'ELNInstrumentList');
    gridElement = this.enquipementGrid.element;
    this.appendEvent(gridElement, 'ELNEquipmentList');
    gridElement = this.materialGrid.element;
    this.appendEvent(gridElement, 'MaterialList');
  }

  appendEvent(gridElement, selector) {
    let toolbar = gridElement.querySelector(".e-toolbar-item .e-input-group");
    if (toolbar != null && toolbar.querySelector('.e-clear-icon') == null) {
      var span = document.createElement("span");
      span.className = "e-clear-icon";
      span.id = gridElement.id + "clear";
      span.onclick = this.cancelBtnClick.bind(this);
      toolbar.appendChild(span);
    }
  }

  cancelBtnClick(args) {
    this.instrumentGrid.searchSettings.key = "";
    (this.instrumentGrid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
    this.enquipementGrid.searchSettings.key = "";
    (this.enquipementGrid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
    this.materialGrid.searchSettings.key = "";
    (this.materialGrid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
  }
}