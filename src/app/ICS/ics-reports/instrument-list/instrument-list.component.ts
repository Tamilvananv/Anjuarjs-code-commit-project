import { Component, OnInit , ViewChild} from '@angular/core';
import { GridLine, FilterSettingsModel, ToolbarItems, GroupSettingsModel, ExcelExportProperties ,IFilter,PdfExportProperties} from '@syncfusion/ej2-grids';
import { IcsReportService } from '../Service/ics-report.service';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.css']
})
export class InstrumentListComponent implements OnInit {
  public toolbarOptions: ToolbarItems[];
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public ObjInstrumentReportList: object[];
  constructor(private _icsReportService: IcsReportService) { }
  public lines: GridLine;
  public filterOptions: FilterSettingsModel;
  public height: string = '220px';
  public pageSettings: Object;
  public toolbar: String[];
  public groupOptions: GroupSettingsModel;
  public filter: IFilter; 
  public Dateformat:any;

  ngOnInit() {
    this.GetInstrumentListReport();
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
    this.groupOptions = { showGroupedColumn: true };
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSizes: 10 };
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id){
      case 'Grid_excelexport':
       const excelExportProperties: ExcelExportProperties = {
         fileName: 'Instrument_List_Report.xlsx'
     };
     var ObjAudit = { 
      FeatureName:"Report", 
      Description:"List Excel Report Is Downloaded." 
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
          fileName: "Instrument_List_Report.pdf",
          pageOrientation: 'Landscape',
        };   
        var ObjAudit = { 
          FeatureName:"Report", 
          Description:"List Pdf Report Is Downloaded." 
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
  GetInstrumentListReport() {
    this._icsReportService.GetInstrumentListReport().subscribe((data) => {
      this.ObjInstrumentReportList = data['Object'];
      for(var i=0;i<this.ObjInstrumentReportList.length;i++)
      {
        if( this.ObjInstrumentReportList[i]["LastCalibrationPerformedDate"]!=null)
        {
        this.ObjInstrumentReportList[i]["LastCalibrationPerformedDate"] = new Date(this.ObjInstrumentReportList[i]["LastCalibrationPerformedDate"]);
        } 
        if(this.ObjInstrumentReportList[i]["LastQualificationPerformedDate"] !=null)
        {
         this.ObjInstrumentReportList[i]["LastQualificationPerformedDate"] = new Date(this.ObjInstrumentReportList[i]["LastQualificationPerformedDate"]);
        }
        if(this.ObjInstrumentReportList[i]["LastMaintenancePerformedDate"] != null)
        {
         this.ObjInstrumentReportList[i]["LastMaintenancePerformedDate"] = new Date(this.ObjInstrumentReportList[i]["LastMaintenancePerformedDate"]);
        }
      }
      this.ObjInstrumentReportList = DataUtil.parse.parseJson(this.ObjInstrumentReportList); 
    });
  }

  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }


}
