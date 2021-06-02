import { Component, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine } from '@syncfusion/ej2-angular-grids';
import { ServiceService } from '../service.service';
import { LoginService } from 'src/app/login/Service/login.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { debounce } from 'lodash';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { environment } from 'src/environments/environment';
import { EmitType } from '@syncfusion/ej2-base';
import { UploaderComponent, SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
@Component({
  selector: 'app-raise-new-request',
  templateUrl: './raise-new-request.component.html',
  styleUrls: ['./raise-new-request.component.css']
})
export class RaiseNewRequestComponent {
  @ViewChild('tabset', { static: true }) tabset;
  @ViewChild('dropdown', { static: true }) drpdwn;
  public dropdownObject: DropDownListComponent;
  @ViewChild('defaultupload', { static: true }) FileUploaded;
  public FileUpload: UploaderComponent;


  public dateValue: Date = new Date();
  public todaysdate;
  EQMSAddRequisitionDetailsform: FormGroup;
  EQMSFirstAddApprovalStatusform: FormGroup;
  EQMSSecondAddApprovalStatusform: FormGroup;
  public UserInfo: object = {};
  public UserId;
  @ViewChild('sample', { static: true })
  public listObj: DropDownListComponent;
  @ViewChild('ddlelement', { static: true })
  public dropDownListObject: DropDownListComponent;
  public objGetCcRelatedToReasonList: Object[];
  public objGetMediumForChangeList: Object[];
  public objDepartmentList: Object[];
  public objRequesterDepartmentList: Object[];
  public objIcsInstrumentIdList: Object[];
  public objMediumIdList: Object[];
  public objEqsEquipmentIdList: Object[];
  public objIdList: Object[];
  public ObjChangeControlData: Object[];
  public ObjReqApprovalData: Object[];
  public ChangeControlNumberId;
  private tabToMove: string = '';
  public EqmsCcRequisitionId;
  public EqmsCcMediumForChangeId;
  public strFirstLevelApprovalStatus: string = "Not Initiated";
  public strSecondLevelApprovalStatus: string = "Not Initiated";
  public boolFirstlvlApproval: boolean = false;
  public boolSecondlvlApproval: boolean = false;
  public IfFirstlvlApproval: boolean = false;
  public IfSecondlvlApproval: boolean = false;
  public strFirstLevelApprovalName;
  public strSecondLevelApprovalName;
  public strFirstLevelCommenttext;
  public strSecondLevelCommenttext;
  //For Read Only forms
  public IfReadOnly: boolean = true;
  public ChangeControlNumber;
  public date;
  public EqmsCcRelatedToName;
  public RequesterDeptName;
  public RequesterDeptId;
  public MediumforChange;
  public DepartmentName;
  public MediumName;
  public AttachmentIfAny;
  public DetailsIfOthers;
  public DocumentTitle;
  public BrifDescriptionOfChanges;
  public InitiatedBy;





  public fields: Object = { text: 'Name', value: 'Id' };


  public height: string = '220px';
  public waterMark: string = 'Select';
  public data: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public ddParams: IEditCell;
  public lines: GridLine;
  public DisplayMediumIdList: boolean = true;
  public NgifForEdit: boolean = true;

  //To editable form Suvinay
  public editable: boolean = false;
  public IfSaveBtn: boolean = true;
  public IfEditBtn: boolean = true;
  public IfNextBtn: boolean = false;
  public IfSecondlvlSubmitbtn: boolean = true;
  public IfFirstlvlSubmitbtn: boolean = true;

  public IfSignAndSubmitBtn: boolean = true;
  public IfOtherDetails: boolean = false;
  public value: string = 'Game3';
  closeResult: string;
  public restrictedPath: string;
  public ajaxSettings: AjaxSettingsModel;
  public _restApi = environment.apiUrl + '/FileManager/';
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
  public toolbarSettings: object;
  public uploadSettings: object;
  public AttachmentList: object[];
  constructor(private formErrorDisplay: FormErrorDisplayService, private modalService: NgbModal, private _EqmsChangeControl: ServiceService
    , private loginService: LoginService, private _toastr: ToastrService, private formBuilder: FormBuilder
    , private confirmationDialogService: ConfirmationDialogService, private router: ActivatedRoute, private routerTo: Router) { }

  async ngOnInit() {
    debugger;

    await this.getUserInfo();
    await this.GetCcRelatedToReasonList();
    await this.GetMediumForChangeList();
    await this.GetDepartmentList();
    await this.GetInstrumentList();
    await this.GetEquipmentList();
    await this.initFileManager();
    await this.setForm();
    await this.resetForm();

    await this.router.data.subscribe(data => {
      let Action = data.urls[3]["title"];
      if (Action == "Edit Request") {
        this.NgifForEdit = true;
        var paramsId = this.router.params['value']['id'];
        // if(paramsId==null)   {
        //   paramsId = this._EqmsChangeControl.getOptionEditRow();
        // }

        if (paramsId == "") {
          this.routerTo.navigateByUrl('/change-control');
        }
        this.GetData(paramsId);
      } else {
        this.IfReadOnly = false;
        this.IfEditBtn = false;
        this.NgifForEdit = false;
        this.GetControlNumber();
      }
    })

    //Suvinay



    //  this.addEqmsRequisitionDetails();
    this.todaysdate = new Date();
    console.log('todaysdate', this.todaysdate);
    this.date = new Date(this.todaysdate).toLocaleDateString();
    this.data = [
      {
        ChooseAction: 'Rework',
        Comment: 'Change Occur in versions.'
      },
      {
        ChooseAction: 'Rejected',
        Comment: ' Not in loop'
      },
      {
        ChooseAction: 'Approved',
        Comment: ' Done'
      }
    ];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.ddParams = { params: { value: 'Rework' } };
    this.ddParams = { params: { value: 'Rejected' } };
    this.ddParams = { params: { value: 'Approved' } };
    this.lines = 'Both';
  }

  async GetData(Rowdata) {
    debugger;
    await this._EqmsChangeControl.GetChangeControlListonEqmsCcRequisitionId(Rowdata).subscribe((data2) => {
      this.ObjChangeControlData = data2['Object'];
      console.log(this.ObjChangeControlData);
      if (this.UserId != this.ObjChangeControlData[0]['UserId']) {
        this.editable = true;
        this.IfSaveBtn = false;
        this.IfEditBtn = false;
        this.IfSignAndSubmitBtn = false;
      }
      else {
        this.IfSaveBtn = false;
        this.IfEditBtn = true;
        this.IfSignAndSubmitBtn = false;
      }
      this.ChangeControlNumber = this.ObjChangeControlData[0]['EqmsCcChangeControlNumber'];
      this._EqmsChangeControl.setOption('GetChangeControlNumber', this.ChangeControlNumber);
      this._EqmsChangeControl.setOption('GetEqmsCcChangeControlNumId', this.ObjChangeControlData[0]['EqmsCcChangeControlNumberId']);
      this._EqmsChangeControl.setOption('AlowedForEdit', this.ObjChangeControlData[0]['UserId']);
      this.EqmsCcMediumForChangeId = this.ObjChangeControlData[0]['EqmsCcMediumForChangeId'];

      this.date = this.ObjChangeControlData[0]['EqmsCcInitiatedDate'];
      this.EqmsCcRelatedToName = this.ObjChangeControlData[0]['EqmsCcRelatedTo'];
      this.RequesterDeptName = this.ObjChangeControlData[0]['RequesterDepartment'];
      this.MediumforChange = this.ObjChangeControlData[0]['EqmsCcMediumForChange'];
      this.DepartmentName = this.ObjChangeControlData[0]['DepartmentName'];
      this.MediumName = this.ObjChangeControlData[0]['EqmsCcMediumId'];
      this.AttachmentIfAny = this.ObjChangeControlData[0]['EqmsCcAttachment'];
      this.DetailsIfOthers = this.ObjChangeControlData[0]['EqmsCcdetailsIfOthers'];
      this.DocumentTitle = this.ObjChangeControlData[0]['EqmsCcDocumentTitle'];
      this.BrifDescriptionOfChanges = this.ObjChangeControlData[0]['EqmsCcBriefDescription'];
      this.InitiatedBy = this.ObjChangeControlData[0]['UName'];
      //var fieldObject = this.EQMSAddRequisitionDetailsform.controls.EqmsCcMediumId.value
      // var res =this.EQMSAddRequisitionDetailsform.controls.EqmsCcMediumId.setValue('contact');
      // console.log('ssssssssssssssssssssssssssssssssss   '+fieldObject+"    "+res);
      this.GetSelectedTypeId2(this.EqmsCcMediumForChangeId, this.ObjChangeControlData[0]['EqmsCcMediumId']);
      if (this.ObjChangeControlData != null) {
        this.GetMediumForChangeList();
        if (this.ObjChangeControlData[0]['EqmsCcMediumForChangeId'] == 9)
          this.IfOtherDetails = true;
        this.EqmsCcRequisitionId = this.ObjChangeControlData[0]['EqmsCcRequisitionId'];
        this.ChangeControlNumberId = this.ObjChangeControlData[0]['EqmsCcChangeControlNumberId'];
        this.GetApprovalData(this.ChangeControlNumberId);
      }
      else {

        this.EQMSAddRequisitionDetailsform.patchValue({
          StorageLocationId: null,
          StorageLocationName: null,
        });
      }
    });

  }
  GetApprovalData(CCNumId) {

    this._EqmsChangeControl.GetRequisitioAapprovalData(CCNumId, this.UserId).subscribe((data2) => {
      this.ObjReqApprovalData = data2['Object'];
      console.log(this.ObjReqApprovalData);
      console.log(this.UserId);
      this.strFirstLevelApprovalStatus = this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovalStatus"];
      this.strSecondLevelApprovalStatus = this.ObjReqApprovalData[0]["EqmsCcSecondLvlApprovalStatus"];

      if (this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovarName"] != null)
        this.strFirstLevelApprovalName = "By " + this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovarName"] + " on " + new Date(this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovalTime"]);

      if (this.ObjReqApprovalData[0]["EqmsCcSecondLvlApprovarName"] != null)
        this.strSecondLevelApprovalName = "By " + this.ObjReqApprovalData[0]["EqmsCcSecondLvlApprovarName"] + " on " + new Date(this.ObjReqApprovalData[0]["EqmsCcSecondLvlApprovalTime"]);

      if (this.ObjReqApprovalData[0]["EqmsCcFirstLvlComment"] != null)
        this.strFirstLevelCommenttext = "Comments: " + this.ObjReqApprovalData[0]["EqmsCcFirstLvlComment"];

      if (this.ObjReqApprovalData[0]["EqmsCcSecondLvlComment"] != null)
        this.strSecondLevelCommenttext = "Comments: " + this.ObjReqApprovalData[0]["EqmsCcSecondLvlComment"];

      if (this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovarPos"] == "HOD") {
        if (this.UserId == this.ObjReqApprovalData[0]["HOD"]) {
          this.IfFirstlvlApproval = true;
        }
      }
      if (this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovarPos"] == "SkipFirst") {

      }
      if (this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovarPos"] == "Designee") {
        if (this.ObjReqApprovalData[0]["Designee"]) {
          this.IfFirstlvlApproval = true;
        }
      }
      if (this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovarPos"] == "Lead") {
        if (this.UserId == this.ObjReqApprovalData[0]["LeadForUser"]) {
          this.IfFirstlvlApproval = true;
        }
      }

      if (this.ObjReqApprovalData[0]["EqmsCcSecondLvlApprovarPos"] == "QAHead") {
        if (this.UserId == this.ObjReqApprovalData[0]["QAHead"]) {
          this.IfSecondlvlApproval = true;
        }
      }
      if (this.ObjReqApprovalData[0]["EqmsCcSecondLvlApprovarPos"] == "Designee") {
        if (this.ObjReqApprovalData[0]["Designee"]) {
          this.IfSecondlvlApproval = true;
        }
      }

      if (this.strFirstLevelApprovalStatus == "Approved" && this.strSecondLevelApprovalStatus == "Approved") {
        this.IfEditBtn = false;
        this.IfNextBtn = true;
      }
      else if (this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovalStatus"] == "Rework Required" || this.ObjReqApprovalData[0]["EqmsCcSecondLvlApprovalStatus"] == "Rework Required") {
        this.IfEditBtn = true;
      }
      else {
        this.IfEditBtn = false;
      }
      if (this.ObjReqApprovalData[0]["EqmsCcFirstLvlApprovalStatus"] == "Approved") {
        this.boolFirstlvlApproval = true;
        this.IfFirstlvlApproval = false;
      }
      else {
        this.boolFirstlvlApproval = false;
      }
      if (this.ObjReqApprovalData[0]["EqmsCcSecondLvlApprovalStatus"] == "Approved") {
        this.boolSecondlvlApproval = true;
        this.IfSecondlvlApproval = false;
      }
      else {
        this.boolSecondlvlApproval = false;
      }
    });


  }
  setForm() {

    this.EQMSAddRequisitionDetailsform = this.formBuilder.group({
      EqmsCcRequisitionId: [''],
      EqmsCcChangeControlNumberId: [''],
      EqmsCcChangeControlNumber: [''],
      EqmsCcRelatedToId: ['', Validators.required],
      EqmsCcMediumForChangeId: ['', Validators.required],
      DepartmentId: ['', Validators.required],
      EqmsCcDocumentTitle: ['', Validators.required],
      EqmsCcBriefDescription: ['', Validators.required],
      EqmsCcMediumId: [''],
      EqmsCcInitiatedDate: [''],
      EqmsCcMedium: [''],
      UserId: [''],
      UName: [''],
      EqmsCcAttachment: [''],
      EqmsCcdetailsIfOthers: [''],
      RequesterDepartmentId: ['', Validators.required],
      ForSignAndSubmit: [''],
      AttachmentList: new FormArray([])
    });
    this.EQMSFirstAddApprovalStatusform = this.formBuilder.group({
      EqmsCcChangeControlNumberId: [''],
      EqmsCcFirstLvlApprovar: [''],
      EqmsCcFirstLvlComment: ['', Validators.required],
      EqmsCcFirstLvlApprovalStatus: ['', Validators.required],
    });
    this.EQMSSecondAddApprovalStatusform = this.formBuilder.group({
      EqmsCcChangeControlNumberId: [''],
      EqmsCcSecondLvlApprovar: [''],
      EqmsCcSecondLvlComment: ['', Validators.required],
      EqmsCcSecondLvlApprovalStatus: ['', Validators.required],
    });
  }


  resetForm() {
    this.EQMSAddRequisitionDetailsform.reset();
    this.AttachmentList = [];
  }




  GetCcRelatedToReasonList() {
    this._EqmsChangeControl.GetCcRelatedToReasonList().subscribe((data) => {
      this.objGetCcRelatedToReasonList = data['Object'];
    });
  }

  GetDepartmentList() {
    this._EqmsChangeControl.GetDepartmentList().subscribe((data) => {
      this.objDepartmentList = data['Object'];
    });
  }
  GetRequesterDepartmentList() {
    debugger;
    this._EqmsChangeControl.GetRequesterDepartmentList(this.UserId).subscribe((data) => {
      this.objRequesterDepartmentList = data['Object'];
      var DefDept = this.objRequesterDepartmentList[0]["Id"];
      if (this.objRequesterDepartmentList.length < 1) {
        this.EQMSAddRequisitionDetailsform.patchValue({
          RequesterDepartmentId: DefDept,
        });
      }
    });
  }
  GetMediumForChangeList() {
    this._EqmsChangeControl.GetMediumForChangeList().subscribe((data) => {
      this.objGetMediumForChangeList = data['Object'];
    });
  }

  GetInstrumentList() {
    this._EqmsChangeControl.GetInstrumentList().subscribe((data) => {
      this.objIcsInstrumentIdList = data['Object'];
      //  console.log(this.objIcsInstrumentIdList);
    });
  }
  GetEquipmentList() {
    this._EqmsChangeControl.GetEquipmentList1().subscribe((data) => {
      this.objEqsEquipmentIdList = data['Object'];
      console.log(this.objEqsEquipmentIdList);
    });
  }
  GetControlNumber() {

    this._EqmsChangeControl.GetControlNumber().subscribe((data) => {
      this.ChangeControlNumber = data['Object'];
      console.log(this.ChangeControlNumber)


    });
  }
  GetSelectedTypeId2(EqmsCcMediumForChangeId, MediumId) {
    this.DisplayMediumIdList = true;
    if (EqmsCcMediumForChangeId === 8) {
      this.objMediumIdList = this.objIcsInstrumentIdList;
      var result = this.objMediumIdList.find(o => o["Name"] === MediumId);
      this.EQMSAddRequisitionDetailsform.patchValue({
        EqmsCcMediumId: result["Id"]
      });
    } else if (EqmsCcMediumForChangeId === 7) {
      this.objMediumIdList = this.objEqsEquipmentIdList;
      var result = this.objMediumIdList.find(o => o["Name"] === MediumId);
      this.EQMSAddRequisitionDetailsform.patchValue({
        EqmsCcMediumId: result["Id"]
      });
    } else {
      this.objMediumIdList = [];
      this.DisplayMediumIdList = false;

    }
  }
  GetSelectedTypeId(EqmsCcMediumForChangeId) {
    debugger;
    this.DisplayMediumIdList = true;
    this.IfOtherDetails = false;
    if (EqmsCcMediumForChangeId.itemData.Name === "Instrument") {
      this.objMediumIdList = this.objIcsInstrumentIdList;
    } else if (EqmsCcMediumForChangeId.itemData.Name === "Equipment") {
      this.objMediumIdList = this.objEqsEquipmentIdList;
    } else if (EqmsCcMediumForChangeId.itemData.Name === "Others") {
      this.IfOtherDetails = true;
      this.DisplayMediumIdList = false;
    }
    else {
      this.objMediumIdList = [];
      this.DisplayMediumIdList = false;

    }

  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    // this.MaintenanceFormGrp.patchValue({
    //   Attachment: args.filesData[0].rawFile
    // });
    args.filesData.forEach(file => {
      (this.EQMSAddRequisitionDetailsform.controls.AttachmentList as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });

  }
  public onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {
      console.log('File uploaded successfully');
    }
  }
  public onUploadFailure(args: any): void {
    console.log('File failed to upload');
  }

  async SignFirstleval() {
    if (this.EQMSFirstAddApprovalStatusform.valid) {


      debugger;
      this.EQMSFirstAddApprovalStatusform.patchValue({
        EqmsCcFirstLvlApprovar: this.UserId,
        EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
      });
      await this._EqmsChangeControl.SaveFirstLevelSign(this.EQMSFirstAddApprovalStatusform.value).subscribe(res => {

        if (res['Result']) {
          this.EqmsCcRequisitionId = res['Object'];
          debugger;
          this._toastr.success(res["Object"]["ResultMessage"]);
          this.GetApprovalData(this.ChangeControlNumberId);
          this.IfFirstlvlApproval = false;
          this.IfFirstlvlSubmitbtn = false;
        } else {
          this._toastr.error(res["Object"]["ResultMessage"]);
        }
      }

      );
    } else {
      this.formErrorDisplay.showErrors(this.EQMSFirstAddApprovalStatusform);
    }
  }
  async SignSecondleval() {
    if (this.EQMSSecondAddApprovalStatusform.valid) {

      this.EQMSSecondAddApprovalStatusform.patchValue({
        EqmsCcSecondLvlApprovar: this.UserId,
        EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
      });
      await this._EqmsChangeControl.SaveSecondLevelSign(this.EQMSSecondAddApprovalStatusform.value).subscribe(res => {

        if (res['Result']) {
          this.EqmsCcRequisitionId = res['Object'];
          debugger;
          this._toastr.success(res["Object"]["ResultMessage"]);
          this.GetApprovalData(this.ChangeControlNumberId);
          this.IfFirstlvlApproval = false;
          this.IfSecondlvlSubmitbtn = false;
        } else {
          this._toastr.error(res["Object"]["ResultMessage"]);
        }
      }

      );
    } else {
      this.formErrorDisplay.showErrors(this.EQMSSecondAddApprovalStatusform);
    }
  }
  async EditEqmsCCRequisitionDetail() {

    this.EQMSAddRequisitionDetailsform.get("EqmsCcRequisitionId").setValue(this.ObjChangeControlData[0]['EqmsCcRequisitionId']);
    this.EQMSAddRequisitionDetailsform.get("EqmsCcRelatedToId").setValue(this.ObjChangeControlData[0]['EqmsCcRelatedToId']);
    this.EQMSAddRequisitionDetailsform.get("DepartmentId").setValue(this.ObjChangeControlData[0]['DepartmentId']);
    this.EQMSAddRequisitionDetailsform.get("EqmsCcMediumForChangeId").setValue(this.ObjChangeControlData[0]['EqmsCcMediumForChangeId']);
    this.EQMSAddRequisitionDetailsform.get("EqmsCcDocumentTitle").setValue(this.ObjChangeControlData[0]['EqmsCcDocumentTitle']);
    this.EQMSAddRequisitionDetailsform.get("EqmsCcBriefDescription").setValue(this.ObjChangeControlData[0]['EqmsCcBriefDescription']);
    this.EQMSAddRequisitionDetailsform.get("EqmsCcChangeControlNumberId").setValue(this.ObjChangeControlData[0]['EqmsCcChangeControlNumberId']);
    this.EQMSAddRequisitionDetailsform.get("RequesterDepartmentId").setValue(this.ObjChangeControlData[0]['RequesterDepartmentId']);
    this.EQMSAddRequisitionDetailsform.get("EqmsCcdetailsIfOthers").setValue(this.ObjChangeControlData[0]['EqmsCcdetailsIfOthers']);
    this.IfReadOnly = false;
    this.IfSaveBtn = true;
    this.IfSignAndSubmitBtn = true;
    this.IfEditBtn = false;
  }
  GetIsQAHeadOrDes(UserId, CCNumId) {
    debugger;
    this._EqmsChangeControl.GetIsQAHeadOrDes(UserId, CCNumId).subscribe((data) => {
      var UserRole = data['Object'];
      return UserRole;
    });
  }





  async addEqmsCCRequisitionDetail() {
    debugger;
    if (this.EQMSAddRequisitionDetailsform.valid) {
      if (this.NgifForEdit) {
        this.EQMSAddRequisitionDetailsform.patchValue({
          EqmsCcChangeControlNumber: this.ChangeControlNumber,
          UserId: this.UserId,
          UName: this.UserInfo["UserFullName"],
        });
        let fileList = this.EQMSAddRequisitionDetailsform.get('AttachmentList').value;
        if (fileList["length"] > 0) {
          this.EQMSAddRequisitionDetailsform.patchValue({
            EqmsCcAttachment: true,
          });
        }
        await this._EqmsChangeControl.UpdateCcRequisitionDetails(this.EQMSAddRequisitionDetailsform.value, fileList).subscribe(res => {

          if (res['Result']) {
            this.EqmsCcRequisitionId = res['Object'];
            debugger;
            this._toastr.success(res["Object"]["ResultMessage"]);
            this.AttachmentList = [];
            this.FileUpload.remove();
            this.GetApprovalData(this.ChangeControlNumberId);
          } else {
            this._toastr.error(res["Object"]["ResultMessage"]);
          }
        }

        );
      }
      else {

        this.EQMSAddRequisitionDetailsform.patchValue({
          EqmsCcChangeControlNumber: this.ChangeControlNumber,
          EqmsCcInitiatedDate: this.todaysdate,
          UserId: this.UserId,
          UName: this.UserInfo["UserFullName"],
          EqmsCcRequisitionId: 0,
          EqmsCcChangeControlNumberId: 0,

        });
        let fileList = this.EQMSAddRequisitionDetailsform.get('AttachmentList').value;
        if (fileList["length"] > 0) {
          this.EQMSAddRequisitionDetailsform.patchValue({
            EqmsCcAttachment: true,
          });
        }
        await this._EqmsChangeControl.SaveRequisitionDetails(this.EQMSAddRequisitionDetailsform.value, fileList).subscribe(res => {

          if (res['Result']) {
            this.EqmsCcRequisitionId = res['Object'];
            debugger;
            this._toastr.success(res["Object"]["ResultMessage"]);
            this.AttachmentList = [];
            this.FileUpload.remove();
            this.NgifForEdit = true;
            this.GetApprovalData(this.ChangeControlNumberId);
          } else {
            this._toastr.error(res["Object"]["ResultMessage"]);
          }
        }

        );
      }
    } else {
      this.formErrorDisplay.showErrors(this.EQMSAddRequisitionDetailsform);
    }
  }


  async submitCcUserSign() {
    this.EQMSAddRequisitionDetailsform.patchValue({
      ForSignAndSubmit: 'Submit'
    });
    await this.addEqmsCCRequisitionDetail();
    this.IfSaveBtn = false;
    this.IfSignAndSubmitBtn = false;
    this.IfEditBtn = false;
    this.editable = true;
    this.strFirstLevelApprovalStatus = "Pending";
    this.strSecondLevelApprovalStatus = "Pending";
    this.boolFirstlvlApproval = false;
    this.boolSecondlvlApproval = false;

  }

  moveToTab(tabId) {
    this.tabset.select(tabId);
  }
  /*  tabChanged(event) {
     this.tabToMove = event.nextId;
     switch (event.activeId) {
       case 'tab--requisition-details':
         if (this.EQMSAddRequisitionDetailsform.dirty) {
           event.preventDefault();
           this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
             if (result) {
               this.addEqmsRequisitionDetails();
             } else {
               this.EQMSAddRequisitionDetailsform.markAsPristine();
               this.tabset.select(this.tabToMove);
             }
           });
         }
         break;
       case 'tab-selectbyid2': */
  // if(this.calibrationForm.dirty){
  //   event.preventDefault();
  //   this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
  //     if (result) {
  //       this.SaveCalibration();
  //     } else {
  //       this.calibrationForm.markAsPristine();
  //       this.tabset.select(this.tabToMove);
  //     }
  //   });
  // }

  /*   break;

  default:
    console.log("switch case else part!");
    break;
}


} */
  async ngAfterViewInit() {
    await this.getUserInfo();
  };
  async getUserInfo() {
    await this.loginService.getUserBasicInfo().subscribe((data) => {
      localStorage.setItem('LoginUser', JSON.stringify(data['Object']));
      this.UserInfo = JSON.parse(localStorage.getItem('LoginUser'));
      this.UserId = this.UserInfo['UserID'];
      console.log("UserID", this.UserId);
      this.GetRequesterDepartmentList();
      //this.RequesterDeptName=this.objRequesterDepartmentList.find(o => o["Id"] === this.RequesterDeptId);
    });
  }

  ///For File
  openAddModal(content3) {
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
  closeAddParameterModal() {
    this.modalService.dismissAll();
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
  initFileManager() {
    this.ajaxSettings = {
      url: this._restApi + "FileOperations",
      getImageUrl: this._restApi + "GetImage",
      uploadUrl: this._restApi + "Upload",
      downloadUrl: this._restApi + "Download",
    };
    this.searchSettings = {
      allowSearchOnTyping: false,
    };
    this.navigationPaneSettings = environment.navigationPaneSettings;
    this.contextMenuSettings = environment.contextMenuSettings;
    this.toolbarSettings = environment.toolbarSettings;
  }
  beforeSend(args) {
    // Get the value of Dropdownlist.
    this.restrictedPath = "Eqms/CC/RequisitionDetails/CC_" + this.ChangeControlNumberId + "/RD_" + this.EqmsCcRequisitionId + "";
    if (
      args["name"] == "beforeImageLoad" &&

      args["imageUrl"].indexOf(this.restrictedPath) == -1
    ) {
      let indexOfPath = args["imageUrl"].indexOf("path=") + 5;
      args["imageUrl"] =
        args["imageUrl"].substring(0, indexOfPath) +
        this.restrictedPath +
        args["imageUrl"].substring(indexOfPath);
    } else if (args.name == "beforeDownload") {
      if (args.data["path"].indexOf(this.restrictedPath) == -1) {
        args.data["path"] = this.restrictedPath + args.data["path"];
      }
    } else {
      var data = JSON.parse(args.ajaxSettings.data);
      if (args["action"] == "Upload") {
        // args.preventDefault();
        args.cancel = true;
        if (data[0]["path"].indexOf(this.restrictedPath) == -1) {
          data[0]["path"] = this.restrictedPath + data[0]["path"];
        }
      } else if (data["path"].indexOf(this.restrictedPath) == -1) {
        data["path"] = this.restrictedPath + data["path"];
        if (args["action"] == 'move') {
          data["targetPath"] = this.restrictedPath + data["targetPath"];
        } else if (args["action"] == 'copy') {
          data["targetPath"] = this.restrictedPath + data["targetPath"];
        }
      }
      args.ajaxSettings.data = JSON.stringify(data);
    }
  }


}
