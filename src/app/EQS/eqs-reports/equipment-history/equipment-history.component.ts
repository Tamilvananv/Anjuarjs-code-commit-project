import { Component, OnInit,ViewChild } from '@angular/core';
import { EqsReportService } from '../service/eqs-report.service';
import { GridLine, FilterSettingsModel, ToolbarItems, TextWrapSettingsModel, GroupSettingsModel,ExcelExportProperties,IFilter,PdfExportProperties } from '@syncfusion/ej2-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data'; 
@Component({
  selector: 'app-equipment-history',
  templateUrl: './equipment-history.component.html',
  styleUrls: ['./equipment-history.component.css']
})
export class EquipmentHistoryComponent implements OnInit {
  public toolbarOptions: ToolbarItems[];
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public ObjEquipmentHistoryReportList: object[];
  constructor(private _eqsReportService: EqsReportService) { }
  public lines: GridLine;
  public filterOptions: FilterSettingsModel;
  public height: string = '220px';
  public initialPage: Object;
  public toolbar: String[];
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  public filter: IFilter;
  public Dateformat:any;
  public pageSettings: Object;
  ngOnInit() {
    this.GetEquipmentHistoryReportList();
    this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
    };
    this.filter= { 
      params:{ 
        format: 'dd-MMM-yyyy hh:mm:ss a' 
      } 
    }; 
    this.Dateformat={type:'date',format:'dd-MMM-yyyy'}
    this.toolbarOptions = [ 'ExcelExport','Search',"PdfExport"];
    this.toolbar=['Search'];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: 'Content' };
   
    this.groupOptions = { showGroupedColumn: true };
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id){
     case 'Grid_excelexport':
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Equipment_Usage_Report.xlsx'
    };
    var ObjAudit = { 
      FeatureName:"Report", 
      Description:"Usage Excel Report Is Downloaded." 
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
            fileName: "Equipment_Usage_Report.pdf",
            pageOrientation: 'Landscape',
          };  
          var ObjAudit = { 
            FeatureName:"Report", 
            Description:"Usage Pdf Report Is Downloaded." 
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
  GetEquipmentHistoryReportList() {
    this._eqsReportService.GetEquipmentHistoryReportList().subscribe((data) => {
      this.ObjEquipmentHistoryReportList = data['Object'];
      for(var i=0;i<this.ObjEquipmentHistoryReportList.length;i++)
      {
        this.ObjEquipmentHistoryReportList[i]["ExperimentStartDate"] = new Date(this.ObjEquipmentHistoryReportList[i]["ExperimentStartDate"]); 
      }
      this.ObjEquipmentHistoryReportList = DataUtil.parse.parseJson(this.ObjEquipmentHistoryReportList); 
    });
  }

  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }

}
