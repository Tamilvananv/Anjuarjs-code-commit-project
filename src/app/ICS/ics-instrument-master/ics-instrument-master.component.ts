import { LoginComponent } from "./../../login/login.component";
import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  GridLine,
  FilterSettingsModel,
  EditSettingsModel,
  ToolbarItems,
  GridComponent,
  CommandModel,
  CommandClickEventArgs,
  ToolbarService,
  TextWrapSettingsModel,
  GroupSettingsModel,
  ExcelExportProperties,
  Column,
  IFilter,
  PdfExportProperties
} from "@syncfusion/ej2-angular-grids";
import { InstrumentMasterService } from "./service/instrument-master.service";
import { Router } from "@angular/router";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IcsAvailability } from "./service/ics-availability.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
import { environment } from "src/environments/environment";
import {
  AjaxSettingsModel,
  SearchSettingsModel,
} from "@syncfusion/ej2-filemanager";
import { CommonService } from "src/app/Shared Services etc/Services/Common.service";
import { DataUtil } from "@syncfusion/ej2-data";
@Component({
  selector: "app-ics",
  templateUrl: "./ics-instrument-master.component.html",
  styleUrls: ["./ics-instrument-master.component.css"],
  providers: [InstrumentMasterService, ToolbarService],
})
export class IcsComponent implements AfterViewInit {
  constructor(
    private modalService: NgbModal,
    private routes: Router,
    private _toastr: ToastrService,
    private icsService: InstrumentMasterService,
    private formErrorDisplay: FormErrorDisplayService,
    private formBuilder: FormBuilder,
    private _common: CommonService
  ) {}
  public ajaxSettings: AjaxSettingsModel;
  public contextMenuSettings: object;
  public allowDragAndDrop: boolean;
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public toolbarSettings: object;
  closeResult: string;
  public pageSettings: Object;
  public data: object[];
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  // public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public lines: GridLine;
  public objIcsList: object[];
  public filterOptions: FilterSettingsModel;
  // public toolbar: ToolbarItems[];
  public toolbarOptions: ToolbarItems[];
  public toolbar: string[];
  availibility = true;
  IcsAvailabilityForm: FormGroup;
  public _restApi = environment.apiUrl + "/FileManager/";
  public IcsInstrumentId: Number;
  public restrictedPath: string;
  public column: string;
  public PageAccessRight: object = {};
  public filter: IFilter;
  public Dateformat:any;
  ngOnInit(): void {
    this.icsService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });

    this.setIcsAvailabilityForm();
    this.GetInstrumentMasterList();
    this.initFileManager();
    this.commands = [
      {
        type: "Edit",
        buttonOption: { iconCss: "fa fa-edit", cssClass: "e-flat" },
      },
    ];
    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
    this.Dateformat={type:'date',format:'dd-MMM-yyyy'}
    this.toolbarOptions = [ 'ExcelExport', 'Search',"PdfExport"];
    this.toolbar = ["Search"];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: "Content" };
    this.groupOptions = { showGroupedColumn: true };
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
    this.navigationPaneSettings = environment.navigationPaneSettings;
    this.contextMenuSettings = environment.contextMenuSettings;
    this.toolbarSettings = environment.toolbarSettings;
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
        (this.grid.columns[5] as Column).visible = false;
        (this.grid.columns[6] as Column).visible = false;
        (this.grid.columns[7] as Column).visible = false;
        (this.grid.columns[8] as Column).visible = false;
        const excelExportProperties: ExcelExportProperties = {
          fileName: "Instrument_Master.xlsx",
        };

        var ObjAudit = { 
          FeatureName:"Instrument Master", 
          Description:"Excel Report Is Downloaded." 
       };
        this.icsService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.excelExport(excelExportProperties);
          } else {    
          }
        });   


       
        break;
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Instrument_Master.pdf",
            pageOrientation: 'Landscape',
          };
          var ObjAudit = { 
            FeatureName:"Instrument Master", 
            Description:"Pdf Report Is Downloaded." 
         };
          this.icsService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
    this.routes.navigate([
      "icshome/editinstrument",
      args.rowData["IcsInstrumentId"],
    ]);
  }
  GetInstrumentMasterList() {
    this.icsService.GetIcsList().subscribe((data) => {
      this.objIcsList = data["Object"];
      for (var i = 0; i < this.objIcsList.length; i++) {
        if (this.objIcsList[i]["InstrumentDeliveryDate"] != null) {
          this.objIcsList[i]["InstrumentDeliveryDate"] = new Date( this.objIcsList[i]["InstrumentDeliveryDate"]);
        }
      }
      this.objIcsList = DataUtil.parse.parseJson(this.objIcsList);
    });
  }
  SetAvailabilty(
    e: any,
    IcsInstrumentId: number,
    Availability: boolean,
    content: any
  ) {
    if (this.PageAccessRight["HasWriteAccess"] == false) {
      this._toastr.error("You Are Not Authorized To Edit This Page");
      this.routes.navigateByUrl("/unauthorize");
    } else {
      this.IcsAvailabilityForm.patchValue({
        IcsInstrumentId: IcsInstrumentId,
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  setIcsAvailabilityForm() {
    this.IcsAvailabilityForm = this.formBuilder.group({
      IcsAvailabilityId: [""],
      IcsInstrumentId: [""],
      Status: [""],
      IcsUnAvailabilityReason: ["", Validators.required],
    });
  }
  resetIcsAvailabilityForm() {
    this.IcsAvailabilityForm.reset();
  }
  SaveAvailability() {
    if (this.IcsAvailabilityForm.get("Status").value === false) {
      this.icsService
        .SaveAvailability(this.IcsAvailabilityForm.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.resetIcsAvailabilityForm();
            this.GetInstrumentMasterList();
            this.closeReasonModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      if (this.IcsAvailabilityForm.valid) {
        this.icsService
          .SaveAvailability(this.IcsAvailabilityForm.value)
          .subscribe((res) => {
            if (res["Result"]) {
              this._toastr.success(res["ResultMessage"]);
              this.resetIcsAvailabilityForm();
              this.GetInstrumentMasterList();
              this.closeReasonModal();
            } else {
              this._toastr.error(res["ResultMessage"]);
            }
          });
      } else {
        this.formErrorDisplay.showErrors(this.IcsAvailabilityForm);
      }
    }
  }
  closeReasonModal() {
    this.modalService.dismissAll();
  }
  CloseAvailability() {
    // use grid.refresh to refresh the grid  after close button clicked
    this.grid.refresh();
    this.modalService.dismissAll();
  }
  setRowId(data, column) {
    this.IcsInstrumentId = data.IcsInstrumentId;
    this.column = column;
  }
  beforeSend(args) {
    // Get the value of Dropdownlist.
    if (this.column === "URS") {
      this.restrictedPath =
        "ICSMaster/Inst_" + this.IcsInstrumentId + "/" + "URS";
    } else if (this.column === "PO") {
      this.restrictedPath =
        "ICSMaster/Inst_" + this.IcsInstrumentId + "/" + "PO";
    } else {
      this.restrictedPath = "ICSQualification/Inst_" + this.IcsInstrumentId;
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
        // args.preventDefault();
        args.cancel = true;
        if (data[0]["path"].indexOf(this.restrictedPath) == -1) {
          data[0]["path"] = this.restrictedPath + data[0]["path"];
        }
      } else if (data["path"].indexOf(this.restrictedPath) == -1) {
      data["path"] = this.restrictedPath + data["path"];
      if (args["action"] == 'move') {
        data["targetPath"] = this.restrictedPath + data["targetPath"];
      }else if (args["action"] == 'copy') {
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
