import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine, SaveEventArgs, GridComponent } from '@syncfusion/ej2-angular-grids';
import { debounce, forEach } from 'lodash';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EqmsCcPrimaryAssessment } from '../eqms-cc.model';
import { ChangeControlDataServiceService } from '../change-control-data-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { RaiseNewRequestComponent } from '../raise-new-request/raise-new-request.component';
import { LoginService } from 'src/app/login/Service/login.service';
@Component({
  selector: 'app-primary-assessment',
  templateUrl: './primary-assessment.component.html',
  styleUrls: ['./primary-assessment.component.css']
})
export class PrimaryAssessmentComponent implements OnInit {
  @ViewChild('tabsetpa', { static: true }) tabset;

  @ViewChild("grid2", { static: false }) public gridObj: GridComponent;

  //public grid: GridComponent;
  public listObj: DropDownListComponent;
  public TempList: object[];

  public data1: object[];
  public data3: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public groups: object[] = [
    {
      "name": "pencils",
      "items": ["red pencil", "blue pencil", "yellow pencil"]
    },
    {
      "name": "rubbers",
      "items": ["big rubber", "small rubber"]
    },
  ];
  public ddParams: any[] = ['Yes', 'No'];
  public ddParams1: IEditCell;
  public deptlist: IEditCell;
  public action: IEditCell;
  public lines: GridLine;
  public ChangeControlNumber;
  public ChangeControlNumberId;
  public ChangeControlInfo: object = {};
  EQMSAddPrimaryAssessmentformData: FormGroup;
  EQMSFirstAddApprovalStatusform: FormGroup;
  EQMSDeptPrimaryAssessApprovalStatusform: FormGroup;
  public Apiresult;
  public Apimes;
  public NgifForEdit: boolean = true;
  public UserInfo: object = {};
  public UserId;
  public AllowedForEditUser;
  public ObjPrimaryAssessmentApprovalData: Object[];
  public IfEditForNotAllowed: boolean = true;
  public IfEditForNotAllowed2: boolean = true;
  public btnNext: boolean = false;
  public IsInitiator: boolean = true;
  public editparams: Object;
  public objDepartmentList: Object[];
  public fields: Object = { text: 'Name', value: 'Id' };
  public objStatusList: Object[] = [
    { Id: 1, reason: 'Rework Required', },
    { Id: 2, reason: 'Rejected' },
    { Id: 3, reason: 'Approved' }
  ];
  public fields1: Object = { text: 'reason', value: 'Id' };
  public ObjBmrList: object[] = [
    {
      "DeptTitle": "pencils",
      "DeptHead": "Suvinay Deshmukh",
      "Id": "17",
      "Comment": "SSSSSSSSSSSSS",
      "Status": 1,
      "Time": "12/07/1998",
    },
    {
      "DeptTitle": "pencils",
      "DeptHead": "Suvinay Deshmukh",
      "Id": "17",
      "Comment": "SSSSSSSSSSSSSSSSSSSS",
      "Status": 2,
      "Time": "12/07/1998",
    },
  ];
  public IfFirstlvlSubmitbtn: boolean = true;
  public IfFirstlvlApproval: boolean = false;
  public strFirstLevelApprovalName;
  public strFirstLevelCommenttext;
  public strFirstLevelApprovalStatus: string = "Not Initiated";
  public boolFirstlvlApproval: boolean = false;
  public EqmsCCLeadComment;
  public strLeadName;
  constructor(private _EqmsChangeControl: ServiceService, private loginService: LoginService, private RNRequest: RaiseNewRequestComponent, private formBuilder: FormBuilder, private data: ChangeControlDataServiceService, private _toastr: ToastrService, private router: ActivatedRoute) { }


  ngOnInit(): void {
    //this.editSettings = { allowEditing: true, newRowPosition: 'Bottom' };
    //this.toolbar = ['Edit', 'Update', 'Cancel'];
    this.getUserInfo()
    this.load()
    this.ddParams1 = { params: { value: 'Equipment' } };
    this.ddParams1 = { params: { value: 'System' } };
    this.ddParams1 = { params: { value: 'Procedures' } };
    this.ddParams1 = { params: { value: 'Document' } };
    this.ddParams1 = { params: { value: 'Training Needs' } };
    this.ddParams1 = { params: { value: 'Equipment Requalification' } };
    this.ddParams1 = { params: { value: 'Method' } };
    this.ddParams1 = { params: { value: 'Process Revalidation' } };
    this.ddParams1 = { params: { value: 'Facility Revalidation' } };
    this.ddParams1 = { params: { value: 'Others [Mention]' } };
    this.deptlist = { params: { value: 'Shruti' } };
    this.action = { params: { value: 'Rework' } };
    this.editparams = { params: { change: this.onDropdownChange.bind(this) } };
    this.lines = 'Both';
    this.data1 = [
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        EmpList: 'Sachin',
        ChooseAction: 'Approved',
        Comments: 'Change Occur in versions.',
      },
    ];


    this.router.data.subscribe(data => {
      let Action = data.urls[3]["title"];
      if (Action == "Edit Request") {
        this.NgifForEdit = true;


      } else {
        this.NgifForEdit = false;

        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      }
    })

  }
  moveToTab(tabId) {
    this.RNRequest.moveToTab(tabId);
  }

  public onDropdownChange(args) {
    let disableInputEle: HTMLInputElement = this.gridObj.editModule.formObj.element.querySelector('#' + this.gridObj.element.id + 'EqmsCcProposedTimeFrame');
    disableInputEle.disabled = (args.value === "No") ? true : false;

  }

  setForm() {

    this.EQMSAddPrimaryAssessmentformData = this.formBuilder.group({
      EqmsCcChangeControlNumberId: ['', Validators.required],
      EqmsCcMediumOfImpactId: [''],
      EqmsCcImpact: [''],
      EqmsCcProposedTimeFrame: [''],
      EqmsCcNotes: ['']
    });
    this.EQMSFirstAddApprovalStatusform = this.formBuilder.group({
      EqmsCcChangeControlNumberId: [''],
      EqmsCcSignAndSubmitedBy: [''],
      EqmsCcSignAndSubmitedComment: [''],
    });
    this.EQMSDeptPrimaryAssessApprovalStatusform = this.formBuilder.group({
      EqmsCcChangeControlNumberId: ['', Validators.required],
      EqmsCcSignAndSubmitedBy: [''],
      EqmsCcApprovalStatus: [''],
      EqmsCcComment: [''],
      DepartmentId: [''],
    });

  }

  DeptApprovalDeptList() {
    this._EqmsChangeControl.GetDepartmentListForPrimary(this.ChangeControlNumberId).subscribe((data) => {
      this.objDepartmentList = data['Object'];
    });
  }
  GetApprovalNeedList() {
    this._EqmsChangeControl.GetGetApprovalNeedListonEqmsCcChangeControlId(this.ChangeControlNumberId, this.UserId).subscribe((dataapi) => {

      this.ObjBmrList = dataapi['Object'];
      console.log(this.ObjBmrList);


    });
  }
  async SignFirstleval() {

    this.EQMSFirstAddApprovalStatusform.patchValue({
      EqmsCcSignAndSubmitedBy: this.UserId,
      EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
      EqmsCcSignAndSubmitedComment: this.EqmsCCLeadComment,
    });
    await this._EqmsChangeControl.SavePrimaryAssessFirstLevelSign(this.EQMSFirstAddApprovalStatusform.value).subscribe(res => {

      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        this.GetApprovalData(this.ChangeControlNumberId);
        this.IfFirstlvlApproval = false;
        this.IfFirstlvlSubmitbtn = false;
        this.IfEditForNotAllowed = false;
      } else {
        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    }

    );
  }
  getUserInfo() {
    this.loginService.getUserBasicInfo().subscribe((data) => {
      localStorage.setItem('LoginUser', JSON.stringify(data['Object']));
      this.UserInfo = JSON.parse(localStorage.getItem('LoginUser'));
      this.UserId = this.UserInfo['UserID'];
      console.log("UserID", this.UserId);
      this.GetApprovalData(this.ChangeControlNumberId);

      this.getUserLead(this.AllowedForEditUser);
      this.DeptApprovalDeptList();
      this.GetApprovalNeedList()
      this.CheckForInitiator();
    });
  }
  GetApprovalData(CCNumId) {

    this._EqmsChangeControl.GetDeptPrimaryAssessmentAapprovalData(CCNumId, this.UserId).subscribe((data2) => {
      var ApprovalData = data2['Object'];
      if (ApprovalData.length != 0) {
        this.IfEditForNotAllowed2 = false;

        if (ApprovalData[0]['IsDeptallApproval'] == 'Yes') {
          this.btnNext = true;

        }
      }
    });


  }
  GetTab1ApprovalData(CCNumId) {

    this._EqmsChangeControl.GetPrimaryAssessmentAapprovalData(CCNumId, this.UserId).subscribe((data2) => {
      var ApprovalData = data2['Object'];
      if (ApprovalData.length != 0) {
        if (ApprovalData[0]["EqmsCcSignAndSubmitedByFirstTab"] != null) {
          this.strLeadName = "Submitted By:     " + ApprovalData[0]["EqmsCcSignAndSubmitedByFirstTabName"];
          this.EqmsCCLeadComment = ApprovalData[0]["EqmsCcSignAndSubmitedCommentFirstTab"];
          this.IfEditForNotAllowed = false;

          this.toolbar = [];
          this.editSettings = { allowEditing: false, newRowPosition: 'Bottom' };
          this.moveToTabInside('tab-selectbyid2');
        }
      }
    });


  }
  moveToTabInside(tabId) {
    this.tabset.select(tabId);
  }
  async getUserLead(UserId) {
    await this._EqmsChangeControl.GetgetUserLeadData(UserId).subscribe((data2) => {
      var UserLead = data2['Object'];
      if (UserLead == this.UserId) {
        this.IfEditForNotAllowed = true;
        this.toolbar = ['Edit', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, newRowPosition: 'Bottom' };
      }
      else {
        this.IfEditForNotAllowed = false;
        this.toolbar = [];
        this.editSettings = {};
      }
      this.GetTab1ApprovalData(this.ChangeControlNumberId);
    });

  }
  getPrimaryAssessmentList() {
    this._EqmsChangeControl.GetPrimaryAssessmentonEqmsCcChangeControlId(this.ChangeControlNumberId).subscribe((dataapi) => {

      const ObjChangeControlData = dataapi['Object'];
      //this.ObjBmrList== dataapi['Object'];
      this.data3 = ObjChangeControlData;
    });
  }
  getChangeControlNumberValue() {
    debugger;
    this.ChangeControlInfo = this._EqmsChangeControl.getOption();
    this.ChangeControlNumber = this.ChangeControlInfo['GetChangeControlNumber'];
    this.ChangeControlNumberId = this.ChangeControlInfo['GetEqmsCcChangeControlNumId'];
    this.AllowedForEditUser = this.ChangeControlInfo['AlowedForEdit'];
  }
  resetForm() {
    this.EQMSAddPrimaryAssessmentformData.reset();
  }
  CheckForInitiator() {
    if (this.AllowedForEditUser == this.UserId) {
      this.IsInitiator = true;
    }
    else {
      this.IsInitiator = false;
    }
  }
  Click() {
    //args.data=this.data;
    for (let index = 0; index < this.data3.length; index++) {
      if (this.data3[index]["EqmsCcImpacttxt"] == "Yes") {
        console.log(this.data3[index]["EqmsCcImpacttxt"]);
        this.EQMSAddPrimaryAssessmentformData.patchValue({
          EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
          EqmsCcMediumOfImpactId: this.data3[index]["EqmsCcMediumOfImpactId"],
          EqmsCcImpact: 1,
          EqmsCcProposedTimeFrame: this.data3[index]["EqmsCcProposedTimeFrame"],
          EqmsCcNotes: this.data3[index]["EqmsCcNotes"],
        });

        this._EqmsChangeControl.SavePrimaryAssessment(this.EQMSAddPrimaryAssessmentformData.value).subscribe(res => {
          if (res['Result']) {
            this.Apiresult = "Y";
            this.Apimes = res["Object"]["ResultMessage"];

          }
          else {
            this.Apiresult = "N";
            this.Apimes = res["Object"]["ResultMessage"];
            this._toastr.error(res["Object"]["ResultMessage"]);
          }
        });

      }
    }
  }

  actionBegin(args: SaveEventArgs, index) {
    debugger;
    if (args.requestType === 'save') {
      this.data3[args["rowIndex"]] = args.data;

      if (this.data3[args["rowIndex"]]["EqmsCcImpacttxt"] == "Yes") {
        this.EQMSAddPrimaryAssessmentformData.patchValue({
          EqmsCcImpact: 1,
          EqmsCcProposedTimeFrame: this.data3[args["rowIndex"]]["EqmsCcProposedTimeFrame"]
        });
      }
      else {

        this.data3[args["rowIndex"]]["EqmsCcProposedTimeFrame"] = "-";
        this.EQMSAddPrimaryAssessmentformData.patchValue({
          EqmsCcImpact: 0,
          EqmsCcProposedTimeFrame: '-',
        });
      }

      this.EQMSAddPrimaryAssessmentformData.patchValue({
        EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
        EqmsCcMediumOfImpactId: this.data3[args["rowIndex"]]["EqmsCcMediumOfImpactId"],


        EqmsCcNotes: this.data3[args["rowIndex"]]["EqmsCcNotes"],
      });

      this._EqmsChangeControl.UpdateCcPrimaryAssessment(this.EQMSAddPrimaryAssessmentformData.value).subscribe(res => {
        this.getPrimaryAssessmentList();
        if (res['Result']) {
          this._toastr.success(res["Object"]["ResultMessage"]);
        }
        else {
          this._toastr.error(res["Object"]["ResultMessage"]);
        }
      });
    }


    if (args.requestType === 'beginEdit') {
      this.data3[args["rowIndex"]]["EqmsCcImpacttxt"] = "Yes";
    }

  }
  public onActionComplete(args) {
    debugger;
    if (args.requestType === 'beginEdit') {
      var dat = args.rowData["EqmsCcImpacttxt"];
      let disableInputEle: HTMLInputElement = args.form.querySelector('#' + this.gridObj.element.id + 'EqmsCcProposedTimeFrame');
      disableInputEle.disabled = (dat === "No") ? true : false;
      if (dat === "No") {
        this.data3[args["rowIndex"]]["EqmsCcProposedTimeFrame"] = "";
      }
    }
  }
  AddDeptForApproval() {
    debugger;
    this.EQMSDeptPrimaryAssessApprovalStatusform.patchValue({
      EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
    });
    //let Deptid = this.EQMSDeptPrimaryAssessApprovalStatusform.get('DepartmentId').value;
    //let ss= this.objDepartmentList.findIndex(x => x["Id"] === Deptid);
    //this.objDepartmentList.splice(ss, 1);
    // this.objDepartmentList.splice(Deptid,1);
    this.objDepartmentList = [];
    this._EqmsChangeControl.SaveAddDeptForApprovalPrimaryAssessment(this.EQMSDeptPrimaryAssessApprovalStatusform.value).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        console.log(res["Object"]["ResultMessage"]);
        if (res["Object"]["ResultMessage"] == 'All Department updated successfully') {

        }
        this.DeptApprovalDeptList();
        this.GetApprovalNeedList();
        this.EQMSDeptPrimaryAssessApprovalStatusform.patchValue({
          DepartmentId: [''],
        });
      }
      else {

        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    });
  }
  SignDeptApproval(Data) {
    debugger;
    console.log(Data);
    this.EQMSDeptPrimaryAssessApprovalStatusform.patchValue({
      EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
      EqmsCcSignAndSubmitedBy: this.UserId,
      EqmsCcComment: Data["Comment"],
      EqmsCcApprovalStatus: Data["Status"],
      DepartmentId: Data["DepartmentId"],
    });
    this._EqmsChangeControl.SaveAddDeptForApprovalPrimaryAssessment(this.EQMSDeptPrimaryAssessApprovalStatusform.value).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        this.GetApprovalNeedList();
        this.GetApprovalData(this.ChangeControlNumberId);
      }
      else {
        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    });
  }
  SignAndSubmitIntiator() {
    this.EQMSDeptPrimaryAssessApprovalStatusform.patchValue({
      EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
      EqmsCcSignAndSubmitedBy: this.UserId,
    });
    this._EqmsChangeControl.SavePrimaryAssessmentbyDeptSign(this.EQMSDeptPrimaryAssessApprovalStatusform.value).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        this.IfEditForNotAllowed = true;
        this.IsInitiator = false;
      } else {
        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    }

    );
  }

  load() {
    this.getChangeControlNumberValue();
    this.setForm();
    this.getPrimaryAssessmentList();

  }
}
