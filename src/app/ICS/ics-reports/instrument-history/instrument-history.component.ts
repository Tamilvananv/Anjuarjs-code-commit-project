import { Component, OnInit,ViewChild } from '@angular/core';
import { IcsReportService } from '../Service/ics-report.service';
import { GridLine, FilterSettingsModel, ToolbarItems, GroupSettingsModel, ExcelExportProperties ,IFilter,PdfExportProperties} from '@syncfusion/ej2-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-instrument-history',
  templateUrl: './instrument-history.component.html',
  styleUrls: ['./instrument-history.component.css']
})
export class InstrumentHistoryComponent implements OnInit {

  public toolbarOptions: ToolbarItems[];
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public ObjInstrumentHistoryReportList: object[];
  constructor(private _icsReportService: IcsReportService) { }
  public lines: GridLine;
  public filterOptions: FilterSettingsModel;
  public pageSettings: Object;
  public height: string = '220px';
  public toolbar: String[];
  public groupOptions: GroupSettingsModel;
  public filter: IFilter; 
  public Dateformat:any;

  ngOnInit() {
    this.GetInstrumentHistoryReportList();
    this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
    };
    this.filter= { 
      params:{ 
        format: 'dd-MMM-yyyy' 
      } 
    }; 
    this.Dateformat={type:'date',format:'dd-MMM-yyyy'}
    this.toolbarOptions = [ 'ExcelExport', 'Search',"PdfExport"];
    this.toolbar=['Search'];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSizes: 10 };
    this.groupOptions = { showGroupedColumn: true };
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id){
      case 'Grid_excelexport':
       const excelExportProperties: ExcelExportProperties = {
         fileName: 'Instrument_Usage_Report.xlsx'
     };
     var ObjAudit = { 
      FeatureName:"Report", 
      Description:"Usage Excel Report Is Downloaded." 
   };
    this._icsReportService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
      if (res["Result"]) {
        this.grid.excelExport(excelExportProperties);
      } else {    
      }
    });       
       
         break;
         case "Grid_pdfexport":
        const pdfExportProperties: PdfExportProperties = {
          fileName: "Instrument_Usage_Report.pdf",
          pageOrientation: 'Landscape',
        };  
        var ObjAudit = { 
          FeatureName:"Report", 
          Description:"Usage Pdf Report Is Downloaded." 
       };
        this._icsReportService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
  GetInstrumentHistoryReportList() {
    this._icsReportService.GetInstrumentHistoryReportList().subscribe((data) => {
      this.ObjInstrumentHistoryReportList = data['Object'];
      for(var i=0;i<this.ObjInstrumentHistoryReportList.length;i++)
      {
        this.ObjInstrumentHistoryReportList[i]["ExperimentExperimenttDate"] = new Date(this.ObjInstrumentHistoryReportList[i]["ExperimentExperimenttDate"]);       
      }
      this.ObjInstrumentHistoryReportList = DataUtil.parse.parseJson(this.ObjInstrumentHistoryReportList); 
    });
  }

  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }


}
