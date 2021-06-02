import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import {
  GridLine, FilterSettingsModel, CommandClickEventArgs, EditSettingsModel
  , CommandModel, ToolbarItems, GridComponent, GroupSettingsModel, ExcelExportProperties , Column,IFilter,ExcelQueryCellInfoEventArgs,PdfExportProperties
} from '@syncfusion/ej2-angular-grids';
import { ToastrService } from 'ngx-toastr';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { FilterService } from '@syncfusion/ej2-angular-grids';
import { IcsMaintenanceService } from './service/ics-maintenance.service';
import { MaintenanceEnt } from './service/ics-maintenance.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { environment } from 'src/environments/environment';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { CommonService } from 'src/app/Shared Services etc/Services/Common.service';
import { DataUtil } from '@syncfusion/ej2-data';
import { Internationalization } from '@syncfusion/ej2-base';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { isUndefined, isNullOrUndefined } from "util";
@Component({
  selector: 'app-ics-maintenance',
  templateUrl: './ics-maintenance.component.html',
  providers: [FilterService],
  styleUrls: ['./ics-maintenance.component.css']
})
export class IcsMaintenanceComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent
  @ViewChild('content3', { static: false }) MaintenanceModal;
  public ajaxSettings: AjaxSettingsModel;
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
   public toolbarSettings:object;
   public uploadSettings:object;
  closeResult: string;
  //ejs Uploader
  public maxFileSize :Number = environment.maxFileSize;
  MaintenanceFormGrp: FormGroup;
  public dateValue: Date = new Date();
  public filterOptions: FilterSettingsModel;
  public ObjInstrumentList: Object[];
  public ObjMaintenanceList: Object[];
  public objInstrumentType: Object;
  public ObjMaintenanceTypeList: Object[];
  public IcsMaintenanceRecordId:Number;
  public IcsInstrumentId:Number;
  IsMaintenanceEdit = false;
  public PageAccessRight: object = {};
  // public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public pageSettings: Object;
  public filter: IFilter;
  public Dateformat:any;
  public ObjInstrumentTypeName:string
  public ObjMaintenanceType: Object[];


  public ObjInstrumentListNew: object[];
  public ObjMaintenanceListNew: object[];
  public flag = false;
  public id;
  show: boolean = true;




  public data3: { [key: string]: Object; }[] = [{ Name: 'Select', Code: 'S' }];
  public data4: { [key: string]: Object; }[] = [
    { Name: 'Preventive Maintenance', Code: 'PM' },
    { Name: 'Breakdown ', Code: 'PM' }
  ];
  // maps the appropriate column to fields property
  public dropDownInstrumentFields: Object = { text: 'Name', value: 'Id' };
  public dropDownInstrumentTypeFields: Object = { text: 'Name', value: 'Id' };
  public fiedropDownMaintenanceFieldslds: Object = { text: 'Name', value: 'Id' };
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
      text: 'Preventive Maintenance'
    },
    {
      text: 'Breakdown'
    }];

  public dropEle: HTMLElement;
  // End of 2 drop down
  // start of table field
  public data: object[];
  public lines: GridLine;
  public groupOptions: GroupSettingsModel;
  public formatOptions: any;
  // uploader
  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };
  public AttachmentList:object[];
  // public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
  //  public ajaxSettings: object = {
  //    url: this.hostUrl + 'api/FileManager/FileOperations'
  //  };

   public _restApi = environment.apiUrl + '/FileManager/';
  constructor(private modalService: NgbModal, private _toastr: ToastrService
    , private _icsMaintenanceService: IcsMaintenanceService
    , private formBuilder: FormBuilder
    , private formErrorDisplay: FormErrorDisplayService
    , private _icsCommonService: IcsCommonService,
  private _common: CommonService
  , private confirmationDialogService: ConfirmationDialogService) { }
  ngOnInit(): void {
    this.show = false;
    this._icsMaintenanceService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });


    // this.ResetMaintenanceForm();
    this.setForm();
    this.GetInstrumentList();
    this.GetMaintenanceList();
    this.GetIcsMaintenanceTypeList();
    this.GetInstrumentTypeList();
    this.initFileManager();
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    // this.editSettings = { allowEditing: true, allowDeleting: true };
    // this.commands = [{ buttonOption: { content: 'Edit', cssClass: 'edit_link' } }];
  //  this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }, { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }];
  this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];  
  
  this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
    };
    this.filter= {
      params:{
        format: 'dd-MMM-yyyy'
      }
    };
    this.formatOptions = { type: 'date', format: "dd-MMM-yyyy", skeleton: "dd-MMM-yyyy" };

    this.toolbarOptions = ['ExcelExport' , 'Search',"PdfExport"];
   // this.groupOptions = { showGroupedColumn: true };
    this.pageSettings = { pageSize: 10 };

    this.groupOptions = {
      showGroupedColumn: true,
      showDropArea: true,
      showUngroupButton: true,
      columns: ["IcsMaintenanceTypeName"],
    };

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
    this.uploadSettings=environment.fileUploadSettings;
    // this.showHiddenItems = true;
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
      (this.grid.columns[7] as Column).visible = false;
          const excelExportProperties: ExcelExportProperties = {
          fileName: 'Instrument_Maintenance.xlsx'
      };
      var ObjAudit = { 
        FeatureName:"Maintenance", 
        Description:"Excel Report Is Downloaded."        };
      this._icsMaintenanceService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties);
        } else {    
        }
      });   
       
        break;
        case "Grid_pdfexport":
        const pdfExportProperties: PdfExportProperties = {
          fileName: "Instrument_Maintenance.pdf",
          pageOrientation: 'Landscape',
        };
        var ObjAudit = { 
          FeatureName:"Maintenance", 
          Description:"Pdf Report Is Downloaded."        };
        this._icsMaintenanceService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
  setForm() {
    this.MaintenanceFormGrp = this.formBuilder.group({
      IcsMaintenanceRecordId: [''],
      IcsInstrumentId: ['', Validators.required],
      IcsMaintenanceTypeId: ['', Validators.required],
      InstrumentTypeId: [''],
      PerformedDate: ['', Validators.required],
      Description: [''],
      // AttachmentId: [''],
      AttachmentList: new FormArray([])
    });
  }
  resetForm() {
    this.MaintenanceFormGrp.reset();
    this.AttachmentList=[];
  }
  openAddModal(content3) {
    this.IsMaintenanceEdit = false;
   this.objInstrumentType={};
   this.ObjInstrumentTypeName = null;
    this.resetForm();
    this.modalService.open(content3, {
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
  EditMaintenance(IcsMaintenanceRecordId,flag): void {
    this._icsMaintenanceService.GetMaintenanceDetail(IcsMaintenanceRecordId).subscribe((data) => {
       const MaintenanceObj = data['Object'] as MaintenanceEnt;
       this.AttachmentList=MaintenanceObj.AttachmentList;
      console.log(MaintenanceObj.AttachmentList);
      if (MaintenanceObj != null) {
        this.MaintenanceFormGrp.patchValue({
          IcsMaintenanceRecordId: MaintenanceObj.IcsMaintenanceRecordId,
          IcsInstrumentId: MaintenanceObj.IcsInstrumentId,
          InstrumentTypeId: MaintenanceObj.InstrumentTypeId,
          IcsMaintenanceTypeId: MaintenanceObj.IcsMaintenanceTypeId,
          PerformedDate: MaintenanceObj.PerformedDate,
          Description: MaintenanceObj.Description,
        });
        if (flag == false) {
        this.IsMaintenanceEdit = true;
        this.ObjInstrumentTypeName = MaintenanceObj.InstrumentTypeName;
        }
      }
      else {
        this.MaintenanceFormGrp.patchValue({
          IcsMaintenanceRecordId: null,
          IcsInstrumentId: null,
          InstrumentId: null,
          InstrumentTypeId: null,
          IcsMaintenanceTypeId: null,
          PerformedDate: null,
          Description: null,
        })
      }
    });
  }
  GetInstrumentList() {
    this._icsCommonService.GetInstrumentList().subscribe((data) => {
      this.ObjInstrumentList = data['Object'];
      this.ObjInstrumentListNew  =  this.ObjInstrumentList
    });
  }
  GetInstrumentTypeAndMaintenanceTypeById(InstrumentId) {
    this._icsCommonService.GetInstrumentTypeById(InstrumentId.value).subscribe((data) => {
      this.objInstrumentType = data['Object'];
      this.ObjInstrumentTypeName = this.objInstrumentType['Name'];
    });
     this._icsMaintenanceService.GetMaintenanceTypeByInstrumentId(InstrumentId.value).subscribe((data) => {
      this.ObjMaintenanceTypeList = data['Object'];
    }); 

  }
  GetInstrumentTypeList() {
    this._icsCommonService.GetInstrumentTypeList().subscribe((data) => {
      this.objInstrumentType = data['Object'];
    });
  }
  GetIcsMaintenanceTypeList() {
    this._icsMaintenanceService.GetIcsMaintenanceTypeList().subscribe((data) => {
      this.ObjMaintenanceType = data['Object'];
    });
  }
  GetMaintenanceList() {
    this._icsMaintenanceService.GetMaintenanceList().subscribe((data) => {
      this.ObjMaintenanceList = data['Object'];
      for(var i =0; i<this.ObjMaintenanceList.length;i++)
      {
        if(this.ObjMaintenanceList[i]["DueDate"] != null)
        {
        this.ObjMaintenanceList[i]["DueDate"] = new Date(this.ObjMaintenanceList[i]["DueDate"]);
        }
        if(this.ObjMaintenanceList[i]["PerformedDate"] != null)
        {
        this.ObjMaintenanceList[i]["PerformedDate"] = new Date(this.ObjMaintenanceList[i]["PerformedDate"]);
        this.ObjMaintenanceList[i]["ShowMaintenanceAddButton"] = false;
        this.ObjMaintenanceList[i]["ShowMaintenanceEditButton"] = true;

        }
        if(this.ObjMaintenanceList[i]["NextDueDate"] != null)
        {
        this.ObjMaintenanceList[i]["NextDueDate"] = new Date(this.ObjMaintenanceList[i]["NextDueDate"]);
        }
      }
      this.ObjMaintenanceList = DataUtil.parse.parseJson(this.ObjMaintenanceList);

      if (this.flag == true) {
       // console.log("Instrument Id GetCalibrationList :", this.id);
        this.GetInstrumentListById(this.id);
      }

    });
  }
  SaveMaintenance() {
    if (this.MaintenanceFormGrp.valid) {
      this.MaintenanceFormGrp.patchValue({
        InstrumentTypeId: this.objInstrumentType['Id']
      });
        let fileList = this.MaintenanceFormGrp.get('AttachmentList').value;
      this._icsMaintenanceService.SaveMaintenance(this.MaintenanceFormGrp.value,fileList).subscribe(res => {
        if (res['Result']) {

          this.flag = true;
          let result = res["Id"];
          this.id = result;
         // console.log("Instrument Id Save :", result);


          this._toastr.success(res['ResultMessage']);
          this.GetMaintenanceList();
          this.resetForm();
          this.closeAddParameterModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.MaintenanceFormGrp);
    }
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    // this.MaintenanceFormGrp.patchValue({
    //   Attachment: args.filesData[0].rawFile
    // });
    args.filesData.forEach(file => {
      (this.MaintenanceFormGrp.controls.AttachmentList as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });

  }
  UpdateMaintenance() {
    if (this.MaintenanceFormGrp.valid) {
        let fileList = this.MaintenanceFormGrp.get('AttachmentList').value;
      this._icsMaintenanceService.UpdateMaintenance(this.MaintenanceFormGrp.value,fileList).subscribe(res => {
        if (res['Result']) {


          this.flag = true;
          let result = res["Id"];
          this.id = result;
        //  console.log("Instrument Id update :", result);

          this.GetMaintenanceList();
          this.resetForm();
          this.closeAddParameterModal();
          this._toastr.success(res['ResultMessage']);
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.MaintenanceFormGrp);
    }
  }
  closeAddParameterModal() {
    this.modalService.dismissAll();
  }
  setRowId(data){
    console.log(data.IcsMaintenanceRecordId);
    this.IcsMaintenanceRecordId= data.IcsMaintenanceRecordId;
    this.IcsInstrumentId =data.IcsInstrumentId;
     // this.MaintenanceIndexId= data.IcsMaintenanceRecordId;
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
  


  beforeSend(args) {
    // Get the value of Dropdownlist.
    let restrictedPath ="ICSMaintenance/Inst_" + this.IcsInstrumentId + "/" + this.IcsMaintenanceRecordId;
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

  excelQueryCellInfo (args: ExcelQueryCellInfoEventArgs) {
    if (args.column.field === 'DueDate') {
      var intl = new Internationalization();
      var dFormatter = intl.getDateFormat({ format: "dd-MMM-yyyy" });
      var formattedDate = dFormatter(args.value);
      args.value = formattedDate;
    }
    if (args.column.field === 'PerformedDate') {
      var intl = new Internationalization();
      var dFormatter = intl.getDateFormat({ format: "dd-MMM-yyyy" });
      var formattedDate = dFormatter(args.value);
      args.value = formattedDate;
    }
    if (args.column.field === 'NextDueDate') {
      var intl = new Internationalization();
      var dFormatter = intl.getDateFormat({ format: "dd-MMM-yyyy" });
      var formattedDate = dFormatter(args.value);
      args.value = formattedDate;
    }
  }

  excelExportComplete(): void {
    (this.grid.columns[7] as Column).visible = true;
}

pdfHeaderQueryCellInfo(args: any): void {
  args.cell.row.pdfGrid.repeatHeader = true;
}

actionMaintennace(args: CommandClickEventArgs): void {
  switch (args['commandColumn']['type']) {
    case 'Delete':
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
          if (result) {
              this.DeleteMaintenance(args['rowData']['IcsMaintenanceRecordId']);
          }
          });
      break;
  case 'Edit':
            this.openAddModal(this.MaintenanceModal);
            this.EditMaintenance(args['rowData']['IcsMaintenanceRecordId'],false);
  break;
    default:
      break;
  }
}

DeleteMaintenance(IcsMaintenanceRecordId){
this._icsMaintenanceService.DeleteMaintenance(IcsMaintenanceRecordId).subscribe(res => {
  if (res['Result']) {
    this._toastr.success(res['ResultMessage']);
    this.GetMaintenanceList();
  }
  else {
    this._toastr.error(res['ResultMessage']);
  }
});
}


ValidateInstrumentMaintenance(MaintenanceType)
{
let moduleNameList = this.ObjMaintenanceTypeList.filter((f) => f['Name'] == MaintenanceType.itemData['Name']);
 var s  = MaintenanceType.itemData.Name +" Maintenance Is Not Added For This Instrument.Please Go To Instrument Master And Edit The Instrument And Add Maintenance.";
 if(moduleNameList.length == 0)
 {
  this._toastr.error(s);
 }
 
}


GetInstrumentIdByName(InstrumentTypeId) {
  let Result = this.ObjInstrumentList.filter(
    (f) => f["InstrumentTypeId"] == InstrumentTypeId.value
  );
  this.ObjInstrumentListNew = Result;
}



 //to bind grid data on change of Instrument id
 async GetInstrumentListById(IcsInstrumentId) {
  let Result = [];
  let IcsId ;
  let Result2 = [];
  let saveMaintenanceFlag = false;
  this.flag = false;
  this.show = true;
  this.ObjMaintenanceListNew = null;
  let newarray = [];
  if (isNullOrUndefined(IcsInstrumentId.value)) {
    //save and update
    Result = this.ObjMaintenanceList.filter(
      (f) => f["IcsInstrumentId"] == IcsInstrumentId
    );
    IcsId = IcsInstrumentId
     saveMaintenanceFlag = true;
   
  } else {
    Result = this.ObjMaintenanceList.filter(
      (f) => f["IcsInstrumentId"] == IcsInstrumentId.value
    );
    IcsId = IcsInstrumentId.value
    saveMaintenanceFlag = false;
   
  }
  //console.log("Result :",Result)


  await this._icsMaintenanceService
    .GetInstrumentAndMaintenanceType(IcsId)
    .subscribe((data) => {
      Result2 = data["Object"];
     // console.log("Result2 :",Result2)
      for (var i = 0; i < Result2.length; i++) {
        if (Result2[i]["DueDate"] != null) {
          Result2[i]["DueDate"] = new Date(
            Result2[i]["DueDate"]
          );
        }
      }
      Result2 = DataUtil.parse.parseJson(Result2); 

      Result = [ ...Result, ...Result2];
  //  });

   

    if (  saveMaintenanceFlag == false)
    {
      if(Result.length > 0)
      {
        let AnnualMaintenanceFlag = false;
        let BreakDownMaintenanceFlag = false;
        let PreventiveMaintenanceFlag = false;

        let AnnualMaintenanceId = null;
        let BreakDownMaintenanceId = null;
        let PreventiveMaintenanceId = null;
        let IcsInstrumentIdSave = null;

        var ObjMaintenance = {
          AnnualId: null,
          BreakDownnId: null,
          PreventiveId: null,
          IcsInstrumentId : null,
        };

        for(var i=0 ; i< Result.length ;i++)
        {
          IcsInstrumentIdSave =  Result[i].IcsInstrumentId;
          if(Result[i].IcsMaintenanceTypeId == 1 &&  Result[i].PerformedDate == null)
          {
            AnnualMaintenanceFlag = true   
          }   
         else if(Result[i].IcsMaintenanceTypeId == 2 &&  Result[i].PerformedDate == null)
          {
            BreakDownMaintenanceFlag = true             
          }   
         else if(Result[i].IcsMaintenanceTypeId == 3 &&  Result[i].PerformedDate == null)
          {
            PreventiveMaintenanceFlag = true           
          } 

          if(Result[i].IcsMaintenanceTypeId == 1)
          {             
            AnnualMaintenanceId = Result[i].IcsMaintenanceTypeId              
          }   
         else if(Result[i].IcsMaintenanceTypeId == 2 )
          {             
            BreakDownMaintenanceId = Result[i].IcsMaintenanceTypeId
          }   
         else if(Result[i].IcsMaintenanceTypeId == 3 )
          {             
            PreventiveMaintenanceId = Result[i].IcsMaintenanceTypeId
          }  
        }

        if(AnnualMaintenanceFlag == false &&  BreakDownMaintenanceFlag == false && PreventiveMaintenanceFlag == false)
        {
          ObjMaintenance.AnnualId = AnnualMaintenanceId
          ObjMaintenance.BreakDownnId = BreakDownMaintenanceId
          ObjMaintenance.PreventiveId = PreventiveMaintenanceId
          ObjMaintenance.IcsInstrumentId = IcsInstrumentIdSave

           this._icsMaintenanceService
          .SaveMaintenanceRecord(ObjMaintenance)
          .subscribe((res) => {
            if (res["Result"]) {
              this.flag = true;               
              this.id = ObjMaintenance.IcsInstrumentId;
            //  console.log("Equipment Id update :", ObjMaintenance.IcsInstrumentId);

          this.GetMaintenanceList();
            } else {
            }
          }); 
        }
        else
        {
          let flag2 = false;
          if(AnnualMaintenanceFlag == false )
          {
            ObjMaintenance.AnnualId = AnnualMaintenanceId
            flag2 = true
          }
          if(BreakDownMaintenanceFlag == false)
          {
            ObjMaintenance.BreakDownnId = BreakDownMaintenanceId
            flag2 = true
          }
          if(PreventiveMaintenanceFlag == false)
          {
            ObjMaintenance.PreventiveId = PreventiveMaintenanceId
            flag2 = true
          }
          ObjMaintenance.IcsInstrumentId = IcsInstrumentIdSave

          if( flag2 == true)
          {
             this._icsMaintenanceService
            .SaveMaintenanceRecord(ObjMaintenance)
            .subscribe((res) => {
              if (res["Result"]) {
                this.flag = true;               
                this.id = ObjMaintenance.IcsInstrumentId;
               // console.log("instrument Id update :", ObjMaintenance.IcsInstrumentId);

            this.GetMaintenanceList();
              } else {
              }
            }); 
        }
        }

      }
    }
    this.ObjMaintenanceListNew = Result;
    if(this.ObjMaintenanceListNew.length ==0)
    {
      this._toastr.warning("Maintenance is not added for this Instrument. Please Add Maintenance for this Instrument.");
   
    }
  });
   // this.ObjMaintenanceListNew = Result;
  
}

ShowRecordOnAddMaintenance(args, flag): void {
  
  if (this.ObjMaintenanceListNew != null) {
  
    this.MaintenanceFormGrp.patchValue({
      IcsInstrumentId: args["IcsInstrumentId"],
      InstrumentId: args["InstrumentId"],
      InstrumentTypeId: args["InstrumentTypeId"],
      IcsMaintenanceTypeId: args["IcsMaintenanceTypeId"],
    });
    this.ObjInstrumentTypeName = args["InstrumentTypeName"];
  }
}


addMaintennace(event, data)
{
  this.openAddModal(this.MaintenanceModal);
  if (data["IcsMaintenanceRecordId"] > 0) {
    this.EditMaintenance(data['IcsMaintenanceRecordId'],true);
    this.ObjInstrumentTypeName = this.ObjMaintenanceListNew[0][
      "InstrumentTypeName"
    ];
  } else {
    this.ShowRecordOnAddMaintenance(data, true);
  }
}


EditMaintennaceNew(event, data)
{   
  this.openAddModal(this.MaintenanceModal);
 this.EditMaintenance(data['IcsMaintenanceRecordId'],false);
}

queryCellInfo(args) {
  
 if( args["data"]["IcsMaintenanceTypeName"] == "BreakDown")
 {
     if (args.column.field === "DueDate" && args.cell.innerText == "") {
       args.cell.innerText = "NA";
     }
     if (args.column.field === "NextDueDate" && args.cell.innerText == "") {
       args.cell.innerText = "NA";
     }
 }
}

}
