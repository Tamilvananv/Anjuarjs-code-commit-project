import { Component, OnInit, ViewChild,  Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  GridLine,
  EditSettingsModel,
  ToolbarItems,
  IEditCell,
  CommandModel,
  CommandClickEventArgs,
} from "@syncfusion/ej2-grids";
import { DatePicker } from "@syncfusion/ej2-calendars";
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { FilterService } from "@syncfusion/ej2-angular-grids";
import { ItemModel } from "@syncfusion/ej2-splitbuttons/src/common/common-model";
import { EquipmentMasterService } from "../service/eqs-master.service";
import { ToastrService } from "ngx-toastr";
import { EqsMaster, EqsMaintenence, Calibration } from "../service/eqs-master.model";
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { EqsQualification } from '../service/eqs-qualification.model';
import { EqsCustomHeader } from '../service/eqs-customHeader.model';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import{EqsCommonService} from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';
import { CommonService } from 'src/app/Shared Services etc/Services/Common.service';
import { environment } from 'src/environments/environment';
import { AjaxSettingsModel, SearchSettingsModel,ToolbarClickEventArgs } from '@syncfusion/ej2-filemanager';
import { AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: "app-add-equipment",
  templateUrl: "./add-equipment.component.html",
  providers: [FilterService,ToolbarService],
  styleUrls: ["./add-equipment.component.css"],
})
export class AddEquipmentComponent implements OnInit {
  public dateValue: Date = new Date();
  EQSAddEquipmentform: FormGroup;
  EqsQualificationForm: FormGroup
  EqsMaintenenceForm: FormGroup;
  EqsCalibrationForm: FormGroup;
  EqsCustomHeaderForm: FormGroup;
  isEQSEdit = false;
  isEQSCalibrationEdit = false;
  isReasontextBoxVisiable = false;
  public IsMaintenanceEdit = false;
  constructor(
    private route: ActivatedRoute,
    private routes: Router,
    private _eqsMasterService: EquipmentMasterService,
    private _eqsCommonService:EqsCommonService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmationDialogService,
    private formErrorDisplay: FormErrorDisplayService,
    private formBuilder: FormBuilder
    ,private _common: CommonService) { }

      //--------AutoCompleteTextbox
       @ViewChild('remote', { static: false })
       public remoteObj: AutoCompleteComponent;
       //bind the DataManager instance to dataSource property
       public equipmentList:object[];
       public ursList:object[];
       public poList:object[];
       public manufacturerList:object[];
       // set the count for displays the suggestion items.
       public suggestionCount: number = 5;
       // maps the remote data column to fields property
       public remoteFields: Object = { value:'Name' };
  //--------AutoCompleteTextbox
    public ajaxSettings: AjaxSettingsModel;
    public ajaxSettingsDocument: AjaxSettingsModel;
    public searchSettings: SearchSettingsModel;
    public navigationPaneSettings: object;
    public contextMenuSettings: object;
   public toolbarSettings:object;
public toolbarSettingsQualification:object;
      public showHiddenItems: boolean = true;
    closeResult: string;
    public _restApi = environment.apiUrl + '/FileManager/';
  public data: object[];
  public lines: GridLine;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  // public dpParams: DatePicker[];
  // public ddParams: IEditCell;
  // public ddParams1: IEditCell;
  // public ddParams2: IEditCell;
  public objEquipmentType: Object[];
  public objEqsCriticality: Object[];
  public objEqsStorageLocationList: Object[];
  public objEqsQualificationTypeList: Object[];
  public objEqsQualificationList: Object[];
  public objEqsMaintenanceTypeList: Object[];
  public objEqsMaintenenceList: Object[];
  public objCustomHeaderList: Object[];
  public objDepartmentList: Object[];
  public objUserList:Object[];
  public UserListfields: Object = { text: 'UserName', value: 'UserId' };
  public isFreqDisabled: boolean;
  public isMaintenanceFreqDisabled: boolean;
  public itemsmonths: object[];
  public itemsmonthsWithNA: object[];
  public format: string = 'dd-MMMM-yyyy';//this for datepicker format
  public EqsQualificationTypeName:string;
  public EqsEquipmentId:Number;
  public POAttachmentList: Object[]=[];
  public URSAttachmentList: Object[]=[];
  public EQSImageName:string;
  public EQSImagePath:string;
  public commands: CommandModel[];
  public FrequencyMonth:Number;

  //Tab set
  // @ViewChild('t', { static: true }) addEquipmentTabset;
    @ViewChild('tabset', { static: false }) private tabset: NgbTabset;
  // @ViewChild('EQSAddEquipmentform', { static: true }) EQSAddEquipmentform;
  private tabToMove: string = '';
  private backToGrid: boolean = false;
  public data3: { [key: string]: Object }[] = [{ Name: "Select", Code: "S" }];
  // maps the appropriate column to fields property
  public fields: Object = { text: "Name", value: "Id" };
  // set the height of the popup element
  public height: string = "220px";
  // set the placeholder to ComboBox input element
  public watermark: string = "Select";
  public watermark1: string = "Select Type";
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== "" ? query.where("Name", "startswith", e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data3, query);
  };
  // tslint:disable-next-line:member-ordering
  // public path: Object = {
  //   saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
  //   removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  // };
  // public onUploadSuccess(args: any): void {
  //   if (args.operation === "upload") {
  //     console.log("File uploaded successfully");
  //   }
  // }
  // public onUploadFailure(args: any): void {
  //   console.log("File failed to upload");
  // }
  // tslint:disable-next-line:member-ordering
  // public dropEle: HTMLElement;
  // public hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
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
    this.GetEquipmentList();
    this.GetURSList();
    this.GetPOList();
    this.GetManufacturerList();
    this.isFreqDisabled = true;
    this.SetEQSAddEquipmentform();
    this.SetQualificationForm();
    this.SetEqsMaintenenceForm();
    this.SetEqsCalibrationForm();
    this.SetCustomHeaderForm();
    this.loadLists();
      this.initFileManager();
    this.route.params.subscribe((params) => {
      if (!isNaN(Number(params["id"]))) {
        // this.EQSAddEquipmentform.EqsEquipmentId = Number(params["id"]);
        this.EQSAddEquipmentform.patchValue({
          EqsEquipmentId: Number(params['id'])
        });
        this.isEQSEdit = true;
        // this.isEQSCalibrationEdit = true;
        this.GetEquipmentMasterDetails();
      }
    });

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
    };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.lines = "Both";
    // this.ddParams = { params: { value: "IQ" } };
    // this.ddParams1 = { params: { value: "Preventive Maintenance" } };
    // this.ddParams2 = { params: { value: "5" } };
  }
  initFileManager() {
    this.ajaxSettings = {
      url: this._restApi + 'FileOperations',
      getImageUrl: this._restApi + 'GetImage',
      uploadUrl: this._restApi + 'Upload',
      downloadUrl: this._restApi + 'Download'
    };
    this.ajaxSettingsDocument = {
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
    let toolBarList = [ 'Cut', 'Copy', 'Paste', 'Download','Upload','NewFolder', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'];
    this.toolbarSettingsQualification = { items: toolBarList, visible: true };
    let toolBarListQualification = [ 'Refresh'];
    this.toolbarSettingsQualification = { items: toolBarListQualification, visible: true };
    this.showHiddenItems = true;
  }
  GetEquipmentList(){
    this._eqsCommonService.GetEquipmentList().subscribe((data) => {
      this.equipmentList = data['Object'];
    });
  }
  GetURSList(){
    this._eqsMasterService.GetURSList().subscribe((data) => {
      this.ursList = data['Object'];
    });
  }
  GetPOList(){
    this._eqsMasterService.GetPOList().subscribe((data) => {
      this.poList = data['Object'];
    });
  }
  GetManufacturerList(){
    this._eqsMasterService.GetManufacturerList().subscribe((data) => {
      this.manufacturerList = data['Object'];
    });
  }
  gotoEqsMaster(TabId) {
    if(TabId !=null){
      this.backToGrid=true;
      switch (TabId) {
        case 'tab-Master':
        if(this.EQSAddEquipmentform.dirty){
          this.saveMasterTabUnSavedChanges();
        } else{this.routes.navigate(["/eqs-home"]);}
        break;
        case 'tab-Calibration':
        if(this.EqsCalibrationForm.dirty){
          this.saveCalibrationUnSavedChanges();
        }else{this.routes.navigate(["/eqs-home"]);}
        break;
      default:
        console.log("switch case else part!");
        break;
      }
    }else{
      this.routes.navigate(["/eqs-home"]);}
    }
  saveMasterTabUnSavedChanges(){
    if(this.EQSAddEquipmentform.dirty){
      event.preventDefault();
      this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
        if (result) {
            this.addEqsMaster();
        } else {
          this.EQSAddEquipmentform.markAsPristine();
          this.routes.navigate(["/eqs-home"]);
        }
      });
    }
  }
  saveCalibrationUnSavedChanges(){
    if(this.EqsCalibrationForm.dirty){
      event.preventDefault();
      this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
        if (result) {
          this.SaveCalibration();
        } else {
          this.EqsCalibrationForm.markAsPristine();
          this.routes.navigate(["/eqs-home"]);
        }
      });
    }
  }
  SetEQSAddEquipmentform() {
      this.EQSAddEquipmentform = this.formBuilder.group({
        EqsEquipmentId: [''],
        EquipmentId: ['', Validators.required],
        EquipmentTypeId:[''],
        EquipmentMake: [''],
        EquipmentModel: [''],
        EqsStorageLocationId: [''],
        EquipmentDeliveryDate: [''],
        URSNO: [''],
        PONO: [''],
        EquipmentInChargeId: [''],
        EquipmentServiceEngContact: [''],
        EquipmentMfgSrNo: [''],
        CriticalityId: [''],
        EquipmentBackupInChargeId: [''],
        PODate: [''],
        IsEquipmentCalibrationRequired: [''],
        EquipmentCalibrationFrequency: [''],
        PoId: [''],
        URSId: [''],
        Availability: true,
        DepartmentId: [''],
        DepartmentName: [''],
        EqsUnAvailabilityReason: [''],
        Image:[''],
        URSAttachmet:new FormArray([]),
        POAttachment: new FormArray([])
      });
  }
  SetQualificationForm() {
    this.EqsQualificationForm =  this.formBuilder.group({
      EqsQualificationTypeRecordId:[''],
      EqsEquipmentId: ['', Validators.required],
      EqsQualificationTypeId: ['', Validators.required],
      EqsQualificationDate: ['', Validators.required],
      EqsQualificationDescription: [''],
      EqsQualificationPerformedByName: ['', Validators.required],
      AttachmentList: new FormArray([])
    });
  }
  SetEqsMaintenenceForm() {
    this.EqsMaintenenceForm =  this.formBuilder.group({
      EqsMaintenenceTypeFrequencyId: [''],
      EqsEquipmentId: ['', Validators.required],
      MaintenenceTypeMasterId: ['', Validators.required],
      FrequencyInMonth:['', Validators.required],
      });
  }
  SetCustomHeaderForm() {
    this.EqsCustomHeaderForm = this.formBuilder.group({
      EqsMasterCustomHeaderId: [''],
      EqsEquipmentId: ['', Validators.required],
      CustomHeaderMasterId: [''],
      CustomHeaderFieldName: [''],
      CustomHeaderValue: [''],
      });
  }
  SetEqsCalibrationForm(){
    this.EqsCalibrationForm =  this.formBuilder.group({
      EqsEquipmentId: ['', Validators.required],
      IsEquipmentCalibrationRequired: ['', Validators.required],
      EquipmentCalibrationFrequency: ['']
      });
  }
  ResetEquipmentForm(){
    this.EQSAddEquipmentform.reset();
  }
  ResetQualificationForm(){
    this.EqsQualificationForm.reset();
  }
  ResetMaintenenceForm(){
    this.EqsMaintenenceForm.reset();
  }
  ResetCustomHeaderForm(){
    this.EqsCustomHeaderForm.reset();
  }
  loadLists() {
    this.GetEquipmentTypeList();
    this.GetEqsCriticalityList();
    this.GetEqsStorageLocationList();
    this.GetEqsQualificationTypeList();
    this.GetMonthList();
    this.GetEqsMaintenanceTypeList();
    this.GetMonthsWithNAList();
    // this.GetCustomHeaderList();
    this.GetDepartmentList();
    this.GetUserList();
  }
  GetUserList() {
    this._eqsCommonService.GetUserList().subscribe((data) => {
      this.objUserList = data['Object'];
    });
  }
  GetMaintenacceType(EqsMaintenanceTypeId) {
    this.isMaintenanceFreqDisabled = false;
    this.EqsMaintenenceForm.patchValue({ FrequencyInMonth : null});
    if (EqsMaintenanceTypeId.itemData.Name === "BreakDown") {
        this.EqsMaintenenceForm.patchValue({
          FrequencyInMonth:'-1'
        });
      this.isMaintenanceFreqDisabled = true;
    }else if(EqsMaintenanceTypeId.itemData.Name === "Annual"){
      console.log(this.itemsmonthsWithNA);
      this.EqsMaintenenceForm.patchValue({
        FrequencyInMonth:'12'
      });
        this.isMaintenanceFreqDisabled = true;
    }
    else{
      console.log('Before set ',this.EqsMaintenenceForm.get('FrequencyInMonth').value);
      this.EqsMaintenenceForm.patchValue({
       FrequencyInMonth:this.FrequencyMonth
     });
     console.log('After Set',this.EqsMaintenenceForm.get('FrequencyInMonth').value);
    }
  }
  GetEquipmentTypeList() {
    this._eqsMasterService.GetEquipmentTypeList().subscribe((data) => {
      this.objEquipmentType = data["Object"];
    });
  }
  GetEqsCriticalityList() {
    this._eqsMasterService.GetEqsCriticalityList().subscribe((data) => {
      this.objEqsCriticality = data["Object"];
    });
  }
  GetEqsStorageLocationList() {
    this._eqsMasterService.GetEqsStorageLocationList().subscribe((data) => {
      this.objEqsStorageLocationList = data["Object"];
    });
  }
  GetEquipmentMasterDetails() {
    this._eqsMasterService.GetEqsMasterDetail(this.EQSAddEquipmentform.get('EqsEquipmentId').value).subscribe((data) => {
        const ObjectData = data["Object"];
        if(ObjectData!=null){
          this.POAttachmentList=ObjectData.POAttachmentList;
          this.URSAttachmentList=ObjectData.URSAttachmentList;
          this.EQSImageName=ObjectData.EquipmentImage['ImageName'];
          this.EQSImagePath=ObjectData.EquipmentImage['AttachmentPath'];
          this.EQSAddEquipmentform.patchValue({
            EqsEquipmentId:ObjectData.EqsEquipmentId,
            EquipmentId: ObjectData.EquipmentId,
            EquipmentTypeId:ObjectData.EquipmentTypeId,
            EquipmentMake: ObjectData.EquipmentMake,
            EquipmentModel: ObjectData.EquipmentModel,
            EqsStorageLocationId: ObjectData.EqsStorageLocationId,
            EquipmentDeliveryDate: ObjectData.EquipmentDeliveryDate,
            URSNO: ObjectData.URSNO,
            PONO: ObjectData.PONO,
            EquipmentInChargeId: ObjectData.EquipmentInChargeId,
            EquipmentServiceEngContact: ObjectData.EquipmentServiceEngContact,
            EquipmentMfgSrNo: ObjectData.EquipmentMfgSrNo,
            CriticalityId: ObjectData.CriticalityId,
            EquipmentBackupInChargeId: ObjectData.EquipmentBackupInChargeId,
            PODate: ObjectData.PODate,
            PoId: ObjectData.PoId,
            URSId: ObjectData.URSId,
            Availability: ObjectData.Availability,
            DepartmentId: ObjectData.DepartmentId,
            DepartmentName: ObjectData.DepartmentName,
            EqsUnAvailabilityReason: ObjectData.EqsUnAvailabilityReason
          });
          this.EqsCalibrationForm.patchValue({
            EqsEquipmentId: ObjectData.EquipmentId,
            IsEquipmentCalibrationRequired: ObjectData.IsEquipmentCalibrationRequired,
            EquipmentCalibrationFrequency: ObjectData.EquipmentCalibrationFrequency,
          });
          console.log('isRequired value =' + ObjectData.IsEquipmentCalibrationRequired);
          if (ObjectData.IsEquipmentCalibrationRequired == true) {
            this.isFreqDisabled = false;
          }
          if (this.EQSAddEquipmentform.get('Availability').value == false) {
            this.isReasontextBoxVisiable = true;
          }
          setTimeout(() => {
            this.EQSAddEquipmentform.markAsPristine();
            this.EqsCalibrationForm.markAsPristine();
          }, 1000);
        }
        else{
          this.EQSAddEquipmentform.patchValue({
            EqsEquipmentId:null,
            EquipmentId: null,
            EquipmentTypeId:null,
            EquipmentMake: null,
            EquipmentModel: null,
            EqsStorageLocationId: null,
            EquipmentDeliveryDate: null,
            URSNO: null,
            URSLink: null,
            PONO: null,
            POLink:null,
            EquipmentInChargeId: null,
            EquipmentServiceEngContact: null,
            EquipmentMfgSrNo: null,
            CriticalityId: null,
            EquipmentBackupInChargeId: null,
            PODate: null,
            PoId: null,
            URSId: null,
            Availability: null,
            DepartmentId: null,
            DepartmentName: null,
            EqsUnAvailabilityReason: null
          });
          this.EqsCalibrationForm.patchValue({
            EqsEquipmentId: null,
            IsEquipmentCalibrationRequired: null,
            EquipmentCalibrationFrequency: null
          });
        }
      });
  }
  GetCustomHeaderDetails(){
    this._eqsMasterService.GetCustomHeaderDetails(this.EQSAddEquipmentform.get('EqsEquipmentId').value).subscribe((data) => {
      this.objCustomHeaderList = data['Object'];
    });
  }
  addEqsMaster() {
    if (this.EQSAddEquipmentform.get('EqsEquipmentId').value > 0) {
      this.UpdateEqsMaster();
    } else {
      console.log('POAttachmentList = ', this.POAttachmentList);
        if (this.EQSAddEquipmentform.valid) {
          if (this.ValidateMasterForm()) {
            let EQSImageAttach = this.EQSAddEquipmentform.get('Image').value;
              let URSAttachList = this.EQSAddEquipmentform.get('URSAttachmet').value;
                let POAttachList = this.EQSAddEquipmentform.get('POAttachment').value;
            this._eqsMasterService.SaveEqsMaster(this.EQSAddEquipmentform.value,EQSImageAttach,URSAttachList,POAttachList).subscribe((res) => {
              this.EQSAddEquipmentform.patchValue({
                EqsEquipmentId: res['Object']
              });
              if (res['Result']) {
                console.log(this.POAttachmentList);
                this.EQSAddEquipmentform.markAsPristine();
                this._toastr.success(res["ResultMessage"]);
                res['ExtraObject']['POFiles'].forEach(element => {
                  this.POAttachmentList.push(element);
                });
                res['ExtraObject']['URSFiles'].forEach(element => {
                  this.URSAttachmentList.push(element);
                });
                this.EQSImagePath=res['ExtraObject']['EquipmentImage']['AttachmentPath'];
                this.EQSImageName=res['ExtraObject']['EquipmentImage']['ImageName'];

                this.moveToTab(this.tabToMove);
                if(this.backToGrid){
                    this.routes.navigate(['/eqs-home']);
                }
              }
              else {
                this._toastr.error(res['ResultMessage']);
              }
            });
          }
        }
        else{
            this.formErrorDisplay.showErrors(this.EQSAddEquipmentform);
        }
    }
  }
  ValidateMasterForm() {
    console.log(this.EQSAddEquipmentform.get('Availability').value);
    console.log(this.EQSAddEquipmentform.get('EqsUnAvailabilityReason').value);
    if (this.EQSAddEquipmentform.get('Availability').value === false && this.EQSAddEquipmentform.get('EqsUnAvailabilityReason').value === null) {
        this._toastr.error('Unavailable Reason is Required');
        return false;
    }
    if (this.EQSAddEquipmentform.get('Availability').value === false && this.EQSAddEquipmentform.get('EqsUnAvailabilityReason').value === '') {
        this._toastr.error('Unavailable Reason is Required');
        return false;
    }
    if( (this.EQSAddEquipmentform.get('EquipmentTypeId').value) == "")
    {
      this._toastr.error('Equipment Name Is Required');
      return false
    }
    return true;
  }
  UpdateEqsMaster() {
    if (this.EQSAddEquipmentform.valid) {
        if (this.ValidateMasterForm()) {
          let EQSImageFile = this.EQSAddEquipmentform.get('Image').value;
            let URSAttachmentList = this.EQSAddEquipmentform.get('URSAttachmet').value;
              let POAttachmentList = this.EQSAddEquipmentform.get('POAttachment').value;
        this._eqsMasterService.UpdateEqsMaster(this.EQSAddEquipmentform.value,EQSImageFile,URSAttachmentList,POAttachmentList).subscribe((res) => {
          if (res['Result']) {
            this.EQSAddEquipmentform.markAsPristine();
            this._toastr.success(res["ResultMessage"]);
            res['Object']['POFiles'].forEach(element => {
              this.POAttachmentList.push(element);
            });
            res['Object']['URSFiles'].forEach(element => {
              this.URSAttachmentList.push(element);
            });
            this.EQSImagePath=res['Object']['EquipmentImage']['AttachmentPath'];
            this.EQSImageName=res['Object']['EquipmentImage']['ImageName'];
            this.moveToTab(this.tabToMove);
            if(this.backToGrid){
                this.routes.navigate(['/eqs-home']);
            }
          }
          else {
            this._toastr.error(res['ResultMessage']);
          }
        });
        }
      }
      else{
          this.formErrorDisplay.showErrors(this.EQSAddEquipmentform);
      }
  }
  openAddModal(content) {
    this.ResetQualificationForm();
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
  openAddMaintenanceModal(content) {
    this.IsMaintenanceEdit = false;
    this.ResetMaintenenceForm();
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
  GetEqsQualificationTypeList() {
    this._eqsMasterService.GetEqsQualificationTypeList().subscribe((data) => {
      this.objEqsQualificationTypeList = data['Object'];
    });
  }
  GetEqsQualification() {
    this._eqsMasterService.GetEqsQualification(this.EQSAddEquipmentform.get('EqsEquipmentId').value).subscribe((data) => {
      this.objEqsQualificationList = data['Object'];
    });
  }
  closeAddParameterModal() {
    this.modalService.dismissAll();
  }
  ValidateCalibration(IsRequired,Frequency) {
    let Res = true;
    if (IsRequired === true && Frequency < 1) {
      Res = false;
    }
    return Res;
  }
  DisableFrequency(evt) {
    this.EQSAddEquipmentform.patchValue({
      EquipmentCalibrationFrequency : null
    })
    this.isFreqDisabled = true;
  }
  EnableFrequency() {
    this.isFreqDisabled = false;
  }
  GetMonthList() {
    this.itemsmonths = this._eqsMasterService.GetMonthList();
  }
  GetMonthsWithNAList() {
    this.itemsmonthsWithNA = this._eqsMasterService.GetMonthsWithNAList();
  }
  GetEqsMaintenanceTypeList() {
    this._eqsMasterService.GetEqsMaintenanceTypeList().subscribe((data) => {
      this.objEqsMaintenanceTypeList = data['Object'];
    });
  }
  GetEqsMaintenenceList() {
    this._eqsMasterService.GetEqsMaintenenceList(this.EQSAddEquipmentform.get('EqsEquipmentId').value).subscribe((data) => {
      this.objEqsMaintenenceList = data['Object'];
    });
  }
  GetCustomHeaderList() {
    this._eqsMasterService.GetCustomHeaderList().subscribe((data) => {
      this.objCustomHeaderList = data['Object'];
    });
  }
  GetDepartmentList() {
    this._eqsMasterService.GetDepartmentList().subscribe((data) => {
      this.objDepartmentList = data['Object'];
    });
  }
  SaveQualification() {
    this.EqsQualificationForm.patchValue({
      EqsEquipmentId:this.EQSAddEquipmentform.get('EqsEquipmentId').value
    });
  if (this.EqsQualificationForm.valid) {
  let fileList = this.EqsQualificationForm.get('AttachmentList').value;
    this._eqsMasterService.SaveEqsQualification(this.EqsQualificationForm.value,fileList).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res['ResultMessage']);
        this.closeAddParameterModal();
        this.GetEqsQualification();
        this.ResetQualificationForm();
      }
      else {
        this._toastr.error(res['ResultMessage']);
      }
    });
  }
  else{
    this.formErrorDisplay.showErrors(this.EqsQualificationForm);
  }
  }
  SaveCalibration() {
    this.EqsCalibrationForm.patchValue({
      EqsEquipmentId: this.EQSAddEquipmentform.get('EqsEquipmentId').value,
    });
      if (this.EqsCalibrationForm.valid) {
        if (this.ValidateCalibration(this.EqsCalibrationForm.get('IsEquipmentCalibrationRequired').value,this.EqsCalibrationForm.get('EquipmentCalibrationFrequency').value)) {
          this._eqsMasterService.SaveEqsCalibration(this.EqsCalibrationForm.value).subscribe(res => {
            if (res['Result']) {
              this._toastr.success(res['ResultMessage']);
                this.EqsCalibrationForm.markAsPristine();
                this.moveToTab(this.tabToMove);
                if(this.backToGrid){
                    this.routes.navigate(['/eqs-home']);
                }
            }
            else {
              this._toastr.error(res['ResultMessage']);
            }
          });
        }
        else {
          this._toastr.warning('Please select Frequency');
        }
      }
      else{
        this.formErrorDisplay.showErrors(this.EqsCalibrationForm);
      }
  }
  SaveMaintenence() {
    this.EqsMaintenenceForm.patchValue({
      EqsEquipmentId: this.EQSAddEquipmentform.get('EqsEquipmentId').value,
    });
      if (this.EqsMaintenenceForm.valid) {
        this._eqsMasterService.SaveMaintenence(this.EqsMaintenenceForm.value).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetEqsMaintenenceList();
            this.ResetMaintenenceForm();
            this.closeAddParameterModal();
          }
          else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      }
      else{
        this.formErrorDisplay.showErrors(this.EqsMaintenenceForm);
      }
  }
  moveToTab(tabId) {
  this.tabset.select(tabId);
  }
  tabChanged(event) {
    this.tabToMove = event.nextId;
    switch (event.activeId) {
      case 'tab-Master':
      if(this.EQSAddEquipmentform.dirty){
        event.preventDefault();
        this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
          if (result) {
            this.addEqsMaster();
          } else {
            this.EQSAddEquipmentform.markAsPristine();
            this.tabset.select(this.tabToMove);
          }
        });
      }
        break;
      case 'tab-Calibration':
      if(this.EqsCalibrationForm.dirty){
        event.preventDefault();
        this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
          if (result) {
            this.SaveCalibration();
          } else {
            this.EqsCalibrationForm.markAsPristine();
            this.tabset.select(this.tabToMove);
          }
        });
      }
        break;
      default:
        console.log("switch case else part!");
        break;
    }
//Load data on the Tab change
    switch (event.nextId){
        case 'tab-Qualification':
        if (this.EQSAddEquipmentform.get('EqsEquipmentId').value > 0) {
          this.GetEqsQualification();
        }
        break;
      case 'tab-Maintenance':
      if (this.EQSAddEquipmentform.get('EqsEquipmentId').value > 0) {
        this.GetEqsMaintenenceList();
      }
        break;
        case 'tab-CustomHeader':
      if (this.EQSAddEquipmentform.get('EqsEquipmentId').value > 0) {
        this.GetCustomHeaderDetails();
      }else{
        this.GetCustomHeaderList();
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
  SetHeaderList(event,data) {
    // if (data.CustomHeaderValue!=null || data.CustomHeaderValue!='') {
      const items = this.objCustomHeaderList.filter(item => item['CustomHeaderMasterId'] == data.CustomHeaderMasterId);
      const index = this.objCustomHeaderList.findIndex(item => item['CustomHeaderMasterId'] == data.CustomHeaderMasterId);
      this.objCustomHeaderList[index]['CustomHeaderValue']=data.CustomHeaderValue;
      this.objCustomHeaderList[index]['EqsEquipmentId']=this.EQSAddEquipmentform.get('EqsEquipmentId').value;
    // }
  }
  SaveCustomHeader(){
    this._eqsMasterService.SaveCustomHeader(this.objCustomHeaderList).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res['ResultMessage']);
      } else {
        this._toastr.error(res['ResultMessage']);
      }
    });
  }
  public onQualificationFileSelect: EmitType<Object> = (args: any) => {
    args.filesData.forEach(file => {
      (this.EqsQualificationForm.controls.AttachmentList as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });
  }
  public onImageFileSelect: EmitType<Object> = (args: any) => {
    this.EQSAddEquipmentform.patchValue({
      Image: args.filesData[0].rawFile
    });
  }
  public onURSFileSelect: EmitType<Object> = (args: any) => {
    args.filesData.forEach(file => {
      (this.EQSAddEquipmentform.controls.POAttachment as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });
  }
  public onPOFileSelect: EmitType<Object> = (args: any) => {
    args.filesData.forEach(file => {
      (this.EQSAddEquipmentform.controls.URSAttachmet as FormArray).push(this.formBuilder.group({
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
    let restrictedPath ="EQSQualification/Equip_" + this.EqsEquipmentId + "/" + this.EqsQualificationTypeName ;
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
  beforeSendDocument(args) {
    // Get the value of Dropdownlist.
    let restrictedPath ="EQSMaster/Equip_" + this.EQSAddEquipmentform.get('EqsEquipmentId').value + "/Documents"   ;
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
        }else if (args["action"] == 'copy') {
          data["targetPath"] = restrictedPath + data["targetPath"];
        }
      }
      args.ajaxSettings.data = JSON.stringify(data);
    }
}
  // event for custom toolbar item

  editMaintenance(args: CommandClickEventArgs): void {
    this._eqsMasterService
      .GetMaintenenceDetails(args["rowData"]["EqsMaintenenceTypeFrequencyId"])
      .subscribe((data) => {
        const ObjectMaintenanceDetail = data["Object"] as EqsMaintenence;
        console.log(ObjectMaintenanceDetail);
        if (ObjectMaintenanceDetail != null) {
          this.EqsMaintenenceForm.patchValue({
            EqsMaintenenceTypeFrequencyId: ObjectMaintenanceDetail.EqsMaintenenceTypeFrequencyId,
            EqsEquipmentId: ObjectMaintenanceDetail.EqsEquipmentId,
            MaintenenceTypeMasterId:ObjectMaintenanceDetail.MaintenenceTypeMasterId,
            FrequencyInMonth:ObjectMaintenanceDetail.FrequencyInMonth,
            MaintenenceTypeName :ObjectMaintenanceDetail.MaintenenceTypeName

          });
          this.IsMaintenanceEdit = true;
        } else {
          this.EqsMaintenenceForm.patchValue({
            EqsMaintenenceTypeFrequencyId:null,
            EqsEquipmentId: null,
            MaintenenceTypeMasterId:null,
            FrequencyInMonth:null,
            MaintenenceTypeName :null
          });
        }
        console.log('edit time',this.EqsMaintenenceForm.get('FrequencyInMonth').value);
        this.FrequencyMonth= this.EqsMaintenenceForm.get('FrequencyInMonth').value;
      });
  }


}
