import { IcsQualification } from './../service/ics-qualification.model';
import { Component, OnInit, ViewChild,  Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditSettingsModel, ToolbarItems, GridLine, IEditCell, ResizeService ,CommandClickEventArgs ,CommandModel} from '@syncfusion/ej2-angular-grids';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { FilterService } from '@syncfusion/ej2-angular-grids';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { InstrumentMasterService } from '../service/instrument-master.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgForm, FormControl, FormArray } from '@angular/forms';
import { IcsMaster, IcsMaintenence, IcsCustomHeader } from '../service/ics-master.model';
import { ToastrService } from 'ngx-toastr';
import { IcsCalibration } from '../service/ics-calibration.model';
import { ModalDismissReasons, NgbModal, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import {  IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import {QualificationService} from 'src/app/ICS/ics-qualification/service/ics-qualification.service';
import { environment } from 'src/environments/environment';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { CommonService } from 'src/app/Shared Services etc/Services/Common.service';
import { AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarService } from '@syncfusion/ej2-angular-filemanager';
import { isUndefined, isNullOrUndefined } from 'util';
@Component({
  selector: 'app-add-instrument',
  templateUrl: './add-instrument.component.html',
  providers: [FilterService,ToolbarService],
  styleUrls: ['./add-instrument.component.css'],
})
export class AddInstrumentComponent implements OnInit {
  grid1: any;
  constructor(private route: ActivatedRoute
    , private routes: Router
    , private _icsMasterService: InstrumentMasterService
    , private _toastr: ToastrService
    , private modalService: NgbModal
    , private confirmationDialogService: ConfirmationDialogService
    , private formErrorDisplay: FormErrorDisplayService
    , private formBuilder: FormBuilder
    , private _commonListService: CommonListService
  , private _qualificationService:QualificationService
  ,  private _common: CommonService
,private _icsCommonService: IcsCommonService) { }

  //--------AutoCompleteTextbox
   @ViewChild('remote', { static: false })
   public remoteObj: AutoCompleteComponent;
   //bind the DataManager instance to dataSource property
   public instrumentList:object[];
   public ursList:object[];
   public poList:object[];
   public manufacturerList:object[];
   // set the count for displays the suggestion items.
   public suggestionCount: number = 5;
   // maps the remote data column to fields property
   public remoteFields: Object = { value:'Name' };
  //--------AutoCompleteTextbox
  public ajaxSettings: AjaxSettingsModel;
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
   public toolbarSettings:object;
   public toolbarSettingsQualification:object;
   public showHiddenItems: boolean = true;
  closeResult: string;
  // public UpdateResult:boolean=false;
  public _restApi = environment.apiUrl + '/FileManager/';
  // @Output('callback') parentCallback: EventEmitter<boolean> = new EventEmitter<boolean>(); loginUserSer: any;
  // @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();
  ICSInstrumentId:number;
  ObjectICSMaster:IcsMaster;
  icsMasterTabFrom:FormGroup;
  qualificationForm: FormGroup;
  calibrationForm: FormGroup;
  maintenenceForm: FormGroup;
  IcsCustomHeaderForm: FormGroup;
  public dateValue: Date = new Date();
  isICSEdit = false;
  public data: object[];
  public lines: GridLine;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public dpParams: DatePicker[];
  public qualificationType: IEditCell;
  public ddParams1: IEditCell;
  public ddParams2: IEditCell;
  public objInstrumentType: Object[];
  public objIcsCriticality: Object[];
  public objIcsStorageLocationList: Object[];
  public objIcsQualificationTypeList: Object[];
  public objIcsQualificationList: Object[];
  public objMaintenanceTypeList: Object[];
  public objIcsMaintenenceList: Object[];
  public objDepartmentList: Object[];
  public POAttachmentList: Object[]=[];
  public URSAttachmentList: Object[]=[];
  public ICSImagePath:string='';
  public ICSImageName:string='';
  // public objCustomHeaderList: Object={};
  public objCustomHeaderList: Object[];
  public objUserList:Object[];
  tab_Master = true;
  tab_Qualification = false;
  public QualificationTypeName: string;
  public IcsInstrumentId : number;
  public isFreqDisabled: boolean;
  public isMaintenanceFreqDisabled: boolean;
  isReasontextBoxVisiable = false;
  public itemsmonths: object[];
  public itemsmonthsWithNA: object[];
  public IsMaintenanceEdit = false;
  public commands: CommandModel[];
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to ComboBox input element
  public watermark: string = 'Select';
  public watermark1: string = 'Select Type';
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Name', value: 'Id' };
  public UserListfields: Object = { text: 'UserName', value: 'UserId' };
  public data3: { [key: string]: Object; }[] = [
    { Name: 'Select', Id: 'S' }, { Name: 'A', Id: 'S1' }, { Name: 'B', Id: 'S2' }
  ];
  //Tab set
  public restrictedPath:string;
  private tabToMove: string = '';
  private backToGrid: boolean = false;
  public FrequencyMonth:Number;
  @ViewChild('tabset', { static: true }) tabset;
  @ViewChild('icsMasterTabFrom', { static: true }) icsMasterTabFromChild;    // view child on form instance
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data3, query);
  }
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
  public dropEle: HTMLElement;
  public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
  openAddQualificationModal(content) {
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
  adddetails(content) {
    this.IsMaintenanceEdit = false;
    this.resetMaintenenceForm();
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

  ngOnInit(): void {
    this.isFreqDisabled = true;
    this.GetInstrumentList();
    this.GetURSList();
    this.GetPOList();
    this.GetManufacturerList();
    this.SetICSMasterForm();
    this.SetQualificationForm();
    this.SetCalibrationForm();
    this.SetIcsMaintenenceForm();
    this.SetCustomHeaderForm();
    this.loadLists();
      this.initFileManager();
    this.route.params.subscribe(params => {
      if (!isNaN(Number(params['id']))) {
        // this.icsMasterTabFrom.IcsInstrumentId = Number(params['id']);
        this.icsMasterTabFrom.patchValue({
          IcsInstrumentId: Number(params['id'])
        });
        this.isICSEdit = true;
        this.GetInstrumentMasterDetails();

      }
    });

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    // if (this.icsMasterTabFrom.get('IcsInstrumentId').value > 0) {
    //   this.GetICSQualification();
    //   this.GetIcsMaintenenceList();
    // }
    this.lines = 'Both';
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.ddParams1 = { params: { value: 'Preventive Maintenance' } };
    this.ddParams2 = { params: { value: '6' } };

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
    let toolBarList = [ 'Cut', 'Copy', 'Paste', 'Download','Upload','NewFolder', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'];
    this.toolbarSettings = { items: toolBarList, visible: true };
    let toolBarListQualification = [ 'Refresh'];
    this.toolbarSettingsQualification = { items: toolBarListQualification, visible: true };
    this.showHiddenItems = true;
  }
  GetInstrumentList(){
    this._icsCommonService.GetInstrumentList().subscribe((data) => {
      this.instrumentList = data['Object'];
    });
  }
  GetURSList(){
    this._icsMasterService.GetURSList().subscribe((data) => {
      this.ursList = data['Object'];
    });
  }
  GetPOList(){
    this._icsMasterService.GetPOList().subscribe((data) => {
      this.poList = data['Object'];
    });
  }
  GetManufacturerList(){
    this._icsMasterService.GetManufacturerList().subscribe((data) => {
      this.manufacturerList = data['Object'];
    });
  }
  SetICSMasterForm() {
    this.icsMasterTabFrom = this.formBuilder.group({
      IcsInstrumentId: [''],
      InstrumentId: ['', Validators.required],
      InstrumentTypeId: [''],
      InstrumentMake: [''],
      InstrumentModel: [''],
      StorageLocationId: [''],
      URSNO:[''],
      PONO:[''],
      InstrumentDeliveryDate: [''],
      InstrumentInchargeId: [''],
      InstrumentServiceEngContact: [''],
      InstrumentMfgSrNo: [''],
      CriticalityId: [''],
      InstrumentBackupInChargeID: [''],
      PODate: [''],
      Availability: true,
      DepartmentId: [''],
      DepartmentName: [''],
      IcsUnAvailabilityReason: [''],
      InstrumentImagePath:[''],
      URSAttachmetList:new FormArray([]),  // use as formArrayName not "formControlName"
      POAttachmentList: new FormArray([])
    });
  }
  SetQualificationForm() {
      this.qualificationForm = this.formBuilder.group({
      IcsInstrumentId: ['', Validators.required],
      QualificationTypeRecordId: [''],
      QualificationTypeId: ['', Validators.required],
      QualificationDate: ['',Validators.required],
      QualificationDescription: [''],
      QualificationPerformedByName: ['', Validators.required],
      AttachmentList: new FormArray([])
    });
  }
  SetCalibrationForm() {
      this.calibrationForm = this.formBuilder.group({
      IcsInstrumentId: ['', Validators.required],
      IsCalibrationRequired: [''],
      CalibrationFrequency: [''],
    });
  }
  SetIcsMaintenenceForm() {
    this.maintenenceForm = this.formBuilder.group({
      IcsMaintenenceTypeFrequencyId: [''],
      IcsInstrumentId: ['', Validators.required],
      MaintenenceTypeMasterId: ['', Validators.required],
      FrequencyInMonth: ['', Validators.required],
    });
  }
  SetCustomHeaderForm() {
      this.IcsCustomHeaderForm = this.formBuilder.group({
      IcsCustomHeaderId: [''],
      IcsInstrumentId: ['', Validators.required],
      CustomHeaderMasterId: [''],
      CustomHeaderFieldName: [''],
      CustomHeaderValue: [''],
      });
  }
  resetMasterForm() {
    this.icsMasterTabFrom.reset();
  }
  resetQualificationForm() {
    this.qualificationForm.reset();
  }
  resetCalibrationForm() {
    this.calibrationForm.reset();
  }
  resetMaintenenceForm() {
    this.maintenenceForm.reset();
  }
  resetCustomHeaderForm() {
    this.IcsCustomHeaderForm.reset();
  }
  GetMonthList() {
    this.itemsmonths = this._commonListService.GetMonthList();
  }
  GetMonthsWithNAList() {
    this.itemsmonthsWithNA = this._icsMasterService.GetMonthsWithNAList();
  }
  gotoIcsMaster(TabId) {
    if(TabId !=null){
      this.backToGrid=true;
      switch (TabId) {
        case 'tab-Master':
        if(this.icsMasterTabFrom.dirty){
          this.saveMasterTabUnSavedChanges();
        } else{this.routes.navigate(['/icshome']);}
        break;
        case 'tab-Calibration':
        if(this.calibrationForm.dirty){
          this.saveCalibrationUnSavedChanges();
        }else{this.routes.navigate(['/icshome']);}
        break;
      default:
        console.log("switch case else part!");
        break;
      }
    }else{
      this.routes.navigate(['/icshome']);
    }
  }
  saveMasterTabUnSavedChanges()
  {
    if(this.icsMasterTabFrom.dirty){
      event.preventDefault();
      this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
        if (result) {
            this.addIcsMaster();
        } else {
          this.icsMasterTabFrom.markAsPristine();
          this.routes.navigate(['/icshome']);
        }
      });
    }
  }
  saveCalibrationUnSavedChanges(){
    if(this.calibrationForm.dirty){
      event.preventDefault();
      this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
        if (result) {
          this.SaveCalibration();
        } else {
          this.calibrationForm.markAsPristine();
          this.routes.navigate(['/icshome']);
        }
      });
    }
  }
  loadLists() {
    this.GetInstrumentTypeList();
    this.GetIcsCriticalityList();
    this.GetIcsStorageLocationList();
    this.GetIcsQualificationTypeList();
    this.GetIcsMaintenanceTypeList();
    this.GetMonthList();
    this.GetMonthsWithNAList();
    this.GetDepartmentList();
    // this.GetCustomHeaderList();
    this.GetUserList();
  }
  GetInstrumentTypeList() {
    this._icsMasterService.GetInstrumentTypeList().subscribe((data) => {
      this.objInstrumentType = data['Object'];
    });
  }
  GetIcsCriticalityList() {
    this._icsMasterService.GetIcsCriticalityList().subscribe((data) => {
      this.objIcsCriticality = data['Object'];
    });
  }
  GetIcsStorageLocationList() {
    this._icsMasterService.GetIcsStorageLocationList().subscribe((data) => {
      this.objIcsStorageLocationList = data['Object'];
    });
  }
  addIcsMaster() {
    if (this.icsMasterTabFrom.get('IcsInstrumentId').value > 0) {
      this.UpdateIcsMaster();
    } else {
         if (this.icsMasterTabFrom.valid){
          if (this.ValidateMasterForm()) {
              let IcsImage = this.icsMasterTabFrom.get('InstrumentImagePath').value;
                let URSAttachList = this.icsMasterTabFrom.get('URSAttachmetList').value;
                  let POAttachList = this.icsMasterTabFrom.get('POAttachmentList').value;
            this._icsMasterService.SaveIcsMaster(this.icsMasterTabFrom.value,IcsImage,URSAttachList,POAttachList).subscribe(res => {
              if (res['Result']) {
                const ObjICSInstrumentId = res['Object'] as IcsMaster;
                this.icsMasterTabFrom.patchValue({
                  IcsInstrumentId: ObjICSInstrumentId
                });
                this.icsMasterTabFrom.markAsPristine();
                this._toastr.success(res['ResultMessage']);
                res['ExtraObject']['POFiles'].forEach(element => {
                  this.POAttachmentList.push(element);
                });
                res['ExtraObject']['URSFiles'].forEach(element => {
                  this.URSAttachmentList.push(element);
                });
                this.ICSImagePath=res['ExtraObject']['InstrumentImage']['AttachmentPath'];
                this.ICSImageName=res['ExtraObject']['InstrumentImage']['ImageName'];

                this.moveToTab(this.tabToMove);
                if(this.backToGrid){
                    this.routes.navigate(['/icshome']);
                }
                this.tabset.refresh();
              } else {
                this._toastr.error(res['ResultMessage']);
              }
            });
          }
      }
      else{
          this.formErrorDisplay.showErrors(this.icsMasterTabFrom);
      }
    }
  }
  ValidateMasterForm() {
    if (this.icsMasterTabFrom.get('Availability').value === false && this.icsMasterTabFrom.get('IcsUnAvailabilityReason').value === null) {
        this._toastr.error('Unavailable Reason is Required');
        return false;
    }
   
    if( (this.icsMasterTabFrom.get('InstrumentTypeId').value) == "")
    {
      this._toastr.error('Instrument Name Is Required');
      return false
    }
    return true;
  }
  GetInstrumentMasterDetails() {
    this._icsMasterService.GetIcsMasterDetail(this.icsMasterTabFrom.get('IcsInstrumentId').value).subscribe((data) => {
    let ObjInstrumentDetail = data['Object'] as IcsMaster;
    if(ObjInstrumentDetail!=null){
      this.POAttachmentList=ObjInstrumentDetail.POAttachmentList;
      this.URSAttachmentList=ObjInstrumentDetail.URSAttachmentList;
      this.ICSImagePath=ObjInstrumentDetail.InstrumentImage['AttachmentPath'];
      this.ICSImageName=ObjInstrumentDetail.InstrumentImage['ImageName'];
      this.icsMasterTabFrom.patchValue({
        IcsInstrumentID: ObjInstrumentDetail.IcsInstrumentId,
        InstrumentId: ObjInstrumentDetail.InstrumentId,
        InstrumentTypeId: ObjInstrumentDetail.InstrumentTypeId,
        InstrumentMake: ObjInstrumentDetail.InstrumentMake,
        InstrumentModel: ObjInstrumentDetail.InstrumentModel,
        StorageLocationId: ObjInstrumentDetail.StorageLocationId,
        InstrumentDeliveryDate: ObjInstrumentDetail.InstrumentDeliveryDate,
        URSNO: ObjInstrumentDetail.URSNO,
        PONO: ObjInstrumentDetail.PONO,
        InstrumentInchargeId: ObjInstrumentDetail.InstrumentInchargeId,
        InstrumentServiceEngContact: ObjInstrumentDetail.InstrumentServiceEngContact,
        InstrumentMfgSrNo: ObjInstrumentDetail.InstrumentMfgSrNo,
        CriticalityId: ObjInstrumentDetail.CriticalityId,
        InstrumentBackupInChargeID: ObjInstrumentDetail.InstrumentBackupInChargeID,
        PODate: ObjInstrumentDetail.PODate,
        Availability: ObjInstrumentDetail.Availability,
        DepartmentId: ObjInstrumentDetail.DepartmentId,
        DepartmentName: ObjInstrumentDetail.DepartmentName,
        IcsUnAvailabilityReason: ObjInstrumentDetail.IcsUnAvailabilityReason,
        // InstrumentImageName:ObjInstrumentDetail.InstrumentImagePath
      });
      this.calibrationForm.patchValue({
        IcsInstrumentId: ObjInstrumentDetail.IcsInstrumentId,
        IsCalibrationRequired: ObjInstrumentDetail.IsCalibrationRequired,
        CalibrationFrequency:ObjInstrumentDetail.CalibrationFrequency
      });
      if (ObjInstrumentDetail.IsCalibrationRequired == true) {
        this.isFreqDisabled = false;
      }
      if(this.icsMasterTabFrom.get('IcsUnAvailabilityReason').value === false){

      }
      setTimeout(() => {
        this.icsMasterTabFrom.markAsPristine();
        this.calibrationForm.markAsPristine();
      }, 1000);
  }
    else{
      this.icsMasterTabFrom.patchValue({
        IcsInstrumentID: null,
        InstrumentId: null,
        InstrumentTypeId: null,
        InstrumentMake: null,
        InstrumentModel: null,
        StorageLocationId: null,
        InstrumentDeliveryDate: null,
        URSNO: null,
        PONO: null,
        InstrumentInchargeId: null,
        InstrumentServiceEngContact: null,
        InstrumentMfgSrNo: null,
        CriticalityId: null,
        InstrumentBackupInChargeID: null,
        PODate: null,
        IsCalibrationRequired: null,
        CalibrationFrequency: null,
        Availability: null,
        DepartmentId: null,
        DepartmentName: null,
        IcsUnAvailabilityReason: null
      });
    }
      if (this.icsMasterTabFrom.get('IsCalibrationRequired').value == true) {
        this.isFreqDisabled = false;
      }
      if (this.icsMasterTabFrom.get('Availability').value == false) {
        this.isReasontextBoxVisiable = true;
      }
    });
    // this.GetCustomHeaderDetails();
  }
  UpdateIcsMaster() {
    if (this.icsMasterTabFrom.valid){
     if (this.ValidateMasterForm()) {
       let icsImageFile = this.icsMasterTabFrom.get('InstrumentImagePath').value;
         let URSAttachmentList = this.icsMasterTabFrom.get('URSAttachmetList').value;
           let POAttachmentList = this.icsMasterTabFrom.get('POAttachmentList').value;
           this._icsMasterService.UpdateICSMaster(this.icsMasterTabFrom.value,icsImageFile,URSAttachmentList,POAttachmentList).subscribe(res => {
            if (res['Result']) {
              this.icsMasterTabFrom.markAsPristine();
              this._toastr.success(res['ResultMessage']);
              res['Object']['POFiles'].forEach(element => {
                this.POAttachmentList.push(element);
              });
              res['Object']['URSFiles'].forEach(element => {
                this.URSAttachmentList.push(element);
              });
              this.ICSImagePath=res['Object']['InstrumentImage']['AttachmentPath'];
              this.ICSImageName=res['Object']['InstrumentImage']['ImageName'];

              this.moveToTab(this.tabToMove);
              if(this.backToGrid){
                  this.routes.navigate(['/icshome']);
              }
            // this.tabset.refresh();
            } else {
              this._toastr.error(res['ResultMessage']);
            }
          });
        }
    }
    else{
        this.formErrorDisplay.showErrors(this.icsMasterTabFrom);
    }
  }
  GetCustomHeaderDetails(){
    this._icsMasterService.GetCustomHeaderDetails(this.icsMasterTabFrom.get('IcsInstrumentId').value).subscribe((data) => {
      this.objCustomHeaderList = data['Object'];
    });
  }
  GetIcsQualificationTypeList() {
    this._icsMasterService.GetIcsQualificationTypeList().subscribe((data) => {
      this.objIcsQualificationTypeList = data['Object'];
    });
  }
  GetICSQualification() {
    this._icsMasterService.GetICSQualification(this.icsMasterTabFrom.get('IcsInstrumentId').value).subscribe((data) => {
      this.objIcsQualificationList = data['Object'];
    });
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    args.filesData.forEach(file => {
      (this.qualificationForm.controls.AttachmentList as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });
  }
  SaveQualification() {
    this.qualificationForm.patchValue({
      IcsInstrumentId: this.icsMasterTabFrom.get('IcsInstrumentId').value,
    });
      if (this.qualificationForm.valid) {
            let fileList = this.qualificationForm.get('AttachmentList').value;
        this._qualificationService.SaveQualification(this.qualificationForm.value,fileList).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.resetQualificationForm();
            this.GetICSQualification();
            this.closeAddParameterModal();
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      }
      else{
          this.formErrorDisplay.showErrors(this.qualificationForm);
      }
  }
  closeAddParameterModal() {
    this.modalService.dismissAll();
  }
  SaveCalibration() {
    this.calibrationForm.patchValue({
      IcsInstrumentId: this.icsMasterTabFrom.get('IcsInstrumentId').value,
    });
    if (this.calibrationForm.valid) {
      if (this.ValidateCalibration(this.calibrationForm.get('IsCalibrationRequired').value,this.calibrationForm.get('CalibrationFrequency').value)) {

      this._icsMasterService.SaveIcsCalibration(this.calibrationForm.value).subscribe(res => {
        if (res['Result']) {
            this.calibrationForm.markAsPristine();
          this._toastr.success(res['ResultMessage']);
          this.moveToTab(this.tabToMove);
          if(this.backToGrid){
              this.routes.navigate(['/icshome']);
          }
          this.closeAddParameterModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
      else {
        this._toastr.warning('Please select Frequency');
      }

    } else {
      this.formErrorDisplay.showErrors(this.calibrationForm);
    }
  }
  DisableFrequency(evt) {
    // this.formData.CalibrationFrequency = null;
    this.isFreqDisabled = true;
      this.icsMasterTabFrom.patchValue({
        CalibrationFrequency: null,
      });
  }
  EnableFrequency() {
    this.isFreqDisabled = false;
  }
  GetIcsMaintenanceTypeList() {
    this._icsMasterService.GetIcsMaintenanceTypeList().subscribe((data) => {
      this.objMaintenanceTypeList = data['Object'];
    });
  }
  SaveMaintenence() {
    this.maintenenceForm.patchValue({
      IcsInstrumentId: this.icsMasterTabFrom.get('IcsInstrumentId').value,
    });
    if (this.maintenenceForm.valid) {
    this._icsMasterService.SaveMaintenence(this.maintenenceForm.value).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res['ResultMessage']);
        this.GetIcsMaintenenceList();
        this.resetMaintenenceForm();
        this.closeAddParameterModal();
      } else {
        this._toastr.error(res['ResultMessage']);
      }
    });
  }
  else{
      this.formErrorDisplay.showErrors(this.maintenenceForm);
  }
  }
  GetIcsMaintenenceList() {
    this._icsMasterService.GetIcsMaintenenceList(this.icsMasterTabFrom.get('IcsInstrumentId').value).subscribe((data) => {
      this.objIcsMaintenenceList = data['Object'];
    });
  }
  GetMaintenaceType(IcsMaintenanceTypeId) {
    this.isMaintenanceFreqDisabled = false;
    this.maintenenceForm.patchValue({
      FrequencyInMonth: null,
    });
    if (IcsMaintenanceTypeId.itemData.Name === "BreakDown") {
      this.maintenenceForm.patchValue({
        FrequencyInMonth: '-1',
      });
        this.isMaintenanceFreqDisabled = true;
    }else if(IcsMaintenanceTypeId.itemData.Name === "Annual"){
      this.maintenenceForm.patchValue({
        FrequencyInMonth:'12'
      });
        this.isMaintenanceFreqDisabled = true;
    }
    else{
      console.log('Before set ',this.maintenenceForm.get('FrequencyInMonth').value);
      this.maintenenceForm.patchValue({
       FrequencyInMonth:this.FrequencyMonth
     });
     console.log('After Set',this.maintenenceForm.get('FrequencyInMonth').value);
    }
  }
  GetDepartmentList() {
    this._icsMasterService.GetDepartmentList().subscribe((data) => {
      this.objDepartmentList = data['Object'];
    });
  }
  GetUserList() {
    this._icsMasterService.GetUserList().subscribe((data) => {
      this.objUserList = data['Object'];
    });
  }
  moveToTab(tabId) {
  this.tabset.select(tabId);
  }
  tabChanged(event) {
     this.tabToMove = event.nextId;
    switch (event.activeId) {
      case 'tab-Master':
        if(this.icsMasterTabFrom.dirty){
          event.preventDefault();
          this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
            if (result) {
                this.addIcsMaster();
            } else {
              this.icsMasterTabFrom.markAsPristine();
              this.tabset.select(this.tabToMove);
            }
          });
        }
        break;
      case 'tab-Calibration':
      if(this.calibrationForm.dirty){
        event.preventDefault();
        this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
          if (result) {
            this.SaveCalibration();
          } else {
            this.calibrationForm.markAsPristine();
            this.tabset.select(this.tabToMove);
          }
        });
      }

        break;

      default:
        console.log("switch case else part!");
        break;
    }

switch (event.nextId){
    case 'tab-Qualification':
    if (this.icsMasterTabFrom.get('IcsInstrumentId').value > 0) {
          this.GetICSQualification();
        }
    break;
  case 'tab-Maintenance':
  if (this.icsMasterTabFrom.get('IcsInstrumentId').value > 0) {
    this.GetIcsMaintenenceList();
  }
    break;
    case 'tab-CustomHeader':  this.GetCustomHeaderList();
    if (this.icsMasterTabFrom.get('IcsInstrumentId').value > 0) {
    this.GetCustomHeaderDetails();
    }
    break;
    default:
      console.log("switch case else part!");
      break;

}

  }
  public openConfirmationDialog() {
    return this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No');
  }
  GetCustomHeaderList() {
    this._icsMasterService.GetCustomHeaderList().subscribe((data) => {
      this.objCustomHeaderList = data['Object'];
    });
  }
  SetHeaderList(event,data) {
    if (data.CustomHeaderValue!=null || data.CustomHeaderValue!='') {
      const items = this.objCustomHeaderList.filter(item => item['CustomHeaderMasterId'] == data.CustomHeaderMasterId);
      const index = this.objCustomHeaderList.findIndex(item => item['CustomHeaderMasterId'] == data.CustomHeaderMasterId);
      this.objCustomHeaderList[index]['CustomHeaderValue']=data.CustomHeaderValue;
      this.objCustomHeaderList[index]['IcsInstrumentId']=this.icsMasterTabFrom.get('IcsInstrumentId').value;
    }
  }
  SaveCustomHeader(){
    this._icsMasterService.SaveCustomHeader(this.objCustomHeaderList).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res['ResultMessage']);
      } else {
        this._toastr.error(res['ResultMessage']);
      }
    });
  }
   isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}
setRowId(data){
  this.QualificationTypeName= data.QualificationTypeName;
  this.IcsInstrumentId =data.IcsInstrumentId;
}

beforeSendDocument(args) {
  // Get the value of Dropdownlist.
      let restrictedPath ="ICSMaster/Inst_" + this.icsMasterTabFrom.get('IcsInstrumentId').value + "/Documents" ;
  // let restrictedPath ="ICSQualification/Inst_" + this.IcsInstrumentId + "/" + this.QualificationTypeRecordId ;
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
      args.cancel=false;
      if (data[0]["path"].indexOf(restrictedPath) == -1) {
        data[0]["path"] = restrictedPath + data[0]["path"];
      }
    } else if (data["path"].indexOf(restrictedPath) == -1) {
    data["path"] = restrictedPath + data["path"];
    if (args["action"] == 'move') {
      data["targetPath"] = restrictedPath + data["targetPath"];
    }else if (args["action"] == 'copy') {
      data["targetPath"] = restrictedPath + data["targetPath"];
    }
  }
    args.ajaxSettings.data = JSON.stringify(data);
  }
}
beforeSend(args) {
  // Get the value of Dropdownlist.
      let restrictedPath ="ICSQualification/Inst_" + this.IcsInstrumentId + "/" + this.QualificationTypeName ;
  // let this.restrictedPath ="ICSQualification/Inst_" + this.IcsInstrumentId + "/" + this.QualificationTypeRecordId ;
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
public onImageFileSelect: EmitType<Object> = (args: any) => {
  this.icsMasterTabFrom.patchValue({
    InstrumentImagePath: args.filesData[0].rawFile
  });
}
public onURSFileSelect: EmitType<Object> = (args: any) => {
  args.filesData.forEach(file => {
    (this.icsMasterTabFrom.controls.URSAttachmetList as FormArray).push(this.formBuilder.group({
      Attachment: file.rawFile
    }));
  });
}
public onPOFileSelect: EmitType<Object> = (args: any) => {
  args.filesData.forEach(file => {
    (this.icsMasterTabFrom.controls.POAttachmentList as FormArray).push(this.formBuilder.group({
      Attachment: file.rawFile
    }));
  });
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


  // GetAvailabilityValue() {
  //   this.isReasontextBoxVisiable = false;
  //   this.icsMasterTabFrom.patchValue({
  //     IcsUnAvailabilityReason: null,
  //   });
  //   console.log("availability value in change", availability.checked);
  //   if (this.icsMasterTabFrom.get('Availability').value == false) {
  //     this.isReasontextBoxVisiable = true;
  //   }
  // }

  ValidateCalibration(IsRequired,Frequency) {
    let Res = true;
    if (IsRequired === true && Frequency < 1) {
      Res = false;
    }
    return Res;
  }

  editMaintenance(args: CommandClickEventArgs): void {
    this._icsMasterService
      .GetMaintenenceDetails(args["rowData"]["IcsMaintenenceTypeFrequencyId"])
      .subscribe((data) => {
        const ObjectMaintenanceDetail = data["Object"] as IcsMaintenence;
        console.log(this.itemsmonthsWithNA);
        if (ObjectMaintenanceDetail != null) {
           this.maintenenceForm.patchValue({
            IcsMaintenenceTypeFrequencyId: ObjectMaintenanceDetail.IcsMaintenenceTypeFrequencyId,
            IcsInstrumentId: ObjectMaintenanceDetail.IcsInstrumentId,
            MaintenenceTypeMasterId:ObjectMaintenanceDetail.MaintenenceTypeMasterId,
            FrequencyInMonth:ObjectMaintenanceDetail.FrequencyInMonth,
            MaintenenceTypeName :ObjectMaintenanceDetail.MaintenenceTypeName
          });
          this.IsMaintenanceEdit = true;
        } else {
          this.maintenenceForm.patchValue({
            IcsMaintenenceTypeFrequencyId:null,
            IcsInstrumentId: null,
            MaintenenceTypeMasterId:null,
            FrequencyInMonth:null,
            MaintenenceTypeName :null
          });
        }
        console.log('edit time',this.maintenenceForm.get('FrequencyInMonth').value);
        this.FrequencyMonth= this.maintenenceForm.get('FrequencyInMonth').value;
      });
  }

}
