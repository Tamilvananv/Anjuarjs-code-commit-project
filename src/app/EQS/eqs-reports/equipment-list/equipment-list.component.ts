import { Component, OnInit, ViewChild } from "@angular/core";
import { ItemModel } from "@syncfusion/ej2-splitbuttons";
import {
  GridLine,
  FilterSettingsModel,
  ToolbarItems,
  TextWrapSettingsModel,
  GroupSettingsModel,
  ExcelExportProperties,
  IFilter,
  PdfExportProperties
} from "@syncfusion/ej2-grids";
import { EqsReportService } from "../service/eqs-report.service";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { DataUtil } from "@syncfusion/ej2-data";
@Component({
  selector: "app-equipment-list",
  templateUrl: "./equipment-list.component.html",
  styleUrls: ["./equipment-list.component.css"],
})
export class EquipmentListComponent implements OnInit {
  public toolbarOptions: ToolbarItems[];
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public fields: Object = { text: "Name", value: "Id" };
  data: object[];
  public ObjEquipmentList: object[];
  public ObjEquipmentReportList: object[];
  constructor(private _eqsReportService: EqsReportService) {}
  public lines: GridLine;
  public filterOptions: FilterSettingsModel;
  public height: string = "220px";
  public initialPage: Object;
  public toolbar: String[];
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  public filter: IFilter;
  public Dateformat:any;
  public pageSettings: Object;
  ngOnInit() {
    this.GetEquipmentListReport();
    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
    this.filter = {
      params: {
        format: "dd-MMM-yyyy",
      },
    };
    this.Dateformat={type:'date',format:'dd-MMM-yyyy'}
    this.toolbarOptions = ["ExcelExport", "Search","PdfExport"];
    this.toolbar = ["Search"];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: "Content" };

    this.groupOptions = { showGroupedColumn: true };
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
        const excelExportProperties: ExcelExportProperties = {
          fileName: "Equipment_List_Report.xlsx",
        };
        var ObjAudit = { 
          FeatureName:"Report", 
          Description:"List Excel Report Is Downloaded." 
       };
        this._eqsReportService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.excelExport(excelExportProperties);
          } else {    
          }
        });     
      
        break;
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Equipment_List_Report.pdf",
            pageOrientation: 'Landscape',
          };  
          var ObjAudit = { 
            FeatureName:"Report", 
            Description:"List Pdf Report Is Downloaded." 
         };
          this._eqsReportService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
  /*  GetEquipmentList() {
     this._eqsReportService.GetEquipmentList().subscribe((data) => {
       this.ObjEquipmentList = data['Object']['EquipmentList'];
       // console.log(this.ObjEquipmentList);
     });
   } */

  GetEquipmentListReport() {
    this._eqsReportService.GetEquipmentListReport().subscribe((data) => {
      this.ObjEquipmentReportList = data["Object"];
      for (var i = 0; i < this.ObjEquipmentReportList.length; i++) {
        if (this.ObjEquipmentReportList[i]["LastCalibrationPerformedDate"] != null) {
          this.ObjEquipmentReportList[i]["LastCalibrationPerformedDate"] = new Date(this.ObjEquipmentReportList[i]["LastCalibrationPerformedDate"] );
        }
        if (this.ObjEquipmentReportList[i]["LastQualificationPerformedDate"] != null ) {
          this.ObjEquipmentReportList[i]["LastQualificationPerformedDate"] = new Date(this.ObjEquipmentReportList[i]["LastQualificationPerformedDate"]);
        }
        if (this.ObjEquipmentReportList[i]["LastMaintenancePerformedDate"] != null) {
          this.ObjEquipmentReportList[i]["LastMaintenancePerformedDate"] = new Date(this.ObjEquipmentReportList[i]["LastMaintenancePerformedDate"]);
        }
      }
      this.ObjEquipmentReportList = DataUtil.parse.parseJson( this.ObjEquipmentReportList);
    });
  }

  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }

}
