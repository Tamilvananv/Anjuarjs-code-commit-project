import { Component, AfterViewInit, ViewChild, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  GridLine,
  FilterSettingsModel,
  // EditSettingsModel,
  ToolbarItems,
  GridComponent,
  CommandModel,
  CommandClickEventArgs,
  TextWrapSettingsModel,
  GroupSettingsModel,
  ExcelExportProperties,
  Column,
  IFilter,
  PdfExportProperties,
} from "@syncfusion/ej2-angular-grids";

import { EquipmentMasterService } from "./service/eqs-master.service";
import { Router } from "@angular/router";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EqsAvailability } from "./service/eqs-availability.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
import { environment } from "src/environments/environment";
import {
  AjaxSettingsModel,
  SearchSettingsModel,
} from "@syncfusion/ej2-filemanager";
import { CommonService } from "src/app/Shared Services etc/Services/Common.service";
import { DataUtil } from '@syncfusion/ej2-data';
@Component({
  templateUrl: "./eqs.component.html",
  styleUrls: ["./eqs-master.css"],
  providers: [EquipmentMasterService],
})
export class EqsComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private routes: Router,
    private _toastr: ToastrService,
    private eqsService: EquipmentMasterService,
    private formErrorDisplay: FormErrorDisplayService,
    private formBuilder: FormBuilder,
    private _common: CommonService
  ) {}
  public ajaxSettings: AjaxSettingsModel;
  public contextMenuSettings: object;
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public toolbarSettings: object;
  public _restApi = environment.apiUrl + "/FileManager/";
  closeResult: string;
  public data: object[];
  // public editSettings: EditSettingsModel;
  public lines: GridLine;
  public objEqsList: object[];
  public filterOptions: FilterSettingsModel;
  //public toolbar: ToolbarItems[];
  public toolbar: String[];
  public commands: CommandModel[];
  public initialPage: Object;
  public toolbarOptions: ToolbarItems[];
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  availibility = true;
  EqsAvailabilityForm: FormGroup;
  public EqsEquipmentId: Number;
  public restrictedPath: string;
  public column: string;
  public PageAccessRight: object = {};

  public filter: IFilter;
  public format:any;
  public pageSettings: Object;
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.eqsService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });

    this.SetForm();
    this.toolbarOptions = ["ExcelExport", "Search","PdfExport"];
    this.toolbar = ["Search"];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: "Content" };
    this.commands = [
      {
        type: "Edit",
        buttonOption: { iconCss: "fa fa-edit", cssClass: "e-flat" },
        
      },
    ];
    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
    this.GetEquipmentMasterList();
    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
    this.filter= {
      params:{
        format: 'dd-MMM-yyyy'
      }
    };

    this.format={type:'date',format:'dd-MMM-yyyy'}
    this.groupOptions = { showGroupedColumn: true };
    this.initFileManager();
  }
  initFileManager() {
    this.ajaxSettings = {
      url: this._restApi + "FileOperations",
      getImageUrl: this._restApi + "GetImage",
      uploadUrl: this._restApi + "Upload",
      downloadUrl: this._restApi + "Download",
    };
    this.searchSettings = {
      allowSearchOnTyping: false,
    };
    this.navigationPaneSettings = { maxWidth: '850px', minWidth: '140px', visible: true };
    this.contextMenuSettings = { file: ['Open', '|', 'Details','Download'], folder: ['Open', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Details', '|'], visible: true };
    this.toolbarSettings = { items: ['Refresh', 'View', 'Details'], visible: true };
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
        (this.grid.columns[5] as Column).visible = false;
        (this.grid.columns[6] as Column).visible = false;
        (this.grid.columns[7] as Column).visible = false;
        (this.grid.columns[8] as Column).visible = false;
        const excelExportProperties: ExcelExportProperties = {
          fileName: "Equipment_Master.xlsx",
        };
        var ObjAudit = { 
          FeatureName:"Equipment Master", 
          Description:"Excel Report Is Downloaded." 
       };
        this.eqsService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.excelExport(excelExportProperties);
          } else {    
          }
        });   
    
        break;
      case "Grid_pdfexport":
        const pdfExportProperties: PdfExportProperties = {
          fileName: "Equipment_Master.pdf",
          pageOrientation: 'Landscape',
        }; 
        var ObjAudit = { 
          FeatureName:"Equipment Master", 
          Description:"Pdf Report Is Downloaded." 
       };
        this.eqsService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.pdfExport(pdfExportProperties);
          } else {    
          }
        });         
       
        break;
    }
  }
  public created(args) {
    var gridElement = this.grid.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }
  public cancelBtnClick(args) {
    this.grid.searchSettings.key = "";
    (this.grid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
  }
  ngAfterViewInit() {}
  commandClick(args: CommandClickEventArgs): void {
    this.editEquipment(args.rowData["EqsEquipmentId"]);
  }

  editEquipment(EquipmentId) {
    this.routes.navigate(["eqs-home/editequipment", EquipmentId]);
  }
  GetEquipmentMasterList() {
    this.eqsService.GetEqsList().subscribe((data) => {
      this.objEqsList = data["Object"];
      for(var i =0 ;i<this.objEqsList.length;i++)
      {
        if (this.objEqsList[i]["EquipmentDeliveryDate"] != null) {
        this.objEqsList[i]["EquipmentDeliveryDate"] = new Date(this.objEqsList[i]["EquipmentDeliveryDate"]);
        }
      }
     this.objEqsList = DataUtil.parse.parseJson(this.objEqsList);
    });
  }
  SetForm() {
    this.EqsAvailabilityForm = this.formBuilder.group({
      EqsAvailabilityId: [""],
      EqsEquipmentId: [""],
      Status: [""],
      EqsUnAvailabilityReason: ["", Validators.required],
    });
  }
  resetForm() {
    this.EqsAvailabilityForm.reset();
  }
  openModal(content3) {
    this.modalService
      .open(content3, {
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
  SetAvailabilty(   e: any,   EqsEquipmentId: number,   Availability: boolean,   content: any  ) {
    if (this.PageAccessRight["HasWriteAccess"] == false) {
      this._toastr.error("You Are Not Authorized To Edit This Page");
      this.routes.navigateByUrl("/unauthorize");
    } else {
      this.EqsAvailabilityForm.patchValue({
        EqsEquipmentId: EqsEquipmentId,
        Status: Availability,
      });
      if (Availability == true) {
        //reason required open popup
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
      } else {
        this.SaveAvailability();
      }
    }
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
  SaveAvailability() {
    if (this.EqsAvailabilityForm.get("Status").value === false) {
      this.eqsService
        .SaveAvailability(this.EqsAvailabilityForm.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.resetForm();
            this.GetEquipmentMasterList();
            this.closeReasonModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      if (this.EqsAvailabilityForm.valid) {
        this.eqsService
          .SaveAvailability(this.EqsAvailabilityForm.value)
          .subscribe((res) => {
            if (res["Result"]) {
              this._toastr.success(res["ResultMessage"]);
              this.resetForm();
              this.GetEquipmentMasterList();
              this.closeReasonModal();
            } else {
              this._toastr.error(res["ResultMessage"]);
            }
          });
      } else {
        this.formErrorDisplay.showErrors(this.EqsAvailabilityForm);
      }
    }
  }
  closeReasonModal() {
    this.modalService.dismissAll();
  }
  CloseAvailability() {
    this.grid.refresh();
    this.modalService.dismissAll();
  }

  setRowId(data, column) {
    this.EqsEquipmentId = data.EqsEquipmentId;
    this.column = column;
  }
  beforeSend(args) {
    if (this.column === "URS") {
      this.restrictedPath =
        "EQSMaster/Equip_" + this.EqsEquipmentId + "/" + "URS";
    } else if (this.column === "PO") {
      this.restrictedPath =
        "EQSMaster/Equip_" + this.EqsEquipmentId + "/" + "PO";
    } else {
      this.restrictedPath = "EQSQualification/Equip_" + this.EqsEquipmentId;
    }
    if (
      args["name"] == "beforeImageLoad" &&
      args["imageUrl"].indexOf(this.restrictedPath) == -1
    ) {
      let indexOfPath = args["imageUrl"].indexOf("path=") + 5;
      args["imageUrl"] =
        args["imageUrl"].substring(0, indexOfPath) +
        this.restrictedPath +
        args["imageUrl"].substring(indexOfPath);
    } else if (args.name == "beforeDownload") {
      if (args.data["path"].indexOf(this.restrictedPath) == -1) {
        args.data["path"] = this.restrictedPath + args.data["path"];
      }
    } else {
      var data = JSON.parse(args.ajaxSettings.data);
      if (args["action"] == "Upload") {
        args.cancel = true;
        if (data[0]["path"].indexOf(this.restrictedPath) == -1) {
          data[0]["path"] = this.restrictedPath + data[0]["path"];
        }
      } else if (data["path"].indexOf(this.restrictedPath) == -1) {
        data["path"] = this.restrictedPath + data["path"];
        if (args["action"] == "move") {
          data["targetPath"] = this.restrictedPath + data["targetPath"];
        }
      }
      args.ajaxSettings.data = JSON.stringify(data);
    }
  }
  excelExportComplete(): void {
    (this.grid.columns[5] as Column).visible = true;
    (this.grid.columns[6] as Column).visible = true;
    (this.grid.columns[7] as Column).visible = true;
    (this.grid.columns[8] as Column).visible = true;
}

pdfHeaderQueryCellInfo(args: any): void {   
  args.cell.row.pdfGrid.repeatHeader = true;
}

}
