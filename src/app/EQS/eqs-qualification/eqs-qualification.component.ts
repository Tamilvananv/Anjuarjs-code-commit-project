import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Edit, GridLine, FilterSettingsModel, EditSettingsModel, ToolbarService, GridComponent
  , CommandClickEventArgs, ToolbarItems, CommandModel, TextWrapSettingsModel, GroupSettingsModel,ExcelExportProperties,Column ,IFilter,PdfExportProperties} from '@syncfusion/ej2-angular-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { FilterService } from '@syncfusion/ej2-angular-grids';
import { EqsQualificationService } from './service/eqs-qualification.service';
import { EqsQualification } from '../eqs-master/service/eqs-qualification.model';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { CommonService } from 'src/app/Shared Services etc/Services/Common.service';
import { environment } from 'src/environments/environment';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';
import { DataUtil } from '@syncfusion/ej2-data';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
@Component({
  selector: 'app-eqs-qualification',
  templateUrl: './eqs-qualification.component.html',
  providers: [FilterService],
  styleUrls: ['./eqs-qualification.component.css']
})
export class EqsQualificationComponent implements OnInit {
  constructor(private modalService: NgbModal
    , private _toastr: ToastrService
    , private _eqsqualificationService: EqsQualificationService
    , private formBuilder: FormBuilder
    , private formErrorDisplay: FormErrorDisplayService
    ,private _common: CommonService
    ,private _eqsCommonService: EqsCommonService
    , private confirmationDialogService: ConfirmationDialogService
    ) { }

    public ajaxSettings: AjaxSettingsModel;
    public searchSettings: SearchSettingsModel;
    public navigationPaneSettings: object;
    public contextMenuSettings: object;
   public toolbarSettings:object;
    closeResult: string;
    public _restApi = environment.apiUrl + '/FileManager/';
  qualificationForm: FormGroup;
  public dateValue: Date = new Date();
  public format: string = 'dd-MMM-yyyy';//this for datepicker format
  public filterOptions: FilterSettingsModel;
  public objEqsQualificationTypeList: Object[];
  public ObjEquipmentList: object[];
  public ObjEquipmentTypeList: object;
  public IsQualificationEdit = false;
  public ObjQualificationList: object[];
  public editSettings: EditSettingsModel;
  public AttachmentList:object[];
  public QualificationTypeRecordId:Number;
  public EqsQualificationTypeName:String;
  public EqsEquipmentId:Number;
  public ObjEquipmentTypeName:string

 // public toolbar: ToolbarItems[];
 public toolbar: String[];
  public initialPage: Object;
  public commands: CommandModel[];
  public Dateformat:any;
  public data3: { [key: string]: Object; }[] = [
    { Name: 'Select', Code: 'S' }
  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Name', value: 'Id' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to ComboBox input element
  public watermark: string = 'Select';
  public watermark1: string = 'Select Type';
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data3, query);
  }
  public toolbarOptions: ToolbarItems[];
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  public PageAccessRight: object = {};
  public filter: IFilter;
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild('qualificationModal', { static: false }) QualificationModal;
  public data: object[];
  public lines: GridLine;
  // tslint:disable-next-line:member-ordering
  public dropEle: HTMLElement;
  // tslint:disable-next-line:use-life-cycle-interface
  // folder manager
  public view: string;
  public hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/'; // replace with or api to read and upload files
  // tslint:disable-next-line:use-life-cycle-interface
  public pageSettings: Object;
  ngOnInit(): void {

    this._eqsqualificationService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });
    this.load();
    this.initFileManager();
    this.setForm();
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
    this.wrapSettings = { wrapMode: 'Content' };
  //  this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }, { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }];
    
  this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
  
  
  
  // uploader
    this.dropEle = document.getElementById('droparea');
    // Initial view of File Manager is set to details view
    this.view = 'Details';
    this.toolbarOptions = ['ExcelExport', 'Search',"PdfExport"];
    this.toolbar=['Search'];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSize: 10 };
    this.groupOptions = { showGroupedColumn: true };
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
  // File Manager's created event function
  onCreate(args: any) {
    console.log('File Manager has been created successfully');
  }
  // Start of modal ( add parameter pop up)
  setForm() {
    this.qualificationForm = this.formBuilder.group({
      EqsQualificationTypeRecordId: [''],
      EqsEquipmentId: ['', Validators.required],
      EqsQualificationTypeId: ['', Validators.required],
      EqsQualificationDate: ['', Validators.required],
      EqsQualificationDescription: [''],
      EqsQualificationPerformedByName:['', Validators.required],
      AttachmentList: new FormArray([])
    });
  }
  resetForm() {
    this.qualificationForm.reset();
    this.AttachmentList=[];
  }
  openAddModal(content) {
    this.IsQualificationEdit = false;
    this.ObjEquipmentTypeList={};
    this.ObjEquipmentTypeName = null;
    this.resetForm();
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        (this.grid.columns[5] as Column).visible = false;
        case 'Grid_excelexport':
          const excelExportProperties: ExcelExportProperties = {
            fileName: 'Equipment_Qualification.xlsx'
        };
        var ObjAudit = { 
          FeatureName:"Qualification", 
          Description:"Excel Report Is Downloaded." 
       };
        this._eqsqualificationService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
        this._eqsqualificationService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
  load() {
    this.GetEqsQualificationTypeList();
    this.GetEquipmentList();
    this.GetQualificationList();
    this.GetEquipmentTypeList();
  }
  GetEqsQualificationTypeList() {
    this._eqsqualificationService.GetEqsQualificationTypeList().subscribe((data) => {
      this.objEqsQualificationTypeList = data['Object'];
    });
  }
  GetEquipmentTypeById(EqsEquipmentId) {
    this._eqsCommonService.GetEquipmentTypeById(EqsEquipmentId.value).subscribe((data) => {
      this.ObjEquipmentTypeList = data['Object'];
      this.ObjEquipmentTypeName = this.ObjEquipmentTypeList['Name'];
    });
  }
  GetEquipmentList() {
    this._eqsqualificationService.GetEquipmentList().subscribe((data) => {
      this.ObjEquipmentList = data['Object'];
    
    });
  }
  GetEquipmentTypeList() {
    this._eqsCommonService.GetEquipmentTypeList().subscribe((data) => {
      this.ObjEquipmentTypeList = data['Object'];
    });
  }
  SaveQualification() {
      if (this.qualificationForm.valid) {
          let fileList = this.qualificationForm.get('AttachmentList').value;
        this._eqsqualificationService.SaveQualification(this.qualificationForm.value,fileList).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetQualificationList();
            this.resetForm();
            this.closeQualificationModal();
          }
          else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      }
      else{
        this.formErrorDisplay.showErrors(this.qualificationForm);
      }
  }
  closeQualificationModal() {
    this.modalService.dismissAll();
  }
  editQualification(EqsQualificationTypeRecordId): void {
    this._eqsqualificationService.GetQualificationDetail(EqsQualificationTypeRecordId).subscribe((data) => {
      const ObjectData = data['Object'] as EqsQualification;
         this.AttachmentList=ObjectData.AttachmentList;
      if(ObjectData!=null){
        this.qualificationForm.patchValue({
          EqsQualificationTypeRecordId: ObjectData.EqsQualificationTypeRecordId,
          EqsEquipmentId: ObjectData.EqsEquipmentId,
          EqsQualificationTypeId:ObjectData.EqsQualificationTypeId,
          EqsQualificationDate: ObjectData.EqsQualificationDate,
          EqsQualificationDescription: ObjectData.EqsQualificationDescription,
          EqsQualificationPerformedByName:ObjectData.EqsQualificationPerformedByName,
        });
        this.IsQualificationEdit = true;
        this.ObjEquipmentTypeName = ObjectData.EquipmentTypeName;
      }
      else{
        this.qualificationForm.patchValue({
          EqsQualificationTypeRecordId: null,
          EqsEquipmentId: null,
          EqsQualificationTypeId:null,
          EqsQualificationDate: null,
          EqsQualificationDescription: null,
          EqsQualificationPerformedByName:null,
        });
      }
    });
  }
  UpdateQualification() {
      if (this.qualificationForm.valid) {
          let fileList = this.qualificationForm.get('AttachmentList').value;
        this._eqsqualificationService.UpdateEqsQualification(this.qualificationForm.value,fileList).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetQualificationList();
            this.resetForm();
            this.closeQualificationModal();
          }
          else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      }
      else{
        this.formErrorDisplay.showErrors(this.qualificationForm);
      }
  }
  GetQualificationList() {
    this._eqsqualificationService.GetQualificationList().subscribe((data) => {
      this.ObjQualificationList = data['Object'];
      for(var i = 0 ; i< this.ObjQualificationList.length ; i++)
      {
        this.ObjQualificationList[i]["EqsQualificationDate"] = new Date(this.ObjQualificationList[i]["EqsQualificationDate"]);
      }
      this.ObjQualificationList = DataUtil.parse.parseJson(this.ObjQualificationList);
    });
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    args.filesData.forEach(file => {
      (this.qualificationForm.controls.AttachmentList as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });
  }
  setRowId(data){
    this.EqsQualificationTypeName= data.EqsQualificationTypeName;
    this.EqsEquipmentId =data.EqsEquipmentId;
  }
  /* DownlLoadFile(filePath) {
    this._common.DownlLoadFile(filePath);
  } */

  DownLoadFile(filePath) {
    this._common.DownLoadFile(filePath).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
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

  excelExportComplete(): void {
    (this.grid.columns[5] as Column).visible = true;
  }

  pdfHeaderQueryCellInfo(args: any): void {
    args.cell.row.pdfGrid.repeatHeader = true;
  }


  actionQualification(args: CommandClickEventArgs): void {
    switch (args['commandColumn']['type']) {
      case 'Delete':
      this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
            if (result) {
              //  this.DeleteQualification(args['rowData']['EqsQualificationTypeRecordId']);
            }
            });
        break;
    case 'Edit':this.openAddModal(this.QualificationModal);
              this.editQualification(args['rowData']['EqsQualificationTypeRecordId']);
    break;
      default:
        break;
    }
}

DeleteQualification(EqsQualificationTypeRecordId){
  this._eqsqualificationService.DeleteQualification(EqsQualificationTypeRecordId).subscribe(res => {
    if (res['Result']) {
      this._toastr.success(res['ResultMessage']);
      this.GetQualificationList();
    }
    else {
      this._toastr.error(res['ResultMessage']);
    }
  });
}

}
