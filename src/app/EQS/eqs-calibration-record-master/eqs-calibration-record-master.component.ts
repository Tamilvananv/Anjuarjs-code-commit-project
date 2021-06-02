import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Edit, GridLine
  , FilterSettingsModel
  , EditSettingsModel
  , ToolbarService
  , CommandClickEventArgs, ToolbarItems
  , CommandModel, GridComponent, TextWrapSettingsModel, GroupSettingsModel ,ExcelExportProperties,Column,IFilter,PdfExportProperties} from '@syncfusion/ej2-angular-grids';
import { ToastrService } from 'ngx-toastr';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { FilterService } from '@syncfusion/ej2-angular-grids';
import { EqsCalibrationService } from './service/eqs-calibration.service';
import { Router } from '@angular/router';
import { EqsCalibration } from './Service/eqs-calibration.model'
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { isUndefined, isNullOrUndefined } from 'util';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { CommonService } from 'src/app/Shared Services etc/Services/Common.service';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { environment } from 'src/environments/environment';
import { DataUtil } from '@syncfusion/ej2-data';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
@Component({
  selector: 'app-eqs-calibration-record-master',
  templateUrl: './eqs-calibration-record-master.component.html',
  providers: [FilterService, ToolbarService],
  styleUrls: ['./eqs-calibration-record-master.component.css']
})
export class EqsCalibrationRecordMasterComponent implements AfterViewInit {
  constructor(private routes: Router
    , private modalService: NgbModal
    , private toastr: ToastrService
    , private _eqsCalibrationService: EqsCalibrationService
    , private formBuilder: FormBuilder
    , private formErrorDisplay: FormErrorDisplayService
    ,private _common: CommonService
    , private confirmationDialogService: ConfirmationDialogService
    ) { }
    public ajaxSettings: AjaxSettingsModel;
    public searchSettings: SearchSettingsModel;
    public navigationPaneSettings: object;
    public contextMenuSettings: object;
   public toolbarSettings:object;
    closeResult: string;
  public dateValue: Date = new Date();
  public format: string = 'dd-MMMM-yyyy';//this for datepicker format
  public filterOptions: FilterSettingsModel;
  public objEquipmentType: Object={};
  public ObjEquipmentList: object[];
  public ObjCalibrationList: object[];
  public ObjCalibrationPerformedByNameList: object[];
  CalibrationForm: FormGroup;
  public IsCalibrationEdit = false;
  public editSettings: EditSettingsModel;
  public toolbar: String[];
  public commands: CommandModel[];
  public toolbarOptions: ToolbarItems[];
  public initialPage: Object;
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  public PageAccessRight: object = {};
  public filter: IFilter;
  public Dateformat:any;
  public pageSettings: Object;
  public DisableButton = false;
   public ObjEquipmentTypeList: object[];
  public ObjEquipmentListNew: object[];
  public ObjCalibrationListNew:  object[];
  public flag = false;
  public id;
  
  show:boolean=true; 
  public ObjEquipmentTypeName:string

  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild('addCalibrationModal', { static: false }) CalibrationModal;
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
  public items2: ItemModel[] = [
    {
      text: 'Inhouse'
    },
    {
      text: 'Vendor'
    }
  ];
  // End of 2 drop down
  // start of table field
  public data: object[];
  public lines: GridLine;
  // uploader
  public _restApi = environment.apiUrl + '/FileManager/';

  public EqsCalibrationRecordId:Number;
  public EqsEquipmentId:Number;
  public CalibrationAttachmentList:object[];
  public ServiceAttachmentList:object[];
  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };
  public onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {

      console.log('File uploaded successfully');
    }
  }

  public onUploadFailure(args: any): void {
    console.log('File failed to upload');
  }
  // tslint:disable-next-line:member-ordering
  public dropEle: HTMLElement;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.show=false; 
    this._eqsCalibrationService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });

    this.setForm();
    this.load();
    this.initFileManager();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    // this.commands = [{ buttonOption: { content: 'Edit', cssClass: 'edit_link' } }];
   this.commands = [{ type: 'Edit', buttonOption: { iconCss: 'fa fa-edit', cssClass: 'e-flat' } }, { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-icons e-add' } }];
    // this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
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
    this.toolbarOptions = ['ExcelExport', 'Search',"PdfExport"];
    this.toolbar=['Search']
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: 'Content' };
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
     this.navigationPaneSettings = { maxWidth: '850px', minWidth: '140px', visible: true };
     this.contextMenuSettings = { file: ['Open', '|', 'Details','Download'], folder: ['Open', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Details', '|'], visible: true };
     this.toolbarSettings = { items: ['Refresh', 'View', 'Details'], visible: true };
   }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        (this.grid.columns[6] as Column).visible = false;
        const excelExportProperties: ExcelExportProperties = {
        fileName: 'Equipment_Calibration.xlsx'
    };
    var ObjAudit = { 
      FeatureName:"Calibration", 
      Description:"Excel Report Is Downloaded." 
   };
    this._eqsCalibrationService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
      if (res["Result"]) {
        this.grid.excelExport(excelExportProperties);
      } else {    
      }
    });   
    
        break;
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Equipment_Calibration.pdf",
            pageOrientation: 'Landscape',
          };
          var ObjAudit = { 
            FeatureName:"Calibration", 
            Description:"Pdf Report Is Downloaded." 
         };
          this._eqsCalibrationService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
  OpenModal(addCalibrationModal) {
    this.IsCalibrationEdit = false;
      this.objEquipmentType = {};
      this.ObjEquipmentTypeName = null
    this.resetForm();
    this.modalService.open(addCalibrationModal, {
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
  ngAfterViewInit() { }
  load() {
    this.GetCalibrationList();
    this.GetEquipmentList();
    this.GetCalibrationPerformedByNameList();
    this.GetEquipmentTypeList();
  }
  setForm() {
    this.CalibrationForm = this.formBuilder.group({
      EqsCalibrationRecordId: [''],
      EqsEquipmentId: ['', Validators.required],
      EquipmentTypeId: [''],
      EqsCalibrationPerformedById: ['', Validators.required],
      CalibrationPerformedDate:  ['', Validators.required],
      CalibrationDescription: [''],
      AttachmentList: new FormArray([]),
      ServiceAttachmentList: new FormArray([])
    });
  }
  resetForm() {
    this.CalibrationForm.reset();
    this.ServiceAttachmentList=[];
    this.CalibrationAttachmentList=[];
  }
  GetEquipmentTypeById(EqsEquipmentId) {
    this._eqsCalibrationService.GetEquipmentTypeById(EqsEquipmentId.value).subscribe((data) => {
      this.objEquipmentType = data['Object'];
       this.ObjEquipmentTypeName =this.objEquipmentType['Name'];
      if( this.objEquipmentType['CalibrationRequired'] != true)
      {
        this.toastr.error("Calibration Required Is Set to No. Please Go to Equipment Master And Edit The Equipment");
        this.DisableButton = true;
      }
    //  console.log( this.objEquipmentType)
    });
  }
  GetCalibrationPerformedByNameList() {
    this._eqsCalibrationService.GetCalibrationPerformedByNameList().subscribe((data) => {
      this.ObjCalibrationPerformedByNameList = data['Object'];
    });
  }
  GetEquipmentList() {
    this._eqsCalibrationService.GetCalibrationRequiredEquipmentId().subscribe((data) => {
      this.ObjEquipmentList = data['Object'];
       this.ObjEquipmentListNew =  this.ObjEquipmentList
     // console.log("equipment Id :",this.ObjEquipmentList) 
    });
  }
  GetCalibrationList() {
   
    this._eqsCalibrationService.GetCalibrationList().subscribe((data) => {
      this.ObjCalibrationList = data['Object'];
      for(var i=0;i<this.ObjCalibrationList.length;i++)
      {
        if(this.ObjCalibrationList[i]["EqsCalibrationDueDate"] != null )
        {
        this.ObjCalibrationList[i]["EqsCalibrationDueDate"] = new Date(this.ObjCalibrationList[i]["EqsCalibrationDueDate"]);
        }
        if(this.ObjCalibrationList[i]["EqsCalibrationPerformedDate"] != null )
        {
         this.ObjCalibrationList[i]["EqsCalibrationPerformedDate"] = new Date(this.ObjCalibrationList[i]["EqsCalibrationPerformedDate"]);
         
         this.ObjCalibrationList[i]["ShowCalibrationAddButton"] = false;
         this.ObjCalibrationList[i]["ShowCalibrationEditButton"] = true;
        
        } 
         if(this.ObjCalibrationList[i]["EqsCalibrationNextDueDate"] != null )
         {
         this.ObjCalibrationList[i]["EqsCalibrationNextDueDate"] = new Date(this.ObjCalibrationList[i]["EqsCalibrationNextDueDate"]);
         }
        }
      this.ObjCalibrationList = DataUtil.parse.parseJson(this.ObjCalibrationList);
       if(this.flag == true)
      {
        //  console.log("Equipment Id GetCalibrationList :",this.id)
      this.GetEquipmentListById(this.id)
      
      } 
    });
  }

  SaveCalibration() {
    if (this.CalibrationForm.valid) {
      let CalibrationAttachmentList = this.CalibrationForm.get('AttachmentList').value;
      let ServiceAttachmentList = this.CalibrationForm.get('ServiceAttachmentList').value;
     
      this._eqsCalibrationService.SaveEqsCalibration(this.CalibrationForm.value,CalibrationAttachmentList,ServiceAttachmentList).subscribe(res => {
        if (res['Result']) {
          this.toastr.success(res['ResultMessage']);
          this.flag = true;
          let  result = res['Id'];
          this.id = result;
         // console.log("Equipment Id Save :",result) 
          this.GetCalibrationList();
          this.resetForm();
          this.closeQualificationModal();
        }
        else {
          this.toastr.error(res['ResultMessage']);
        }
      });
  }
  else{
    this.formErrorDisplay.showErrors(this.CalibrationForm);
  }
  }
  closeQualificationModal() {
    this.modalService.dismissAll();
  }
  editCalibration(EqsCalibrationRecordId,flag): void {
    this._eqsCalibrationService.GetCalibrationDetail(EqsCalibrationRecordId).subscribe((res) => {
      const ObjectData = res['Object'] as EqsCalibration;
      this.CalibrationAttachmentList=ObjectData.CalibrationAttachmentList;
      this.ServiceAttachmentList=ObjectData.ServiceAttachmentList;
      if(ObjectData!=null){
        this.CalibrationForm.patchValue({
          EqsCalibrationRecordId: ObjectData.EqsCalibrationRecordId,
          EqsEquipmentId: ObjectData.EqsEquipmentId,
          EquipmentId: ObjectData.EquipmentId,
          EquipmentTypeId: ObjectData.EquipmentTypeId,
          EqsCalibrationPerformedById: ObjectData.EqsCalibrationPerformedById,
          CalibrationPerformedDate:  ObjectData.CalibrationPerformedDate,
          // EqsCalibrationLink: ObjectData.EqsCalibrationLink,
          // EqsServiceCalibrationLink: ObjectData.EqsServiceCalibrationLink,
          CalibrationDescription:ObjectData.CalibrationDescription
        })
         if(flag == false)
        { 
        this.IsCalibrationEdit = true;
        this.ObjEquipmentTypeName = ObjectData.EquipmentTypeName;
        }
      }
      else{
        this.CalibrationForm.patchValue({
          EqsCalibrationRecordId: null,
          EqsEquipmentId: null,
          EquipmentId: null,
          EquipmentTypeId: null,
          EqsCalibrationPerformedById: null,
          CalibrationPerformedDate:  null,
          // EqsCalibrationLink: null,
          // EqsServiceCalibrationLink:null,
          CalibrationDescription:null
        })
      }
      if (res['Result']===false) {
        this.toastr.error(res['ResultMessage']);
      }
    //  console.log(this.CalibrationForm.value);
    });
  }
  UpdateCalibration() {
    if (this.CalibrationForm.valid) {
      let CalibrationAttachmentList = this.CalibrationForm.get('AttachmentList').value;
      let ServiceAttachmentList = this.CalibrationForm.get('ServiceAttachmentList').value;
      this._eqsCalibrationService.UpdateEqsCalibration(this.CalibrationForm.value,CalibrationAttachmentList,ServiceAttachmentList).subscribe(res => {
        if (res['Result']) {
           this.flag = true;
           let  result = res['Id'];
          this.id = result;
          console.log("Equipment Id update :",result) 
          this.toastr.success(res['ResultMessage']);
          this.GetCalibrationList();         
          this.resetForm();
          this.closeQualificationModal();
        }
        else {
          this.toastr.error(res['ResultMessage']);
        }
      });
}
else{
  this.formErrorDisplay.showErrors(this.CalibrationForm);
}
}
public onFileSelect: EmitType<Object> = (args: any) => {
  args.filesData.forEach(file => {
    (this.CalibrationForm.controls.AttachmentList as FormArray).push(this.formBuilder.group({
      Attachment: file.rawFile
    }));
  });
  console.log(this.CalibrationForm.get('AttachmentList').value);
}
public onServiceFileSelect: EmitType<Object> = (args: any) => {
  args.filesData.forEach(file => {
    (this.CalibrationForm.controls.ServiceAttachmentList as FormArray).push(this.formBuilder.group({
      Attachment: file.rawFile
    }));
  });
    console.log(this.CalibrationForm.get('ServiceAttachmentList').value);
}
  /* DownlLoadFile(filePath) {
    this._common.DownlLoadFile(filePath);
  }
 */
  DownLoadFile(filePath) {
    this._common.DownLoadFile(filePath).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  }

  setRowId(data){
    this.EqsCalibrationRecordId= data.EqsCalibrationRecordId;
    this.EqsEquipmentId =data.EqsEquipmentId;
  }
  beforeSend(args) {
    let restrictedPath ="EQSCalibration/Equip_" + this.EqsEquipmentId + "/" + this.EqsCalibrationRecordId ;
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
    (this.grid.columns[6] as Column).visible = true;
  }
  pdfHeaderQueryCellInfo(args: any): void {
    args.cell.row.pdfGrid.repeatHeader = true;
  }

  actionCalibration(args: CommandClickEventArgs): void {
    switch (args['commandColumn']['type']) {
      case 'Delete':
     /*  this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
            if (result) {
               // this.DeleteCalibration(args['rowData']['EqsCalibrationRecordId']);
            }
            });  */
           
            this.OpenModal(this.CalibrationModal);
            if(args['rowData']['EqsCalibrationRecordId'] > 0)
            {
            this.editCalibration(args['rowData']['EqsCalibrationRecordId'],true);
            this.ObjEquipmentTypeName = this. ObjCalibrationListNew[0]['EquipmentTypeName']
            }
            else
            {
              this.ShowRecordOnAddCalibration(args['rowData']['EqsEquipmentId'],true)
            }
           
        break;
    case 'Edit':
              this.OpenModal(this.CalibrationModal);
              this.editCalibration(args['rowData']['EqsCalibrationRecordId'],false);
    break;
      default:
        break;
    }
}

DeleteCalibration(EqsCalibrationRecordId){
 
  this._eqsCalibrationService.DeleteCalibration(EqsCalibrationRecordId).subscribe(res => {
    if (res['Result']) {
      this.toastr.success(res['ResultMessage']);
      this.GetCalibrationList();
    }
    else {
      this.toastr.error(res['ResultMessage']);
    }
  });
}

checkCalibraationRequired(EqsEquipmentId)
{
  let Result = this.ObjEquipmentList.filter((f) => f['Id'] ==EqsEquipmentId );
 // console.log("Result :",Result)
}


 GetEquipmentTypeList() {
  this._eqsCalibrationService.GetEquipmentTypeList().subscribe((data) => {
    this.ObjEquipmentTypeList = data['Object'];
 // console.log("equipment Type :",this.ObjEquipmentTypeList)
  });
}

GetEquipmentIdByName(EquipmenttypeId) {
  let Result = this.ObjEquipmentList.filter((f) => f['EquipmentTypeId'] ==EquipmenttypeId.value );
  this.ObjEquipmentListNew = Result;
}

async GetEquipmentListById(EqsEquipmentId) {
  let Result =[];
  let SaveFlag = false;
  this.flag = false;
  this.show=true; 
  this.ObjCalibrationListNew  = null;
  if( isNullOrUndefined (EqsEquipmentId.value))
  {
    Result = this.ObjCalibrationList.filter((f) => f['EqsEquipmentId'] ==EqsEquipmentId );
    SaveFlag =  true;
  }
  else
  {
    Result = this.ObjCalibrationList.filter((f) => f['EqsEquipmentId'] ==EqsEquipmentId.value );
    SaveFlag = false;
  }
  if(Result.length <= 0)
  {  
    this._eqsCalibrationService.GetEquipmentAndType(EqsEquipmentId.value).subscribe((data) => {
      this.ObjCalibrationListNew = data['Object'];  
      for(var i=0;i<this.ObjCalibrationListNew.length;i++)
      {
        if(this.ObjCalibrationListNew[i]["EqsCalibrationDueDate"] != null )
        {
        this.ObjCalibrationListNew[i]["EqsCalibrationDueDate"] = new Date(this.ObjCalibrationListNew[i]["EqsCalibrationDueDate"]);
        } 
      }
      this.ObjCalibrationListNew = DataUtil.parse.parseJson(this.ObjCalibrationListNew);
    });
  }
  else
  {
    if(SaveFlag == false)
    {
        let flag = false;
        let  EqsEquipmentIdValue = null;
        for(var i=0 ; i< Result.length ;i++)
        {
          if(Result[i].EqsCalibrationPerformedDate == null)
          {
            flag = true
          }   
          EqsEquipmentIdValue =  Result[i].EqsEquipmentId
        }

        if(flag == false)
        {
          if(EqsEquipmentIdValue != null)
          {
            await  this._eqsCalibrationService.SaveCalibrationRecord(EqsEquipmentIdValue).subscribe(res => {
              if (res['Result']) {        
                this.flag = true;          
                this.id = EqsEquipmentIdValue;
               // console.log("Equipment Id Save :",EqsEquipmentIdValue) 
                this.GetCalibrationList();
              
              }
              else {
                this.toastr.error(res['ResultMessage']);
              }
            });
        }
        }
    }
  this. ObjCalibrationListNew = Result;
  }
  
}


ShowRecordOnAddCalibration(EqsEquipmentId,flag): void {

  if(this.ObjCalibrationListNew!=null){
  this.CalibrationForm.patchValue({       
    EqsEquipmentId:  this. ObjCalibrationListNew[0]['EqsEquipmentId'],
    EquipmentId:  this. ObjCalibrationListNew[0]['EquipmentId'],
    EquipmentTypeId:  this. ObjCalibrationListNew[0]['EquipmentTypeId']    
  })    
this.ObjEquipmentTypeName = this. ObjCalibrationListNew[0]['EquipmentTypeName']    
  }

} 

 /*  rowDataBound(args) {
 console.log("args :",args)
    if (args.data.EqsCalibrationPerformedDate  !=  null) {
      var x = args.row.querySelector(
        ".e-rowcell.e-unboundcell .e-editbutton .e-add"
      );
      console.log("x :",x)
      if (x == null) {
        x.classList.add("deactivate");
      }
    
   
  } 
}  */

addCalibration(event, data)
  {
    this.OpenModal(this.CalibrationModal);
    if(data['EqsCalibrationRecordId'] > 0)
    {
    this.editCalibration(data['EqsCalibrationRecordId'],true);
    this.ObjEquipmentTypeName = this. ObjCalibrationListNew[0]['EquipmentTypeName']
    }
    else
    {
      this.ShowRecordOnAddCalibration(data['EqsEquipmentId'],true)
    }
  }


  EditCalibration(event, data)
  {   
    this.OpenModal(this.CalibrationModal);
    this.editCalibration(data['EqsCalibrationRecordId'],false);
  }


 
}
