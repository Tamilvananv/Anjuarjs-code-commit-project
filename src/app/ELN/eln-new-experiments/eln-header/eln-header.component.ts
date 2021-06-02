import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FilterService } from '@syncfusion/ej2-angular-grids';
import { ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToastrService } from "ngx-toastr";
import { ExperimentService } from "../service/experiment.service";
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { ExperimentEnt, ExpVersionEnt } from '../service/experiment.model';
import { elnDataService } from "../service/experiment.data.service";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/login/Service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eln-header',
  templateUrl: './eln-header.component.html',
  providers: [ToolbarService, FilterService],
  styleUrls: ['./eln-header.component.css']
})
export class ElnHeaderComponent implements OnInit {
  public currentDate: Date = new Date();
  // maps the appropriate column to fields property
  public dropDwnFields: Object = { text: 'Name', value: 'Code' };
  public dropDwnFields2: Object = { text: 'FullName', value: 'UserId' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to ComboBox input element
  public watermark: string = 'Select';
  public Dates: Date[];
  elnHeaderForm: FormGroup;
  public ProgramCodeList: Object[];
  public TargetList: Object[];
  public ELNTypeList: Object[];
  public UserList: Object[];
  public WitnessUserList: Object[];
  public ReviewerUserList: Object[];
  public ApproverUserList: Object[];
  public ReworkAddedBy: object[];
  pipeDate = new DatePipe('en-US');
  expVersionObj: ExpVersionEnt;
  public loginUser: object = {};
  @Output('callback') parentCallback: EventEmitter<boolean> = new EventEmitter<boolean>(); loginUserSer: any;
  @Output('ApproverChanged') onApproverChangedTrigger: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();
  insertImageSettings: object = {};
  versionWatch: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService,
    private router: Router,
    private data: elnDataService,
    private loginUserService: LoginService,
    private _elnExperimentService: ExperimentService,
    private commonService: CommonListService,
    private _toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.setForm();
    this.loginUser = this.loginUserService.getLoginUser();
    this.versionWatch = this.data.currenntVersionObj.subscribe(obj => {
      this.expVersionObj = obj;
      this.LoadApprovers(this.expVersionObj);
      this.GetProgrameCodeList();
      this.GetTargetList();
      this.GetTypeList();
    });
    this.insertImageSettings = {
      saveFormat: "Base64"
    }
  }

  setForm() {
    this.elnHeaderForm = this.formBuilder.group({
      ExperimentId: [''],
      VersionId: [''],
      Title: ['', Validators.required],
      ExperimentNo: ['',],
      UserExperimentNo: ['',],
      VersionNo: ['',],
      ProgramCode: [''],
      TargetId: [''],
      ELNType: [''],
      ExperimentDate: ['', Validators.required],
      WitnessId: [''],
      ReviewerId: [''],
      ApproverId: ['', Validators.required],
      Aim: ['',],
      Rationale: ['',],
    });
  }

  GetTools() {
    this.commonService.GetTools();
  }

  GetProgrameCodeList() {
    this._elnExperimentService.getProgrameCodeList(this.expVersionObj).subscribe((data) => {
      this.ProgramCodeList = data['Object'];
    });
  }

  GetTargetList() {
    this._elnExperimentService.getTargetList(this.expVersionObj).subscribe((data) => {
      this.TargetList = data['Object'];
    });
  }

  GetExprimentDetails() {
    if (this.expVersionObj.VersionId > 0) {
      this._elnExperimentService.getExperimentDetails(this.expVersionObj).subscribe((data) => {
        let experimentObj = data['Object'] as ExperimentEnt;
        this.ReworkAddedBy = data['ExtraObject'];
        this.elnHeaderForm.patchValue({
          ExperimentId: experimentObj.ExperimentId,
          VersionId: experimentObj.VersionId,
          Title: experimentObj.Title,
          ExperimentNo: experimentObj.ExperimentNo,
          VersionNo: experimentObj.VersionNo,
          UserExperimentNo: experimentObj.ExperimentNo + "_" + experimentObj.VersionNo,
          ProgramCode: experimentObj.ProgramCode,
          ExperimentDate: experimentObj.ExperimentDate,
          TargetId: experimentObj.TargetId,
          ELNType: experimentObj.ELNType,
          WitnessId: experimentObj.WitnessId,
          ApproverId: experimentObj.ApproverId,
          ReviewerId: experimentObj.ReviewerId,
          Aim: experimentObj.Aim,
          Rationale: experimentObj.Rationale
        });
        setTimeout(() => {
          this.elnHeaderForm.markAsPristine();
        }, 3000);
      });
    } else {
      this._elnExperimentService.getExperimentNo().subscribe((data) => {
        this.elnHeaderForm.patchValue({
          ExperimentDate: new Date(),
          ExperimentNo: data['Object'],
          VersionNo: "00",
          UserExperimentNo: data['ExtraObject'] + "_" + data['Object'] + "_" + "00",
        });
      });
    }
  }

  LoadApprovers(versionObj) {
    this._elnExperimentService.loadApprovers(versionObj).subscribe((data) => {
      this.WitnessUserList = data['Object']['WitnessUserList'];
      this.ReviewerUserList = data['Object']['ReviewerUserList'];
      this.ApproverUserList = data['Object']['ApproverUserList'];
      this.GetExprimentDetails();
    });
  }

  GetTypeList() {
    this._elnExperimentService.getELNTypeList(this.expVersionObj).subscribe((data) => {
      this.ELNTypeList = data['Object'];
    });
  }

  moveToTab(tabToMove) {
    this.parentTabMove.emit(tabToMove);
  }

  SaveExperiment() {
    if (this.elnHeaderForm.valid) {
      if (this.matchField()) {
        let expDate = new Date(this.elnHeaderForm.value.ExperimentDate);
        this.elnHeaderForm.value.ExperimentDate = this.pipeDate.transform(expDate, 'yyyy-MM-dd 00:00:00');
        this._elnExperimentService.saveExperiment(this.elnHeaderForm.getRawValue()).subscribe((data) => {
          if (data['Result']) {
            if (this.expVersionObj.ExperimentId == undefined) {
              this.elnHeaderForm.patchValue({
                ExperimentId: data['Object'].ExperimentId,
                VersionId: data['Object'].VersionId
              });
              this.data.setVersionInfo(data['Object']);
              this.router.navigate(['/elnexperiments/edit', data['Object'].VersionId]);
            } else {
              this.data.setVersionInfo(this.expVersionObj);
            }
            this.elnHeaderForm.markAsPristine();
            this._toastr.success(data['ResultMessage']);
            this.parentCallback.emit(true);
            this.onApproverChangedTrigger.emit(true);
          }
          else {
            this._toastr.error(data['ResultMessage']);
          }
        });
      }
    } else {
      this.formErrorDisplay.showErrors(this.elnHeaderForm);
    }
  }

  ngOnDestroy() {
    this.expVersionObj = {
      ExperimentId: null, VersionId: null, IsAllowEdit: true, IsSendForApproval: false, VersionNo: null,
      IsRework: false, StatusCode: 'N', IsFavourite: false, IsAllowDiscontinue: false
    };
    //this.data.setVersionInfo(this.expVersionObj);
    this.versionWatch.unsubscribe();
  }


  matchField() {
    let witnessId = this.elnHeaderForm.get('WitnessId').value;
    let reviewerId = this.elnHeaderForm.get('ReviewerId').value;
    let approverId = this.elnHeaderForm.get('ApproverId').value;
    if (witnessId != '' && witnessId != null && witnessId == reviewerId) {
      this._toastr.error('Witness and reviewer should not be same');
      return false;
    } else if (witnessId != '' && witnessId != null && witnessId == approverId) {
      this._toastr.error('Witness and approver should not be same');
      return false;
    } else if (reviewerId != '' && reviewerId != null && reviewerId == approverId) {
      this._toastr.error('Reviewer and Approver should not be same');
      return false;
    } else {
      return true;
    }
  }
}