import { Component, OnInit , ViewChild} from '@angular/core';
import { EqsReportService } from '../service/eqs-report.service';
import { Edit, GridLine, FilterSettingsModel,GridComponent, EditSettingsModel, CommandClickEventArgs, ToolbarItems, CommandModel, TextWrapSettingsModel, GroupSettingsModel ,ExcelExportProperties,IFilter
,PdfExportProperties} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DataUtil } from '@syncfusion/ej2-data'; 

@Component({
  selector: 'app-eqs-calibration-report',
  templateUrl: './eqs-calibration-report.component.html',
  styleUrls: ['./eqs-calibration-report.component.css']
})
export class EqsCalibrationReportComponent implements OnInit {
  public toolbarOptions: ToolbarItems[];
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public ObjCalibrationList: object[];
   public lines: GridLine;
    public filterOptions: FilterSettingsModel;
    public initialPage: Object;
    public toolbar: String[];
    public wrapSettings: TextWrapSettingsModel;
    public groupOptions: GroupSettingsModel;
    public filter: IFilter; 
    public Dateformat:any;
    public pageSettings: Object;
  constructor(private _eqsReportService: EqsReportService) { }

  ngOnInit() {
    this.lines = 'Both';
    this.GetCalibrationList();
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
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: 'Content' };
   
    this.groupOptions = { showGroupedColumn: true };
    
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id){
     case 'Grid_excelexport':
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Equipment_Calibration_Report.xlsx'
    };
    var ObjAudit = { 
      FeatureName:"Report", 
      Description:"Calibration Excel Report Is Downloaded." 
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
          fileName: "Equipment_Calibration_Report.pdf",
          pageOrientation: 'Landscape',
        };  
        var ObjAudit = { 
          FeatureName:"Report", 
          Description:"Calibration Pdf Report Is Downloaded." 
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
  GetCalibrationList() {
    this._eqsReportService.GetEquipmentCalibrationReport().subscribe((data) => {
      this.ObjCalibrationList = data['Object'];
for(var i = 0 ; i<  this.ObjCalibrationList.length;i++)
{
  this.ObjCalibrationList[i]["EqsCalibrationDueDate"] = new Date(this.ObjCalibrationList[i]["EqsCalibrationDueDate"]); 
  this.ObjCalibrationList[i]["EqsCalibrationPerformedDate"] = new Date(this.ObjCalibrationList[i]["EqsCalibrationPerformedDate"]); 
  this.ObjCalibrationList[i]["EqsCalibrationNextDueDate"] = new Date(this.ObjCalibrationList[i]["EqsCalibrationNextDueDate"]); 
}
this.ObjCalibrationList = DataUtil.parse.parseJson(this.ObjCalibrationList); 
    });
  }

  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }


}
