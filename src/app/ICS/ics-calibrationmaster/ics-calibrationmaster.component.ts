import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { GridLine, FilterSettingsModel, CommandClickEventArgs, CommandModel, EditSettingsModel, GroupSettingsModel, ExcelExportProperties,PdfExportProperties, Column ,IFilter} from '@syncfusion/ej2-angular-grids';
import { ToastrService } from 'ngx-toastr';
import {
  FilterService, ToolbarItems,
  GridComponent,
} from '@syncfusion/ej2-angular-grids';
import { IcsCalibrationService } from './service/ics-calibration.service';
import { Calibration } from './service/ics-calibration.model';
import { EmitType } from '@syncfusion/ej2-base';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Filterlist } from './../../Shared Services etc/Pipes/app.filter-list';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { CommonService } from 'src/app/Shared Services etc/Services/Common.service';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { environment } from 'src/environments/environment';
import { DataUtil } from '@syncfusion/ej2-data';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { isUndefined, isNullOrUndefined } from 'util';
@Component({
  selector: 'app-ics-calibrationmaster',
  templateUrl: './ics-calibrationmaster.component.html',
  providers: [FilterService],
  styleUrls: ['./ics-calibrationmaster.component.css']
})
export class IcsCalibrationmasterComponent implements AfterViewInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild('addCalibrationModal', { static: false }) CalibrationModal;
  public ajaxSettings: AjaxSettingsModel;
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
   public toolbarSettings:object;
  closeResult: string;
  CalibrationForm: FormGroup;
  public dateValue: Date = new Date();
  ObjInstrumentList: object[];
  ObjCalibrationList: Object[];
  objInstrumentType: Object[];
  ObjPerformedByList: Object[];
  IsCalibrationEdit = false;
  public filterOptions: FilterSettingsModel;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public data3: { [key: string]: Object; }[] = [{ Name: 'Select', Code: 'S' }];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Name', value: 'Id' };
  // set the height of the popup element
  public height = '220px';
  // set the placeholder to ComboBox input element
  public watermark = 'Select';
  public watermark1 = 'Select Type';
  public dropEle: HTMLElement;
  public data: object[];
  public lines: GridLine;
  public pageSettings: Object;
  public toolbarOptions: ToolbarItems[];
  public toolbar: String[];
  public groupOptions: GroupSettingsModel;
  public filter: IFilter;
  public ObjInstrumentTypeName:string


  public ObjInstrumentListNew: object[];
  show:boolean=true; 
  public flag = false;
  public ObjCalibrationListNew:  object[];
  public id;


  // uploader
 public _restApi = environment.apiUrl + '/FileManager/';
  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove',
  };
  public IcsCalibrationRecordId:Number;
  public IcsInstrumentId:Number;
  public CalibrationAttachmentList:object[];
  public ServiceAttachmentList:object[];
  public PageAccessRight: object = {};
  public Dateformat:any;
  constructor(private modalService: NgbModal, private _toastr: ToastrService
    , private _icscalibrationService: IcsCalibrationService
    , private formErrorDisplay: FormErrorDisplayService
    , private _icsCommonService: IcsCommonService
    , private formBuilder: FormBuilder
    ,private _common: CommonService
    , private confirmationDialogService: ConfirmationDialogService
    ) { }

  ngOnInit(): void {
    this.show=false; 
      this._icscalibrationService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });
    this.LoadInitialData();
    this.initFileManager();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.editSettings = { allowEditing: true, allowDeleting: true };
    // this.commands = [{ buttonOption: { content: 'Edit', cssClass: 'edit_link' } }];
   // this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } } , { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }];
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.lines = 'Both';              // Give border to grid
    this.filterOptions = {             // Search data of grid using filterservice
      type: 'Menu'
    };
    this.filter= {
      params:{
        format: 'dd-MMM-yyyy'
      }
    };
    this.Dateformat={type:'date',format:'dd-MMM-yyyy'}
    this.toolbarOptions = [ 'ExcelExport', 'Search',"PdfExport"];
    this.toolbar= ['Search'];
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
  toolbarClick(args: ClickEventArgs): void {
        switch (args.item.id) {
        case 'Grid_excelexport':
          (this.grid.columns[6] as Column).visible = false;
          const excelExportProperties: ExcelExportProperties = {
          fileName: 'Instrument_Calibration.xlsx'
      };
      var ObjAudit = { 
        FeatureName:"Calibration", 
        Description:"Excel Report Is Downloaded." 
     };
      this._icscalibrationService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties);
        } else {    
        }
      });   
          
          break;
          case "Grid_pdfexport":
            const pdfExportProperties: PdfExportProperties = {
              fileName: "Instrument_Calibration.pdf",
              pageOrientation: 'Landscape',
            };
            var ObjAudit = { 
              FeatureName:"Calibration", 
              Description:"Pdf Report Is Downloaded." 
           };
            this._icscalibrationService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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

  ngAfterViewInit() { }

  public onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {
      console.log('File uploaded successfully');
    }
  }

  public onUploadFailure(args: any): void {
    console.log('File failed to upload');
  }
  LoadInitialData() {
    this.GetInstrumentList();
    this.GetCalibrationList();
    this.GetPerformedByMasterList();
    this.setForm();
    this.GetInstrumentTypeList();
    this.GetInstrumentList();
  }
  setForm() {
    this.CalibrationForm = this.formBuilder.group({
      IcsInstrumentId: ['', Validators.required],
      InstrumentTypeId: [''],
      IcsCalibrationRecordId: [''],
      CalibrationPerformedByID:['', Validators.required],
      CalibrationPerformedDate: ['', Validators.required],
      CalibrationDescription: [''],
      // CalibrationAttachment:[],
      // ServiceAttachment: [],
      AttachmentList: new FormArray([]),
      ServiceAttachmentList: new FormArray([])
    });
  }
  resetForm() {
    this.CalibrationForm.reset();
    this.ServiceAttachmentList=[];
    this.CalibrationAttachmentList=[];
  }
  OpenModal(addCalibrationModal) {
    this.IsCalibrationEdit = false;
    this.objInstrumentType['Name']=null;
    this.ObjInstrumentTypeName = null;

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
  GetInstrumentList() {
    this._icsCommonService.GetCalibrationRequiredInstrumentList().subscribe((data) => {
      this.ObjInstrumentList = data['Object'];
      this.ObjInstrumentListNew = this.ObjInstrumentList
    });
  }
  GetInstrumentTypeList() {
    this._icscalibrationService.GetInstrumentTypeList().subscribe((data) => {
      this.objInstrumentType = data['Object'];
    });
  }
  GetInstrumentTypeById(InstrumentId) {
    this._icscalibrationService.GetInstrumentTypeById(InstrumentId.value).subscribe((data) => {
      this.objInstrumentType = data['Object'];
      this.ObjInstrumentTypeName = this.objInstrumentType['Name'];
      if( this.objInstrumentType['CalibrationRequired'] != true)
      {
        this._toastr.error("Calibration Require Is Set to No. Please Go to Instrument Master And Edit The Instrument");        
      }

    });
  }
  GetInstrumentIdListByTypeId(TypeID) {
    this.GetInstrumentList();
   // console.log(this.ObjInstrumentList);
    this.ObjInstrumentList = this.ObjInstrumentList.filter(o => o['InstrumentTypeId'] === TypeID.value);
   // console.log(this.ObjInstrumentList);
  }

  GetCalibrationList() {
    this._icscalibrationService.GetCalibrationList().subscribe((data) => {
      this.ObjCalibrationList = data['Object'];
      for(var i=0;i<this.ObjCalibrationList.length;i++)
      {
        if( this.ObjCalibrationList[i]["CalibrationDueDate"] != null)
        {
        this.ObjCalibrationList[i]["CalibrationDueDate"] = new Date(this.ObjCalibrationList[i]["CalibrationDueDate"]);
        }
        if( this.ObjCalibrationList[i]["CalibrationPerformedDate"] != null)
        {
          this.ObjCalibrationList[i]["CalibrationPerformedDate"] = new Date(this.ObjCalibrationList[i]["CalibrationPerformedDate"]);
          this.ObjCalibrationList[i]["ShowCalibrationAddButton"] = false;
          this.ObjCalibrationList[i]["ShowCalibrationEditButton"] = true;
        }
        if( this.ObjCalibrationList[i]["CalibrationNextDueDate"] != null)
        {
        this.ObjCalibrationList[i]["CalibrationNextDueDate"] = new Date(this.ObjCalibrationList[i]["CalibrationNextDueDate"]);
        }
      }
      this.ObjCalibrationList = DataUtil.parse.parseJson(this.ObjCalibrationList);


      if(this.flag == true)
      {
         // console.log("Instrument Id GetCalibrationList :",this.id)
      this.GetInstrumentListById(this.id)
      
      } 

    });
  }
  GetPerformedByMasterList() {
    this._icscalibrationService.GetPerformedByMasterList().subscribe((data) => {
      this.ObjPerformedByList = data['Object'];
    });
  }
  EditCalibration(IcsCalibrationRecordId , flag): void {
    this._icscalibrationService.GetCalibrationDetail(IcsCalibrationRecordId).subscribe((res) => {
      const ObjCalibration = res['Object'] as Calibration;
      this.CalibrationAttachmentList=ObjCalibration.CalibrationAttachmentList;
      this.ServiceAttachmentList=ObjCalibration.ServiceAttachmentList;
      if (ObjCalibration != null) {
        this.CalibrationForm.patchValue({
          IcsInstrumentId: ObjCalibration.IcsInstrumentId,
          InstrumentTypeId: ObjCalibration.InstrumentTypeId,
          IcsCalibrationRecordId: ObjCalibration.IcsCalibrationRecordId,
          CalibrationPerformedByID:ObjCalibration.CalibrationPerformedByID,
          CalibrationPerformedDate: ObjCalibration.CalibrationPerformedDate,
          CalibrationDescription:ObjCalibration.CalibrationDescription,
        });
        if(flag == false)
        { 
          this.IsCalibrationEdit = true;
          this.ObjInstrumentTypeName = ObjCalibration.InstrumentTypeName;
        }
      }
      else{
      this.CalibrationForm.patchValue({
        IcsInstrumentId: null,
        InstrumentTypeId: null,
        IcsCalibrationRecordId: null,
        CalibrationPerformedByID:null,
        CalibrationPerformedDate: null,
        CalibrationDescription:null
        });
      }
if (res['Result']==false) {
  this._toastr.error(res['ResultMessage']);
}
    });
  }
  SaveCalibration() {
            if (this.CalibrationForm.valid) {
              let CalibrationAttachmentList = this.CalibrationForm.get('AttachmentList').value;
              let ServiceAttachmentList = this.CalibrationForm.get('ServiceAttachmentList').value;
              this._icscalibrationService.SaveCalibration(this.CalibrationForm.value,CalibrationAttachmentList,ServiceAttachmentList).subscribe(res => {
                if (res['Result']) {

                  this.flag = true;
                  let  result = res['Id'];
                 this.id = result;
               //  console.log("Instrument Id update :",result) 



                  this.GetInstrumentList();
                  this.resetForm();
                  this.GetCalibrationList();
                  this.closeAddParameterModal();
                  this._toastr.success(res['ResultMessage']);
                } else {
                  this._toastr.error(res['ResultMessage']);
                }
              });
            }
            else{
                this.formErrorDisplay.showErrors(this.CalibrationForm);
            }

  }
  UpdateCalibration() {
      if (this.CalibrationForm.valid) {
        let CalibrationAttachmentList = this.CalibrationForm.get('AttachmentList').value;
        let ServiceAttachmentList = this.CalibrationForm.get('ServiceAttachmentList').value;
        this._icscalibrationService.UpdateCalibration(this.CalibrationForm.value,CalibrationAttachmentList,ServiceAttachmentList).subscribe(res => {
          if (res['Result']) {
            this.flag = true;
            let  result = res['Id'];
           this.id = result;
          // console.log("Instrument Id update :",result) 



            this.GetInstrumentList();
            this.resetForm();
            this.GetCalibrationList();
            this.closeAddParameterModal();
            this._toastr.success(res['ResultMessage']);
          } else {
            this._toastr.error(res['ResultMessage']);
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
  }
  public onServiceFileSelect: EmitType<Object> = (args: any) => {
    args.filesData.forEach(file => {
      (this.CalibrationForm.controls.ServiceAttachmentList as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });
  }
  closeAddParameterModal() {
    this.resetForm();
    this.modalService.dismissAll();
  }
  /* DownlLoadFile(filePath) {
    this._common.DownLoadFile(filePath);
  } */

  DownLoadFile(filePath) {
    this._common.DownLoadFile(filePath).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  }


  setRowId(data){
    this.IcsCalibrationRecordId= data.IcsCalibrationRecordId;
    this.IcsInstrumentId =data.IcsInstrumentId;
  }
  beforeSend(args) {
    let restrictedPath ="ICSCalibration/Inst_" + this.IcsInstrumentId + "/" + this.IcsCalibrationRecordId;
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
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
          if (result) {
             // this.DeleteCalibration(args['rowData']['IcsCalibrationRecordId']);
          }
          });
      break;
  case 'Edit':
            this.OpenModal(this.CalibrationModal);
            this.EditCalibration(args['rowData']['IcsCalibrationRecordId'],false);
  break;
    default:
      break;
  }
}

DeleteCalibration(IcsCalibrationRecordId){
this._icscalibrationService.DeleteCalibration(IcsCalibrationRecordId).subscribe(res => {
  if (res['Result']) {
    this._toastr.success(res['ResultMessage']);
    this.GetCalibrationList();
  }
  else {
    this._toastr.error(res['ResultMessage']);
  }
});
}



GetInstrumentIdByName(InstrumenttypeId) {
  let Result = this.ObjInstrumentList.filter((f) => f['InstrumentTypeId'] ==InstrumenttypeId.value );
  this.ObjInstrumentListNew = Result;
}


async GetInstrumentListById(IcsInstrumentId) { // to bing grid
  let Result =[];
  let SaveFlag = false;
  this.flag = false;
  this.show=true; 
  this.ObjCalibrationListNew  = null;
  if( isNullOrUndefined (IcsInstrumentId.value))
  {
    Result = this.ObjCalibrationList.filter((f) => f['IcsInstrumentId'] ==IcsInstrumentId );
    SaveFlag =  true;
  }
  else
  {
    Result = this.ObjCalibrationList.filter((f) => f['IcsInstrumentId'] ==IcsInstrumentId.value );
    SaveFlag = false;
  }
  if(Result.length <= 0)
  {  
     this._icscalibrationService.GetInstrumentAndType(IcsInstrumentId.value).subscribe((data) => {
      this.ObjCalibrationListNew = data['Object'];  
      for(var i=0;i<this.ObjCalibrationListNew.length;i++)
      {
        if(this.ObjCalibrationListNew[i]["CalibrationDueDate"] != null )
        {
        this.ObjCalibrationListNew[i]["CalibrationDueDate"] = new Date(this.ObjCalibrationListNew[i]["CalibrationDueDate"]);
        } 
      }
      this.ObjCalibrationListNew = DataUtil.parse.parseJson(this.ObjCalibrationListNew);
     // console.log("Calibration list after filter :", this. ObjCalibrationListNew)
    });
    
  }
  else
  {
    if(SaveFlag == false)
    {
        let flag = false;
        let  IcsInstrumentIdValue = null;
        for(var i=0 ; i< Result.length ;i++)
        {
          if(Result[i].CalibrationPerformedDate == null)
          {
            flag = true
          }   
          IcsInstrumentIdValue =  Result[i].IcsInstrumentId;
        }

        if(flag == false)
        {
          if(IcsInstrumentIdValue != null)
          {
             await  this._icscalibrationService.SaveCalibrationRecord(IcsInstrumentIdValue).subscribe(res => {
              if (res['Result']) {        
                this.flag = true;          
                this.id = IcsInstrumentIdValue;
               // console.log("Equipment Id Save :",IcsInstrumentIdValue) 
                this.GetCalibrationList();
              
              }
              else {
                this._toastr.error(res['ResultMessage']);
              }
            }); 
        }
        }
    }
  this. ObjCalibrationListNew = Result;
  //console.log("Calibration list after filter :", this. ObjCalibrationListNew)
  }
  
}


showRecordOnAddCalibration(): void {

  if(this.ObjCalibrationListNew!=null){
  this.CalibrationForm.patchValue({       
    IcsInstrumentId:  this. ObjCalibrationListNew[0]['IcsInstrumentId'],
  //  EquipmentId:  this. ObjCalibrationListNew[0]['InstrumentId'],
    InstrumentTypeId:  this. ObjCalibrationListNew[0]['InstrumentTypeId']    
  })    
this.ObjInstrumentTypeName = this. ObjCalibrationListNew[0]['InstrumentTypeName']    
  }

} 

addCalibration(event, data)
  {
    this.OpenModal(this.CalibrationModal);
    if(data['IcsCalibrationRecordId'] > 0)
    {
    this.EditCalibration(data['IcsCalibrationRecordId'],true);
    this.ObjInstrumentTypeName = this. ObjCalibrationListNew[0]['InstrumentTypeName']
    }
    else
    {
      this.showRecordOnAddCalibration();
    }
  }


  EditCalibrationRecord(event, data)
  {   
    this.OpenModal(this.CalibrationModal);
    this.EditCalibration(data['IcsCalibrationRecordId'],false);
  }







}
