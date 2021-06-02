import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EditSettingsModel, ToolbarItems
  , EditService, ToolbarService, SortService
  , GridLine, FilterService, FilterSettingsModel
  , CommandModel, CommandClickEventArgs, ExcelExportProperties, GridComponent,PdfExportProperties
} from '@syncfusion/ej2-angular-grids';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstrumentType, StorageLocation, CustomHeader } from './Service/useSettings.model';
import { IcsUserSettingService } from './Service/ics-usersetting.service';
import { ToastrService } from 'ngx-toastr';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';

@Component({
  selector: 'app-ics-usersetting',
  templateUrl: './ics-usersetting.component.html',
  // providers: [EditService, ToolbarService, SortService,FilterService],
  styleUrls: ['./ics-usersetting.component.css']
})
export class IcsUsersettingComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild("grid1", { static: false }) public grid1: GridComponent;
  @ViewChild("grid2", { static: false }) public grid2: GridComponent;
  @ViewChild('addcustomheaderModal', { static: false }) headerModal;
  @ViewChild('addinstrumentypeModal', { static: false }) instrumentTypeModal;
  @ViewChild('addstoragelocationModal', { static: false }) storageLocationModal;
  public lines: GridLine;
  public data: object[];
  public pageSettings: Object;
  closeResult: string;
  InstrumentTypeForm: FormGroup;
  StorageLocationForm: FormGroup;
  CustomHeaderForm: FormGroup;
  // StorageLocationForm: StorageLocation;
  public objInstrumentTypeList: object[];
  public objStorageLocationList: object[];
  public editSettings: EditSettingsModel;
  public toolbar: string[];
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  InstrumentTypeEdit = false;
  StorageEdit = false;
  public objCustomHeaderList: object[];
  public IsVisible = true;
  public PageAccessRight: object = {};
  // CustomHeaderForm: CustomHeader;
  public IsCustomerHeaderEdit = false;
  constructor(private modalService: NgbModal, private _icsUserSettingService: IcsUserSettingService
    , private _toastr: ToastrService
    , private _icsCommonService: IcsCommonService
    , private formErrorDisplay: FormErrorDisplayService
      , private confirmationDialogService: ConfirmationDialogService
    , private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this._icsUserSettingService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
        this.IsVisible = false;
      }
    });
    this.lines = 'Both';
    this.GetInstrumentTypeList();
    this.GetIcsStorageLocationList();
    this.GetCustomHeaderList();
    this.setInstrumentForm();
    this.setStorageLocationForm();
    this.setCustomHeaderForm();
    this.editSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    // this.commands = [{ buttonOption: { content: 'Edit', cssClass: 'edit_link' } }];
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }, { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }];
    this.filterOptions = {
      type: 'Menu'
    };
    this.toolbar=["Search", "ExcelExport","PdfExport"];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSizes: 10 };
  }
  setInstrumentForm() {
    this.InstrumentTypeForm = this.formBuilder.group({
      InstrumentTypeId: [''],
      InstrumentName: ['', Validators.required]
    });
  }
  setStorageLocationForm() {
    this.StorageLocationForm = this.formBuilder.group({
      StorageLocationId: [''],
      StorageLocationName: ['', Validators.required]
    });
  }
  setCustomHeaderForm() {
    this.CustomHeaderForm = this.formBuilder.group({
      CustomHeaderMasterId: [''],
      CustomHeaderFieldName: ['', Validators.required]
    });
  }
  resetForm() {
    this.InstrumentTypeForm.reset();
    this.StorageLocationForm.reset();
    this.CustomHeaderForm.reset();
  }
  addcustomheader(content) {
    this.IsCustomerHeaderEdit = false;
    this.resetForm();
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static',
      keyboard: false
    }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  addinstrumenttype(content) {
    this.resetForm();
    this.InstrumentTypeEdit = false;
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static',
      keyboard: false
    }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  addstoragelocation(content) {
    this.resetForm();
    this.StorageEdit = false;
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static',
      keyboard: false
    }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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
  GetInstrumentTypeList() {
    this._icsCommonService.GetInstrumentTypeOrderBySrNo().subscribe((data) => {
      // this.objInstrumentTypeList = data['Object']['InstrumentTypeList'];
      this.objInstrumentTypeList = data['Object'];
    });
  }
  SaveInstrumentType() {
      if (this.InstrumentTypeForm.valid) {
        this._icsUserSettingService.SaveInstrumentType(this.InstrumentTypeForm.value).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetInstrumentTypeList();
            this.CloseModal();
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      }
      else{
        this.formErrorDisplay.showErrors(this.InstrumentTypeForm);
      }
  }
  actionInstrumentType(args: CommandClickEventArgs): void {
    switch (args['commandColumn']['type']) {
      case 'Delete':
      this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
        if (result) {
            this.DeleteInstrumentType(args['rowData']['Id']);
        }
        });
        break;
    case 'Edit':this.addinstrumenttype(this.instrumentTypeModal);
              this.editInstrumentType(args['rowData']['Id']);
    break;
      default:
        break;
    }
  }
  editInstrumentType(Id): void {
    this._icsUserSettingService.GetInstrumentTypeDetail(Id).subscribe((data) => {
      const ObjInstrumentType = data['Object'] as InstrumentType;
      if (ObjInstrumentType != null) {
        this.InstrumentTypeForm.patchValue({
          InstrumentTypeId: ObjInstrumentType.InstrumentTypeId,
          InstrumentName: ObjInstrumentType.InstrumentName,
        });
        this.InstrumentTypeEdit = true;
      }
      else {
        this.InstrumentTypeForm.patchValue({
          InstrumentTypeId: null,
          InstrumentName: null
        });
      }
    });
  }
  UpdateInstrumentType() {
    if (this.InstrumentTypeForm.valid) {
      this._icsUserSettingService.UpdateInstrumentType(this.InstrumentTypeForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetInstrumentTypeList();
          this.CloseModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.InstrumentTypeForm);
    }
  }
  GetIcsStorageLocationList() {
    this._icsCommonService.GetIcsStorageLocationList().subscribe((data) => {
      // this.objStorageLocationList = data['Object']['StorageLocationList'];
      this.objStorageLocationList = data['Object'];
    });
  }
  SaveStorageLocation() {
    if (this.StorageLocationForm.valid) {
      this._icsUserSettingService.SaveStorageLocation(this.StorageLocationForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetIcsStorageLocationList();
          this.CloseModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.StorageLocationForm);
    }
  }
  actionStorageLocation(args: CommandClickEventArgs): void {
    switch (args['commandColumn']['type']) {
      case 'Delete':
      this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
        if (result) {
          this.DeleteStorageLocation(args['rowData']['Id']);
        }
        });
        break;
    case 'Edit':this.addstoragelocation(this.storageLocationModal);
              this.editStorageLocation(args['rowData']['Id']);
    break;
      default:
        break;
    }
  }
  editStorageLocation(Id): void {
    this._icsUserSettingService.GetStorageLocationDetail(Id).subscribe((data) => {
      const ObjStorageLocation = data['Object'] as StorageLocation;
      if (ObjStorageLocation != null) {
        this.StorageLocationForm.patchValue({
          StorageLocationId: ObjStorageLocation.StorageLocationId,
          StorageLocationName: ObjStorageLocation.StorageLocationName,

        });
        this.StorageEdit = true;
      }
      else {
        this.StorageLocationForm.patchValue({
          StorageLocationId: null,
          StorageLocationName: null,
        });
      }
    });
  }
  UpdateStorageLocation() {
    if (this.StorageLocationForm.valid) {
      this._icsUserSettingService.UpdateStorageLocation(this.StorageLocationForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetIcsStorageLocationList();
          this.CloseModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.StorageLocationForm);
    }
  }
  CloseModal() {
    this.modalService.dismissAll();
  }
  GetCustomHeaderList() {
    this._icsUserSettingService.GetCustomHeader().subscribe((data) => {
      // this.objCustomHeaderList = data["Object"]["CustomHeaderList"];
      this.objCustomHeaderList = data["Object"];
    });
  }
  SaveCustomHeaderMaster() {
    if (this.CustomHeaderForm.valid) {
      this._icsUserSettingService.SaveCustomHeader(this.CustomHeaderForm.value).subscribe((res) => {
        if (res['Result']) {
          this._toastr.success(res["ResultMessage"]);
          this.GetCustomHeaderList();
          this.resetForm();
          this.CloseModal();
        }
        else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.CustomHeaderForm);
    }


  }
  actionCustomHeader(args: CommandClickEventArgs): void {
    switch (args['commandColumn']['type']) {
      case 'Delete':
      this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
        if (result) {
          this.deleteCustomeHeader(args['rowData']['CustomHeaderMasterId']);
        }
        });
        break;
    case 'Edit':this.addcustomheader(this.headerModal);
              this.editCustomeHeader(args['rowData']['CustomHeaderMasterId']);
    break;
      default:
        break;
    }
  }
editCustomeHeader(CustomHeaderMasterId){
  this._icsUserSettingService.GetCustomHeaderDetail(CustomHeaderMasterId).subscribe((data) => {
    const ObjCustomHeader = data['Object'] as CustomHeader;
    if (ObjCustomHeader != null) {
      this.CustomHeaderForm.patchValue({
        CustomHeaderMasterId: ObjCustomHeader.CustomHeaderMasterId,
        CustomHeaderFieldName: ObjCustomHeader.CustomHeaderFieldName,
      });
      this.IsCustomerHeaderEdit = true;
    }
    else {
      this.CustomHeaderForm.patchValue({
        CustomHeaderMasterId: null,
        CustomHeaderFieldName: null,
      });
    }
  });
}
UpdateCustomHeader() {
    if (this.CustomHeaderForm.valid) {
      this._icsUserSettingService.UpdateCustomHeader(this.CustomHeaderForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetCustomHeaderList();
          this.resetForm();
          this.CloseModal();
        }
        else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.CustomHeaderForm);
    }

  }
deleteCustomeHeader(Id){
  this._icsUserSettingService.DeleteCustomHeader(Id).subscribe(res => {
    if (res['Result']) {
      this._toastr.success(res['ResultMessage']);
      this.GetCustomHeaderList();
    }
    else {
      this._toastr.error(res['ResultMessage']);
    }
  });
}
DeleteInstrumentType(Id){
  this._icsUserSettingService.DeleteInstrumentType(Id).subscribe(res => {
    if (res['Result']) {
      this._toastr.success(res['ResultMessage']);
      this.GetInstrumentTypeList();
    }
    else {
      this._toastr.error(res['ResultMessage']);
    }
  });
}
DeleteStorageLocation(Id){
  this._icsUserSettingService.DeleteStorageLocation(Id).subscribe(res => {
    if (res['Result']) {
      this._toastr.success(res['ResultMessage']);
      this.GetIcsStorageLocationList();
    }
    else {
      this._toastr.error(res['ResultMessage']);
    }
  });
}
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
        const excelExportProperties1: ExcelExportProperties = {
          fileName: "Instrument_Custom_Header.xlsx",
        };
        var ObjAudit = { 
          FeatureName:"Custom Header", 
          Description:"Excel Report Is Downloaded." 
       };
       this._icsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties1);
        } else {    
        }
      });      
      
        break;
        case "Grid1_excelexport":
        const excelExportProperties2: ExcelExportProperties = {
          fileName: "Instrument_Name.xlsx",
        };
        var ObjAudit = { 
          FeatureName:"Instrument Name", 
          Description:"Excel Report Is Downloaded." 
       };
       this._icsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid1.excelExport(excelExportProperties2);
        } else {    
        }
      });      
       
        break;
        case "Grid2_excelexport":
        const excelExportProperties3: ExcelExportProperties = {
          fileName: "Instrument_Location.xlsx",
        };
        var ObjAudit = { 
          FeatureName:"Location", 
          Description:"Excel Report Is Downloaded." 
       };
       this._icsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid2.excelExport(excelExportProperties3);
        } else {    
        }
      });      
      
        break;
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Instrument_Custom_Header.pdf"
          };
          var ObjAudit = { 
            FeatureName:"Custom Header", 
            Description:"Pdf Report Is Downloaded." 
         };
         this._icsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.pdfExport(pdfExportProperties);
          } else {    
          }
        });      
        
          break;
          case "Grid1_pdfexport":
            const pdfExportProperties1: PdfExportProperties = {
              fileName: "Instrument_Name.pdf"
            };
            var ObjAudit = { 
              FeatureName:"Instrument Name", 
              Description:"Pdf Report Is Downloaded." 
           };
           this._icsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
            if (res["Result"]) {
              this.grid1.pdfExport(pdfExportProperties1);
            } else {    
            }
          });     
          
            break;
            case "Grid2_pdfexport":
              const pdfExportProperties2: PdfExportProperties = {
                fileName: "Instrument_Location.pdf"
              };
              var ObjAudit = { 
                FeatureName:"Location", 
                Description:"Pdf Report Is Downloaded." 
             };
             this._icsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
              if (res["Result"]) {
                this.grid2.pdfExport(pdfExportProperties2);
              } else {    
              }
            });     
              break;
    }
  }

  pdfHeaderQueryCellInfo(args: any): void {
    args.cell.row.pdfGrid.repeatHeader = true;
  }

  public created(args) {//for cancle icon on grid
    var gridElement = this.grid.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }

  public cancelBtnClick(args,gridname) {
    if(args =="storageLocationgrid")
    {
      this.grid2.searchSettings.key = "";
      (this.grid2.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
    }
    else if(args =="InstrumentTypegrid")
    {
      this.grid1.searchSettings.key = "";
      (this.grid1.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
    }
    else
    {   
    this.grid.searchSettings.key = "";
    (this.grid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
  }
  }
  
  public createdInstrumenttype(args) {//for cancle icon on grid
    var gridname = "InstrumentTypegrid"
    var gridElement = this.grid1.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this,gridname);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }
  
  public createdstoragelocation(args) {//for cancle icon on grid
    var gridname = "storageLocationgrid"
    var gridElement = this.grid2.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this,gridname);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }
 
}
