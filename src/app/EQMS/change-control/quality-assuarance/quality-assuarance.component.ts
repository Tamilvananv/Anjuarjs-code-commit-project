import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine } from '@syncfusion/ej2-angular-grids';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { alphaNumericValidatorExtension } from '@rxweb/reactive-form-validators/validators-extension';
import { RaiseNewRequestComponent } from '../raise-new-request/raise-new-request.component';
import { LoginService } from 'src/app/login/Service/login.service';
@Component({
  selector: 'app-quality-assuarance',
  templateUrl: './quality-assuarance.component.html',
  styleUrls: ['./quality-assuarance.component.css']
})
export class QualityAssuaranceComponent implements OnInit {
  @ViewChild('sample', { static: true })
  public listObj: DropDownListComponent;
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public ddParams: IEditCell;
  public ddParams1: IEditCell;
  public deptlist: IEditCell;
  public action: IEditCell;
  public lines: GridLine;
  public fields0: Object = { text: 'dept', value: 'Id' };
  public ReasonData: Object[] = [
    { Id: false, reason: 'Non-Satisfactory', },
    { Id: true, reason: 'Satisfactory' }
  ];
  public fields1: Object = { text: 'reason', value: 'Id' };
  EQMSAddQualityAssuaranceformData: FormGroup;
  public ChangeControlNumberId;
  public ChangeControlNumber;
  public ChangeControlInfo: object = {};
  public strFirstLevelApprovalStatus: string = "Not Initiated";
  public strSecondLevelApprovalStatus: string = "Not Initiated";
  EQMSFirstAddApprovalStatusform: FormGroup;
  EQMSSecondAddApprovalStatusform: FormGroup;
  public boolFirstlvlApproval: boolean = false;
  public boolSecondlvlApproval: boolean = false;
  public IfFirstlvlApproval: boolean = false;
  public IfSecondlvlApproval: boolean = false;
  public strFirstLevelApprovalName;
  public strSecondLevelApprovalName;
  public strFirstLevelCommenttext;
  public strSecondLevelCommenttext;
  public ObjReqApprovalData: Object[];
  public IfSaveBtn: boolean = true;
  public IfEditBtn: boolean = true;
  public IfNextBtn: boolean = false;
  public IfSignAndSubmitBtn: boolean = true;
  public IfSecondlvlSubmitbtn: boolean = true;
  public IfFirstlvlSubmitbtn: boolean = true;
  public UserInfo: object = {};
  public UserId;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private RNRequest: RaiseNewRequestComponent, private _EqmsChangeControl: ServiceService, private _toastr: ToastrService) { }

  async ngOnInit() {
    await this.getUserInfo();
    this.data1 = [
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        EmpList: 'Siddhi',
        ChooseAction: 'Approved',
        Comments: 'Change Occur in versions.',
      },
    ];

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.deptlist = { params: { value: 'Shruti' } };
    this.action = { params: { value: 'Rework' } };
    this.lines = 'Both';
    this.setForm();
    this.resetForm();
    this.getChangeControlNumberValue();
    this.getddQualityAssuaranceList();
  }
  setForm() {

    this.EQMSAddQualityAssuaranceformData = this.formBuilder.group({
      EqmsCcChangeControlNumberId: ['', Validators.required],
      EqmsCcQualityAssuaranceLableId: [''],
      EqmsCcQualityAssuaranceStatus: [''],
      EqmsCcQualityAssuaranceComents: [''],

      EqmsCcQualityAssuaranceId: [''],
      EqmsCcQualityAssuaranceLableId1: [''],
      EqmsCcQualityAssuaranceStatus1: [''],
      EqmsCcQualityAssuaranceComents1: [''],

      EqmsCcQualityAssuaranceLableId2: [''],
      EqmsCcQualityAssuaranceStatus2: [''],
      EqmsCcQualityAssuaranceComents2: [''],

      EqmsCcQualityAssuaranceLableId3: [''],
      EqmsCcQualityAssuaranceStatus3: [''],
      EqmsCcQualityAssuaranceComents3: [''],

      EqmsCcQualityAssuaranceLableId4: [''],
      EqmsCcQualityAssuaranceStatus4: [''],
      EqmsCcQualityAssuaranceComents4: [''],

      ForSignAndSubmit: [''],
      UserId: [''],

    });
    this.EQMSFirstAddApprovalStatusform = this.formBuilder.group({
      EqmsCcChangeControlNumberId: [''],
      EqmsCcFirstLvlApprovar: [''],
      EqmsCcFirstLvlComment: [''],
      EqmsCcFirstLvlApprovalStatus: [''],
    });
    this.EQMSSecondAddApprovalStatusform = this.formBuilder.group({
      EqmsCcChangeControlNumberId: [''],
      EqmsCcSecondLvlApprovar: [''],
      EqmsCcSecondLvlComment: [''],
      EqmsCcSecondLvlApprovalStatus: [''],
    });

  }

  GetApprovalData(CCNumId) {

    this._EqmsChangeControl.GetQualityAssuranceAapprovalData(CCNumId, this.UserId).subscribe((data2) => {
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
  async SignFirstleval() {

    debugger;
    this.EQMSFirstAddApprovalStatusform.patchValue({
      EqmsCcFirstLvlApprovar: this.UserId,
      EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
    });
    await this._EqmsChangeControl.SaveFirstLevelQADesSign(this.EQMSFirstAddApprovalStatusform.value).subscribe(res => {

      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        this.GetApprovalData(this.ChangeControlNumberId);
        this.IfFirstlvlApproval = false;
        this.IfFirstlvlSubmitbtn = false;
      } else {
        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    }

    );
  }
  async SignSecondleval() {

    debugger;
    this.EQMSSecondAddApprovalStatusform.patchValue({
      EqmsCcSecondLvlApprovar: this.UserId,
      EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
    });
    await this._EqmsChangeControl.SaveSecondLevelQAHeadSign(this.EQMSSecondAddApprovalStatusform.value).subscribe(res => {

      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        this.GetApprovalData(this.ChangeControlNumberId);
        this.IfFirstlvlApproval = false;
        this.IfSecondlvlSubmitbtn = false;
      } else {
        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    }

    );
  }

  async SaveCcUserSignQualityAssuarance() {
    this.EQMSAddQualityAssuaranceformData.patchValue({
      ForSignAndSubmit: 'Submit',
      UserId: this.UserId,
    });
    this._EqmsChangeControl.SaveCcUserSignQualityAssuarance(this.EQMSAddQualityAssuaranceformData.value).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        this.SignFirstleval();
      }
      else {

        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    }
    );

    this.IfSaveBtn = false;
    this.IfSignAndSubmitBtn = false;
    this.IfEditBtn = false;
    //this.editable = true;
    this.strFirstLevelApprovalStatus = "Pending";
    this.strSecondLevelApprovalStatus = "Pending";
    this.boolFirstlvlApproval = false;
    this.boolSecondlvlApproval = false;

  }
  async submitCcUserSign() {
    this.EQMSAddQualityAssuaranceformData.patchValue({
      ForSignAndSubmit: 'Submit',
      UserId: this.UserId,
    });
    await this.addQualityAssurance();
    this.SaveCcUserSignQualityAssuarance();

    this.IfSaveBtn = false;
    this.IfSignAndSubmitBtn = false;
    this.IfEditBtn = false;
    //this.editable = true;
    this.strFirstLevelApprovalStatus = "Pending";
    this.strSecondLevelApprovalStatus = "Pending";
    this.boolFirstlvlApproval = false;
    this.boolSecondlvlApproval = false;

  }
  GetIsQAHeadOrDes(UserId, CCNumId) {
    debugger;
    this._EqmsChangeControl.GetIsQAHeadOrDes(UserId, CCNumId).subscribe((data) => {
      var UserRole = data['Object'];
      console.log("User Role ");
      console.log(UserRole);
      if (UserRole != null) {
        if (UserRole[0]["IsUserDesignee"] == "Yes") {

          if (UserRole[0]["IsDesigneeSpecific"] == "Yes") {
            if (UserRole[0]["SpecificDesignee"] == this.UserId) {
              this.IfEditBtn = true;
            }
            else
            {
              this.IfEditBtn = false;

            }
          }
          else {
            this.IfEditBtn = false;
          }

        }
        else {
          this.IfEditBtn = false;
        }
      }

    });
  }
  async getUserInfo() {
    await this.loginService.getUserBasicInfo().subscribe((data) => {
      localStorage.setItem('LoginUser', JSON.stringify(data['Object']));
      this.UserInfo = JSON.parse(localStorage.getItem('LoginUser'));
      this.UserId = this.UserInfo['UserID'];
      console.log("UserID", this.UserId);
      this.GetApprovalData(this.ChangeControlNumberId);
      this.GetIsQAHeadOrDes(this.UserId, this.ChangeControlNumberId);

    });
  }
  resetForm() {
    this.EQMSAddQualityAssuaranceformData.reset();
  }

  //fun for future change in case
  getDropdownValue(value): any {
    if (value == true)
      return true
    if (value == false)
      return false

  }
  moveToTab(tabId) {
    this.RNRequest.moveToTab(tabId);
  }
  getddQualityAssuaranceList() {
    this._EqmsChangeControl.GetCCQualityAssuaranceonEqmsCcChangeControlId(this.ChangeControlNumberId).subscribe((dataapi) => {

      const ObjQualityAssuaranceData = dataapi['Object'];
      console.log(ObjQualityAssuaranceData);
      debugger;
      if (ObjQualityAssuaranceData != null) {
        let index = 0;
        for (index; index <= 3; index++) {
          if (ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceLableId'] == 1) {
            var Status = this.getDropdownValue(ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceStatus'])
            this.EQMSAddQualityAssuaranceformData.patchValue({
              EqmsCcQualityAssuaranceStatus1: Status,
              EqmsCcQualityAssuaranceComents1: ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceComents'],
            });
          }
          if (ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceLableId'] == 2) {
            var Status = this.getDropdownValue(ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceStatus'])
            this.EQMSAddQualityAssuaranceformData.patchValue({
              EqmsCcQualityAssuaranceStatus2: Status,
              EqmsCcQualityAssuaranceComents2: ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceComents'],
            });
          }
          if (ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceLableId'] == 3) {
            var Status = this.getDropdownValue(ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceStatus'])
            this.EQMSAddQualityAssuaranceformData.patchValue({
              EqmsCcQualityAssuaranceStatus3: Status,
              EqmsCcQualityAssuaranceComents3: ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceComents'],
            });
          }
          if (ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceLableId'] == 4) {
            var Status = this.getDropdownValue(ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceStatus'])
            this.EQMSAddQualityAssuaranceformData.patchValue({
              EqmsCcQualityAssuaranceStatus4: Status,
              EqmsCcQualityAssuaranceComents4: ObjQualityAssuaranceData[index]['EqmsCcQualityAssuaranceComents'],
            });
          }

        }
        console.log(this.listObj);
        console.log(this.EQMSAddQualityAssuaranceformData.value);
      }
      else {
        this.resetForm()
      }
    });
  }
  getChangeControlNumberValue() {
    debugger;
    this.ChangeControlInfo = this._EqmsChangeControl.getOption();
    this.ChangeControlNumber = this.ChangeControlInfo['GetChangeControlNumber']; //200;
    this.ChangeControlNumberId = this.ChangeControlInfo['GetEqmsCcChangeControlNumId'];//255;
  }
  addQualityAssurance() {

    debugger;
    this.EQMSAddQualityAssuaranceformData.patchValue({
      EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
    });
    let objapimes = true;//for _toastr only once show

    for (let i = 1; i < 5; i++) {
      this.EQMSAddQualityAssuaranceformData.patchValue({
        EqmsCcQualityAssuaranceLableId: i,
        EqmsCcQualityAssuaranceStatus: this.EQMSAddQualityAssuaranceformData.get('EqmsCcQualityAssuaranceStatus' + i).value,
        EqmsCcQualityAssuaranceComents: this.EQMSAddQualityAssuaranceformData.get('EqmsCcQualityAssuaranceComents' + i).value,
      });
      this._EqmsChangeControl.SaveQualityAssuarance(this.EQMSAddQualityAssuaranceformData.value).subscribe(res => {
        if (res['Result']) {
          if (objapimes == true) {
            this._toastr.success(res["Object"]["ResultMessage"]);
            objapimes = false;
          }
        }
        else {
          if (objapimes == true) {
            this._toastr.error(res["Object"]["ResultMessage"]);
            objapimes = false;
          }
        }
      }

      );
    }


  }

}
