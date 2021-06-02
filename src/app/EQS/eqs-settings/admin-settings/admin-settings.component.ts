import { Component, OnInit,ViewChild } from '@angular/core';
import { Edit, GridLine, FilterSettingsModel,GridComponent, EditSettingsModel, CommandClickEventArgs, ToolbarItems, CommandModel, TextWrapSettingsModel, GroupSettingsModel ,ExcelExportProperties,IFilter
  ,PdfExportProperties,Column} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DataUtil } from '@syncfusion/ej2-data'; 
import { EquipmentAdminSettingService } from "../service/eqs-adminsettings.service";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;

  public lines: GridLine;
  public toolbarOptions: ToolbarItems[];
  public filterOptions: FilterSettingsModel;
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  public filter: IFilter; 
  public Dateformat:any;
  public pageSettings: Object;
  public initialPage: Object;
  public ObjQualificationList: object[];
  public EqsQualificationTypeName:String;
  public EqsEquipmentId:Number;
  closeResult: string;
  public ajaxSettings: AjaxSettingsModel;
  public _restApi = environment.apiUrl + '/FileManager/';
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
 public toolbarSettings:object;

  constructor( private eqsAdminSettingService: EquipmentAdminSettingService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
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
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: 'Content' };   
    this.groupOptions = { showGroupedColumn: true };

    this.GetQualificationList();
    this.initFileManager();
  }

  GetQualificationList() {
    this.eqsAdminSettingService.GetQualificationList().subscribe((data) => {
      this.ObjQualificationList = data['Object'];
      for(var i = 0 ; i< this.ObjQualificationList.length ; i++)
      {
        this.ObjQualificationList[i]["EqsQualificationDate"] = new Date(this.ObjQualificationList[i]["EqsQualificationDate"]);
      }
      this.ObjQualificationList = DataUtil.parse.parseJson(this.ObjQualificationList);
    });
  }

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        (this.grid.columns[4] as Column).visible = false;
        case 'Grid_excelexport':
          const excelExportProperties: ExcelExportProperties = {
            fileName: 'Equipment_Qualification.xlsx'
        };
        var ObjAudit = { 
          FeatureName:"Qualification", 
          Description:"Excel Report Is Downloaded." 
       };
        this.eqsAdminSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.excelExport(excelExportProperties);
          } else {    
          }
        });  
    
        break;
        case "Grid_pdfexport":
        const pdfExportProperties: PdfExportProperties = {
          fileName: "Equipment_Qualification.pdf",
          pageOrientation: 'Landscape',
        };

        var ObjAudit = { 
          FeatureName:"Qualification", 
          Description:"Pdf Report Is Downloaded." 
       };
        this.eqsAdminSettingService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.pdfExport(pdfExportProperties);
          } else {    
          }
        });  
      
        break;
    }
  }

  pdfHeaderQueryCellInfo(args: any): void {
    args.cell.row.pdfGrid.repeatHeader = true;
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

  excelExportComplete(): void {
    (this.grid.columns[4] as Column).visible = true;
  }

  setRowId(data){
    this.EqsQualificationTypeName= data.EqsQualificationTypeName;
    this.EqsEquipmentId =data.EqsEquipmentId;
  }

  openAddModal(content) {  
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

  initFileManager() {
    this.ajaxSettings = {
      url: this._restApi + 'FileOperations',
      getImageUrl: this._restApi + 'GetImage',
      uploadUrl: this._restApi + 'Upload',
      downloadUrl: this._restApi + 'Download'
    };
    this.searchSettings = {
      allowSearchOnTyping: false
    };
    this.navigationPaneSettings = environment.navigationPaneSettings;
    this.contextMenuSettings = environment.contextMenuSettings;
    this.toolbarSettings = environment.toolbarSettings;
    // this.showHiddenItems = true;
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

  beforeSend(args) {
    // Get the value of Dropdownlist.
    let restrictedPath ="EQSQualification/Equip_" + this.EqsEquipmentId + "/" + this.EqsQualificationTypeName;
    if (args["name"] == 'beforeImageLoad' && args['imageUrl'].indexOf(restrictedPath) == -1) {
      let indexOfPath = args['imageUrl'].indexOf('path=') + 5;
      args["imageUrl"] = args['imageUrl'].substring(0, indexOfPath) + restrictedPath + args['imageUrl'].substring(indexOfPath);
    } else if (args.name == "beforeDownload") {
      if (args.data["path"].indexOf(restrictedPath) == -1) {
        args.data["path"] = restrictedPath + args.data["path"];
      }
    } else {
      var data = JSON.parse(args.ajaxSettings.data);
      if (args["action"] == 'Upload') {
        args.cancel=true;
        if (data[0]["path"].indexOf(restrictedPath) == -1) {
          data[0]["path"] = restrictedPath + data[0]["path"];
        }
      } else if (data["path"].indexOf(restrictedPath) == -1) {
        data["path"] = restrictedPath + data["path"];
        if (args["action"] == 'move') {
          data["targetPath"] = restrictedPath + data["targetPath"];
        }
      }
      args.ajaxSettings.data = JSON.stringify(data);
    }
  }

}
