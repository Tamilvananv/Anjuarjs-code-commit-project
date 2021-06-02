import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  GridLine, FilterSettingsModel, EditSettingsModel, CommandClickEventArgs
  , ToolbarItems, CommandModel, GridComponent, GroupSettingsModel, ExcelExportProperties, Column,IFilter,PdfExportProperties
} from '@syncfusion/ej2-angular-grids';
import { ToastrService } from 'ngx-toastr';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { FilterService } from '@syncfusion/ej2-angular-grids';
import { QualificationService } from './service/ics-qualification.service';
import { IcsQualification } from '../ics-instrument-master/service/ics-qualification.model';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { environment } from 'src/environments/environment';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { CommonService } from 'src/app/Shared Services etc/Services/Common.service';
import { DataUtil } from '@syncfusion/ej2-data';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
@Component({
  selector: 'app-ics-qualification',
  templateUrl: './ics-qualification.component.html',
  providers: [FilterService],
  styleUrls: ['./ics-qualification.component.css']
})
export class IcsQualificationComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild('qualificationModal', { static: false }) QualificationModal;
  public ajaxSettings: AjaxSettingsModel;
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
   public toolbarSettings:object;
  closeResult: string;
  public _restApi = environment.apiUrl + '/FileManager/';
  QualificationForm: FormGroup;
  public dateValue: Date = new Date();
  public objIcsQualificationTypeList: Object[];
  public objInstrumentType: Object;
  public ObjInstrumentList: object;
  public ObjQualificationList: object[];
  public filterOptions: FilterSettingsModel;
  public data3: { [key: string]: Object; }[] = [{ Name: 'Select', Code: 'S' }];
  // public editSettings: EditSettingsModel;
  public toolbar: String[];
  public commands: CommandModel[];
  public toolbarOptions: ToolbarItems[];
  public fields: Object = { text: 'Name', value: 'Id' };
  public height: string = '220px';
  public watermark: string = 'Select';
  public watermark1: string = 'Select Type';
  public IsQualificationEdit = false;
  public AttachmentList:object[];
  public QualificationTypeRecordId:Number;
  public QualificationTypeName:String;
  public IcsInstrumentId:Number;
  public filter: IFilter;
  public Dateformat:any;
  public ObjInstrumentTypeName:string
  // public path: Object = {
  //   saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
  //   removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  // };
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data3, query);
  }
  public lines: GridLine;
  public dropEle: HTMLElement;
  // folder manager
  // public ajaxSettings: object;
  public view: string;
  public pageSettings: Object;
  public groupOptions: GroupSettingsModel;
   public PageAccessRight: object = {};
  // public hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/'; // replace with or api to read and upload files
  constructor(private routes: Router, private modalService: NgbModal
    , private _toastr: ToastrService, private _qualificationService: QualificationService
    , private formErrorDisplay: FormErrorDisplayService
    , private _icsCommonService: IcsCommonService
    , private formBuilder: FormBuilder
    ,private _common: CommonService
    , private confirmationDialogService: ConfirmationDialogService) { }
  ngOnInit(): void {

    this._qualificationService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });

    this.GetQualificationList();
    this.GetInstrumentList();
    this.GetIcsQualificationTypeList();
    this.GetInstrumentTypeList();
    this.setForm();
    this.initFileManager();
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
    this.toolbar=['Search']
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    // this.commands = [{ buttonOption: { content: 'Edit', cssClass: 'edit_link' } }];
   // this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }, { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }];
   this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }]; 
   
   // uploader
    this.dropEle = document.getElementById('droparea');
    // Initial view of File Manager is set to details view
    this.view = 'Details';
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSizes: 10 };
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
        (this.grid.columns[5] as Column).visible = false;
        case 'Grid_excelexport':
          const excelExportProperties: ExcelExportProperties = {
            fileName: 'Instrument_Qualification.xlsx'
        };
        var ObjAudit = { 
          FeatureName:"Qualification", 
          Description:"Excel Report Is Downloaded." 
       };
        this._qualificationService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
          if (res["Result"]) {
            this.grid.excelExport(excelExportProperties);
          } else {    
          }
        });  
     
        break;
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Instrument_Qualification.pdf",
            pageOrientation: 'Landscape',
          };
          var ObjAudit = { 
            FeatureName:"Qualification", 
            Description:"Pdf Report Is Downloaded." 
         };
          this._qualificationService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
    this.QualificationForm = this.formBuilder.group({
      IcsInstrumentId: ['', Validators.required],
      QualificationTypeRecordId: [''],
      QualificationTypeId: ['', Validators.required],
      QualificationDate: ['', Validators.required],
      QualificationDescription: [''],
      QualificationPerformedByName: ['', Validators.required],
        AttachmentList: new FormArray([])
    });
  }
  resetForm() {
    this.QualificationForm.reset();
    this.AttachmentList=[];
  }
  // File Manager's created event function
  onCreate(args: any) {
    console.log('File Manager has been created successfully');
  }
  openAddModal(content) {
    this.IsQualificationEdit = false;
     this.objInstrumentType={};
     this.ObjInstrumentTypeName = null;
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
  GetQualificationList() {
    this._qualificationService.GetQualificationList().subscribe((data) => {
      this.ObjQualificationList = data['Object'];
      for(var i=0;i<this.ObjQualificationList.length;i++)
      {
        this.ObjQualificationList[i]["ICSQualificationDate"] = new Date(this.ObjQualificationList[i]["ICSQualificationDate"]);
      }
      this.ObjQualificationList = DataUtil.parse.parseJson(this.ObjQualificationList);
    });
  }
  editQualification(QualificationTypeRecordId): void {
    this._qualificationService.GetQualificationDetail(QualificationTypeRecordId).subscribe((data) => {
      const ObjQualification = data['Object'] as IcsQualification;
       this.AttachmentList=ObjQualification.AttachmentList;
      if (ObjQualification != null) {
        this.QualificationForm.patchValue({
          IcsInstrumentId: ObjQualification.IcsInstrumentId,
          QualificationTypeRecordId: ObjQualification.QualificationTypeRecordId,
          InstrumentTypeId: ObjQualification.InstrumentTypeId,
          QualificationTypeId: ObjQualification.QualificationTypeId,
          QualificationDate: ObjQualification.QualificationDate,
          QualificationDescription: ObjQualification.QualificationDescription,
          QualificationPerformedByName: ObjQualification.QualificationPerformedByName
        });
        this.IsQualificationEdit = true;
        this.ObjInstrumentTypeName = ObjQualification.InstrumentTypeName;
      } else {
        this.QualificationForm.patchValue({
          IcsInstrumentId: null,
          QualificationTypeRecordId: null,
          InstrumentTypeId: null,
          QualificationTypeId: null,
          QualificationDate: null,
          QualificationDescription: null,
          QualificationPerformedByName: null
        });
      }

    });
  }
  GetIcsQualificationTypeList() {
    this._icsCommonService.GetIcsQualificationTypeList().subscribe((data) => {
      this.objIcsQualificationTypeList = data['Object'];
    });
  }
  GetInstrumentTypeById(InstrumentId) {
    this._icsCommonService.GetInstrumentTypeById(InstrumentId.value).subscribe((data) => {
      this.objInstrumentType = data['Object'];
      this.ObjInstrumentTypeName = this.objInstrumentType['Name'];
    });
  }
  GetInstrumentTypeList() {
    this._icsCommonService.GetInstrumentTypeList().subscribe((data) => {
      this.objInstrumentType = data['Object'];
    });
  }
  GetInstrumentList() {
    this._icsCommonService.GetInstrumentList().subscribe((data) => {
      this.ObjInstrumentList = data['Object'];
    });
  }
  SaveQualification() {
      if (this.QualificationForm.valid) {
        let fileList = this.QualificationForm.get('AttachmentList').value;
        this._qualificationService.SaveQualification(this.QualificationForm.value,fileList).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetQualificationList();
            this.resetForm();
            this.CloseModal();
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      }
      else{
          this.formErrorDisplay.showErrors(this.QualificationForm);
      }

  }
  UpdateQualification() {
      if (this.QualificationForm.valid) {
        let fileList = this.QualificationForm.get('AttachmentList').value;
        this._qualificationService.UpdateQualification(this.QualificationForm.value,fileList).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetQualificationList();
            this.CloseModal();
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      }
      else{
          this.formErrorDisplay.showErrors(this.QualificationForm);
      }
  }
  CloseModal() {
    this.modalService.dismissAll();
  }
  public onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {
      console.log('File uploaded successfully');
    }
  }
  public onUploadFailure(args: any): void {
    console.log('File failed to upload');
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    args.filesData.forEach(file => {
      (this.QualificationForm.controls.AttachmentList as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });
  }
  setRowId(data){
    console.log(data.IcsMaintenanceRecordId);
    // this.QualificationTypeRecordId= data.QualificationTypeRecordId;
    this.QualificationTypeName= data.QualificationTypeName;
    this.IcsInstrumentId =data.IcsInstrumentId;
  }
 /*  DownlLoadFile(filePath) {
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
    // let restrictedPath ="ICSQualification/Inst_" + this.IcsInstrumentId + "/" + this.QualificationTypeRecordId ;
    let restrictedPath ="ICSQualification/Inst_" + this.IcsInstrumentId + "/" + this.QualificationTypeName ;
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
             // this.DeleteQualification(args['rowData']['QualificationTypeRecordId']);
          }
          });
      break;
  case 'Edit':this.openAddModal(this.QualificationModal);
            this.editQualification(args['rowData']['QualificationTypeRecordId']);
  break;
    default:
      break;
  }
}

DeleteQualification(QualificationTypeRecordId){
this._qualificationService.DeleteQualification(QualificationTypeRecordId).subscribe(res => {
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
