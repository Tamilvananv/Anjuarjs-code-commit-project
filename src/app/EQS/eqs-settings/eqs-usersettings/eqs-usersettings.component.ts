import { Component, OnInit, ViewChild } from "@angular/core";
import {
  EditSettingsModel,
  ToolbarItems,
  EditService,
  ToolbarService,
  SortService,
  GridLine,
  GridComponent,
  CommandClickEventArgs,
  CommandModel,
  FilterService,
  FilterSettingsModel,
  GroupSettingsModel,
  ExcelExportProperties,
  PdfExportProperties
} from "@syncfusion/ej2-angular-grids";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { EquipmentUserSettingService } from "../service/eqs-usersetting.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {
  EquipmentStorageLocation,
  EquipmentType,
  CustomHeader,
} from "../service/userSettings.model";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';

@Component({
  selector: "app-eqs-usersettings",
  templateUrl: "./eqs-usersettings.component.html",
  providers: [EditService, SortService, FilterService],
  styleUrls: ["./eqs-usersettings.component.css"],
})
export class EqsUsersettingsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild("grid1", { static: false }) public grid1: GridComponent;
  @ViewChild("grid2", { static: false }) public grid2: GridComponent;
  @ViewChild('addcustomheaderModal', { static: false }) headerModal;
@ViewChild('addequipmenttypeModal', { static: false }) equipmenttypeModal;
@ViewChild('addstoragelocationModal', { static: false }) storageLocationModal;
  public lines: GridLine;
  public data: object[];
  public filterOptions: FilterSettingsModel;
  public objEquipmentTypeList: object[];
  public objEquipmentStorageLocation: object[];
  public objCustomHeaderList: object[];
  public toolbar: String[];
  public groupOptions: GroupSettingsModel;
  public pageSettings: Object;
  EquipmentTypeForm: FormGroup;
  StorageLocationFrom: FormGroup;
  CustomHeaderForm: FormGroup;
  // public editSettings: EditSettingsModel;
  // public toolbar: ToolbarItems[];
  public commands: CommandModel[];
  public IsEquipmentTypeEdit = false;
  public IsStorageLocationEdit = false;
  public IsCustomerHeaderEdit = false;
  public IsVisible = true;
  public PageAccessRight: object = {};
  public Dateformat:any;
  //public EquipmentEditText = "Edit Equipment";
  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private eqsUserSettingService: EquipmentUserSettingService,
    private _toastr: ToastrService,
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService
    , private confirmationDialogService: ConfirmationDialogService
  ) {}

  addcustomheader(content) {
    //  this.modalService.open(content, { centered: true, size: "lg" });
    this.IsCustomerHeaderEdit = false;
    this.resetForm();
    this.modalService
      .open(content, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  addequipmenttype(content) {
    //  this.modalService.open(content, { centered: true, size: "lg" });
    this.IsEquipmentTypeEdit = false;
    this.resetForm();
    this.modalService
      .open(content, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  addstoragelocation(content) {
    //this.modalService.open(content, { centered: true, size: "lg" });
    this.IsStorageLocationEdit = false;
    this.resetForm();
    this.modalService
      .open(content, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.eqsUserSettingService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
        /*  this.grid1.hideColumns(["Action"]);
        this.grid2.hideColumns(["Action"]); */
        this.IsVisible = false;
      }
    });

    this.load();
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    // this.commands = [{ buttonOption: { content: 'Edit', cssClass: 'edit_link' } }];
  this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }, { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }];
    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
    this.Dateformat={type:'date',format:'dd-MMM-yyyy'}
    this.pageSettings = { pageSizes: 10 };
    this.toolbar = ["Search", "ExcelExport","PdfExport"];
    this.groupOptions = { showGroupedColumn: true };
  }
  load() {
    this.SetEquipmentTypeForm();
    this.SetCustomHeaderForm();
    this.SetStorageLocationForm();
    this.GetEquipmentStorageLocation();
    this.GetEquipmentTypeList();
    this.GetCustomHeaderList();
  }
  SetEquipmentTypeForm() {
    this.EquipmentTypeForm = this.formBuilder.group({
      EquipmentTypeId: [""],
      EquipmentName: ["", Validators.required],
    });
  }
  SetCustomHeaderForm() {
    this.CustomHeaderForm = this.formBuilder.group({
      CustomHeaderMasterId: [""],
      CustomHeaderFieldName: ["", Validators.required],
    });
  }
  SetStorageLocationForm() {
    this.StorageLocationFrom = this.formBuilder.group({
      StorageLocationId: [""],
      StorageLocationName: ["", Validators.required],
    });
  }
  resetForm() {
    this.EquipmentTypeForm.reset();
    this.CustomHeaderForm.reset();
    this.StorageLocationFrom.reset();
  }
  GetEquipmentTypeList() {
    this.eqsUserSettingService.GetEquipmentType().subscribe((data) => {
      this.objEquipmentTypeList = data["Object"];
    });
  }
  GetEquipmentStorageLocation() {
    this.eqsUserSettingService
      .GetEquipmentStorageLocation()
      .subscribe((data) => {
        this.objEquipmentStorageLocation = data["Object"];
      });
  }
  GetCustomHeaderList() {
    this.eqsUserSettingService.GetCustomHeader().subscribe((data) => {
      this.objCustomHeaderList = data["Object"];
    });
  }
  SaveEquipmentTypeMaster() {
    if (this.EquipmentTypeForm.valid) {
      this.eqsUserSettingService
        .SaveEquipmentType(this.EquipmentTypeForm.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.GetEquipmentTypeList();
            this.resetForm();
            this.closeModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.EquipmentTypeForm);
    }
  }
  SaveStorageLocation() {
    if (this.StorageLocationFrom.valid) {
      this.eqsUserSettingService
        .SaveEquipmentStorageLocation(this.StorageLocationFrom.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.GetEquipmentStorageLocation();
            this.resetForm();
            this.closeModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.StorageLocationFrom);
    }
  }
  SaveCustomHeaderMaster() {
    if (this.CustomHeaderForm.valid) {
      this.eqsUserSettingService
        .SaveCustomHeader(this.CustomHeaderForm.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.GetCustomHeaderList();
            this.resetForm();
            this.closeModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.CustomHeaderForm);
    }
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  actionEquipmentType(args: CommandClickEventArgs): void {
  switch (args['commandColumn']['type']) {
    case 'Delete':
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
          if (result) {
        this.DeleteEquipmentType(args['rowData']['Id']);
          }
          });
      break;
  case 'Edit':this.addequipmenttype(this.equipmenttypeModal);
            this.editEquipmentType(args['rowData']['Id']);
  break;
    default:
      break;
  }
}
  editEquipmentType(EquipmentTypeId): void {
    this.eqsUserSettingService
      .GetEquipmentTypeDetail(EquipmentTypeId)
      .subscribe((data) => {
        const ObjectEquipmentTypeDetail = data["Object"] as EquipmentType;
        if (ObjectEquipmentTypeDetail != null) {
          this.EquipmentTypeForm.patchValue({
            EquipmentTypeId: ObjectEquipmentTypeDetail.EquipmentTypeId,
            EquipmentName: ObjectEquipmentTypeDetail.EquipmentName,
          });
          this.IsEquipmentTypeEdit = true;
        } else {
          this.EquipmentTypeForm.patchValue({
            EquipmentTypeId: null,
            EquipmentName: null,
          });
        }
      });
  }
  UpdateEquipmentTypeMaster() {
    if (this.EquipmentTypeForm.valid) {
      this.eqsUserSettingService
        .UpdateEquipmentType(this.EquipmentTypeForm.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.GetEquipmentTypeList();
            this.resetForm();
            this.closeModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.EquipmentTypeForm);
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
  editStorageLocation(StorageLocationId): void {
    this.eqsUserSettingService
      .GetStorageLocationDetail(StorageLocationId)
      .subscribe((data) => {
        const ObjectData = data["Object"] as EquipmentStorageLocation;
        if (ObjectData != null) {
          this.StorageLocationFrom.patchValue({
            StorageLocationId: ObjectData.StorageLocationId,
            StorageLocationName: ObjectData.StorageLocationName,
          });
          this.IsStorageLocationEdit = true;
        } else {
          this.StorageLocationFrom.patchValue({
            StorageLocationId: null,
            StorageLocationName: null,
          });
        }
      });
  }
  UpdateStorageLocation() {
    if (this.StorageLocationFrom.valid) {
      this.eqsUserSettingService
        .UpdateStorageLocation(this.StorageLocationFrom.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.GetEquipmentStorageLocation();
            this.resetForm();
            this.closeModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.StorageLocationFrom);
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
              this.editCustomHeader(args['rowData']['CustomHeaderMasterId']);
    break;
      default:
        break;
    }
}
  editCustomHeader(CustomHeaderMasterId): void {
    this.eqsUserSettingService
      .GetCustomHeaderDetail(CustomHeaderMasterId)
      .subscribe((data) => {
        const ObjectCustomHeaderDetail = data["Object"] as CustomHeader;
        if (ObjectCustomHeaderDetail != null) {
          this.CustomHeaderForm.patchValue({
            CustomHeaderMasterId: ObjectCustomHeaderDetail.CustomHeaderMasterId,
            CustomHeaderFieldName:
              ObjectCustomHeaderDetail.CustomHeaderFieldName,
          });
          this.IsCustomerHeaderEdit = true;
        } else {
          this.CustomHeaderForm.patchValue({
            CustomHeaderMasterId: ObjectCustomHeaderDetail.CustomHeaderMasterId,
            CustomHeaderFieldName:
              ObjectCustomHeaderDetail.CustomHeaderFieldName,
          });
        }
      });
  }
  UpdateCustomHeader() {
    if (this.CustomHeaderForm.valid) {
      this.eqsUserSettingService
        .UpdateCustomHeader(this.CustomHeaderForm.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.GetCustomHeaderList();
            this.resetForm();
            this.closeModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.CustomHeaderForm);
    }
  }

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
        const excelExportProperties1: ExcelExportProperties = {
          fileName: "Equipment_Custom_Header.xlsx",
        };
        var ObjAudit = { 
          FeatureName:"Custom Header", 
          Description:"Excel Report Is Downloaded." 
       };
       this.eqsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties1);
        } else {    
        }
      });      
      
        break;
        case "Grid1_excelexport":
        const excelExportProperties2: ExcelExportProperties = {
          fileName: "Equipment_Name.xlsx",
        };
        var ObjAudit = { 
          FeatureName:"Equipment Name", 
          Description:"Excel Report Is Downloaded." 
       };
       this.eqsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid1.excelExport(excelExportProperties2);
        } else {    
        }
      });     
     
        break;
        case "Grid2_excelexport":
        const excelExportProperties3: ExcelExportProperties = {
          fileName: "Equipment_Location.xlsx",
        };
        var ObjAudit = { 
          FeatureName:"Location", 
          Description:"Excel Report Is Downloaded." 
       };
       this.eqsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid2.excelExport(excelExportProperties3);
        } else {    
        }
      });      

      
        break;
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Equipment_Custom_Header.pdf"
          };
          var ObjAudit = { 
            FeatureName:"Custom Header", 
            Description:"Pdf Report Is Downloaded." 
         };
         this.eqsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.pdfExport(pdfExportProperties);
          } else {    
          }
        });     
        
          break;
          case "Grid1_pdfexport":
            const pdfExportProperties1: PdfExportProperties = {
              fileName: "Equipment_Name.pdf"
            };
            var ObjAudit = { 
              FeatureName:"Equipment Name", 
              Description:"Pdf Report Is Downloaded." 
           };
           this.eqsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
            if (res["Result"]) {
              this.grid1.pdfExport(pdfExportProperties1);
            } else {    
            }
          });     
          
            break;
            case "Grid2_pdfexport":
              const pdfExportProperties2: PdfExportProperties = {
                fileName: "Equipment_Location.pdf"
              };
              var ObjAudit = { 
                FeatureName:"Location", 
                Description:"Pdf Report Is Downloaded." 
             };
             this.eqsUserSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
  deleteCustomeHeader(Id){
    this.eqsUserSettingService.DeleteCustomHeader(Id).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res['ResultMessage']);
        this.GetCustomHeaderList();
      }
      else {
        this._toastr.error(res['ResultMessage']);
      }
    });
  }
  DeleteEquipmentType(Id){
    this.eqsUserSettingService.DeleteEquipmentType(Id).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res['ResultMessage']);
        this.GetEquipmentTypeList();
      }
      else {
        this._toastr.error(res['ResultMessage']);
      }
    });
  }
  DeleteStorageLocation(Id){
    this.eqsUserSettingService.DeleteStorageLocation(Id).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res['ResultMessage']);
        this.GetEquipmentStorageLocation();
      }
      else {
        this._toastr.error(res['ResultMessage']);
      }
    });
  }

  public created(args) { //for cancle icon on grid
    var gridElement = this.grid.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }

  public createdEquipmentType(args) { //for cancle icon on grid
    var gridname = "EquipmentTypegrid"
    var gridElement = this.grid1.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this,gridname);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }

  public createdStorageLocation(args) { //for cancle icon on grid
    var gridname = "EquipmentStorageLocationgrid"
    var gridElement = this.grid2.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this,gridname);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }

  public cancelBtnClick(args,gridname) {    
    if(args =="EquipmentStorageLocationgrid")
    {
      this.grid2.searchSettings.key = "";
      (this.grid2.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
    }
    else if(args =="EquipmentTypegrid")
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




}
