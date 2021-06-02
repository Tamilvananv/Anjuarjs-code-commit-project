import { Component, ViewChild, OnInit } from "@angular/core";
import {
  GridLine,
  FilterSettingsModel,
  GroupSettingsModel,
  EditSettingsModel,
  TextWrapSettingsModel,
  ToolbarItems,
  GridComponent,
  CommandModel,
  CommandClickEventArgs,
  PdfExportProperties,
  ExcelExportProperties,
  IFilter
} from "@syncfusion/ej2-angular-grids";
import { AuditTrailService } from "./service/audit-trail.service";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { DataUtil } from '@syncfusion/ej2-data'; 

@Component({
  selector: "app-audit-trail",
  templateUrl: "./audit-trail.component.html",
  styleUrls: ["./audit-trail.component.css"],
})
export class AuditTrailComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;

  constructor(private _auditTrailService: AuditTrailService) {}
  public ObjAuditTrailList: object[];
  public filterOptions: FilterSettingsModel;

  public lines: GridLine;
  public wrapSettings: TextWrapSettingsModel;
  public toolbar: ToolbarItems[];
  public groupOptions: GroupSettingsModel;
  public filter: IFilter; 
  public format:any;
  public pageSettings:Object;
  ngOnInit(): void {
    this.GetAuditTrailList();
    this.wrapSettings = { wrapMode: "Content" };
    this.lines = "Both";
    this.filterOptions = {
      type: "CheckBox",
    };
    /* this.filter = {
      type: 'CheckBox'
    }; */
    this.filter= { 
      params:{ 
        format: 'dd-MMM-yyyy' 
      } 
    }; 
   // this.format={type:'dateTime',format:'dd-MMM-yyyy hh:mm:ss a'}
    this.format={type:'dateTime',format:'dd-MMM-yyyy HH:mm'}
    this.toolbar = ["ExcelExport", "Search" ,"PdfExport"];
    this.groupOptions = { showGroupedColumn: true };
    this.pageSettings = { pageSize: 10 };
  }

  GetAuditTrailList() {
    this._auditTrailService.GetAuditTrailList().subscribe((data) => {
      this.ObjAuditTrailList = data["Object"];

      for(var i=0;i<this.ObjAuditTrailList.length;i++)
      {
        this.ObjAuditTrailList[i]["Date"] = new Date(this.ObjAuditTrailList[i]["Date"]); 
      }
      this.ObjAuditTrailList = DataUtil.parse.parseJson(this.ObjAuditTrailList); 



    });
  }

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {    
        case "Grid_excelexport":
        const excelExportProperties: ExcelExportProperties = {
          fileName: 'Audit_Trail.xlsx'
      };
      this._auditTrailService.SaveExcelReportDownload().subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties);
        //  this.GetAuditTrailList();
        } else {  

        }
      });  

        break;   
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Audit_Trail.pdf",
           // pageOrientation: 'Landscape',
          };
          this._auditTrailService.SavePdfReportDownload().subscribe((res) => {
            if (res["Result"]) {
              this.grid.pdfExport(pdfExportProperties);
             // this.GetAuditTrailList();
            } else {  
    
            }
          });  
       
          break;     
    }
  }

  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }

  public created(args) { //for cancle icon on grid
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

}
