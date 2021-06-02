import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FilterService } from '@syncfusion/ej2-angular-grids';
import { ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToastrService } from "ngx-toastr";
import { QCExperimentService } from "../service/qcelnexperiment.service";
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { ExperimentEnt, ExpVersionEnt } from '../service/qcelnexperiment.model';
import { elnDataService } from "../service/qcelnexperiment.data.service";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/login/Service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qceln-header',
  templateUrl: './qceln-header.component.html',
  providers: [ToolbarService, FilterService],
  styleUrls: ['./qceln-header.component.css']
})
export class QCElnHeaderComponent implements OnInit {
  public currentDate: Date = new Date();
  // maps the appropriate column to fields property
  public dropDwnFields: Object = { text: 'Name', value: 'Code' };
  public dropDwnFields2: Object = { text: 'UserName', value: 'UserId' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to ComboBox input element
  public watermark: string = 'Select';
  public Dates: Date[];
  elnHeaderForm: FormGroup;
  public ProgramCodeList: Object[];
  public TestMaterialList: Object[];
  public TestTypeList: Object[];
  public TypeList: Object[];
  public UserList: Object[];
  public SampleBarcodeList: Object[];
  pipeDate = new DatePipe('en-US');
  expVersionObj: ExpVersionEnt;
  public loginUser: object = {};
  @Output('callback') parentCallback: EventEmitter<boolean> = new EventEmitter<boolean>(); loginUserSer: any;
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();
  subscription: Subscription;
  insertImageSettings: object = {};
  constructor(
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService,
    private route: ActivatedRoute,
    private data: elnDataService,
    private loginUserService: LoginService,
    private _elnExperimentService: QCExperimentService,
    private commonService: CommonListService,
    private _toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.loginUser = this.loginUserService.getLoginUser();
    this.subscription = this.data.currenntVersionObj.subscribe(obj => {
      this.expVersionObj = obj;
      this.GetExprimentDetails();
      this.GetProgrameCodeList();
      this.GetTestMaterialId();
      this.GetTestTypeId();
      this.GetTypeId();
      this.GetSampleBarcode();
    });
    this.GetUserList();
    this.setForm();
    this.insertImageSettings = {
      saveFormat: "Base64"
    }
  }

  setForm() {
    this.elnHeaderForm = this.formBuilder.group({
      ExperimentId: [''],
      VersionId: [''],
      Title: ['', Validators.required],
      ExperimentNo: ['', [Validators.required, Validators.minLength(2)]],
      ProgramCode: [''],
      SampleBarcode: [''],
      PatientId: [''],
      BatchId: [''],
      TestMaterial: [''],
      QCTestType: [''],
      Type: [''],
      ExperimentDate: ['', Validators.required],
      WitnessId: ['', Validators.required],
      QC_Reviewer_1: ['', Validators.required],
      QC_Reviewer_2: [''],
      QA_Reviewer_1: ['', Validators.required],
      QA_Reviewer_2: [''],
      QC_Approver: ['', Validators.required],
      QA_Approver: ['', Validators.required],
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

  GetTestMaterialId() {
    this._elnExperimentService.getTestMaterialId(this.expVersionObj).subscribe((data) => {
      this.TestMaterialList = data['Object'];
    });
  }
  GetSampleBarcode() {
    this._elnExperimentService.getSampleBarcode(this.expVersionObj).subscribe((data) => {
      this.SampleBarcodeList = data['Object'];
    });
  }

  GetTestTypeId() {
    this._elnExperimentService.getTestTypeId(this.expVersionObj).subscribe((data) => {
      this.TestTypeList = data['Object'];
    });
  }

  GetTypeId() {
    this._elnExperimentService.getTypeId(this.expVersionObj).subscribe((data) => {
      this.TypeList = data['Object'];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  GetExprimentDetails() {
    if (this.expVersionObj.VersionId > 0) {
      this._elnExperimentService.getExperimentDetails(this.expVersionObj).subscribe((data) => {
        let experimentObj = data['Object'] as ExperimentEnt;
        this.elnHeaderForm.patchValue({
          ExperimentId: experimentObj.ExperimentId,
          VersionId: experimentObj.VersionId,
          Title: experimentObj.Title,
          ExperimentNo: experimentObj.ExperimentNo,
          ProgramCode: experimentObj.ProgramCode,
          ExperimentDate: experimentObj.ExperimentDate,
          PatientId: experimentObj.PatientId,
          SampleBarcode: experimentObj.SampleBarcode,
          TestMaterial: experimentObj.TestMaterial,
          QCTestType: experimentObj.QCTestType,
          Type: experimentObj.Type,
          BatchId: experimentObj.BatchId,
          WitnessId: experimentObj.WitnessId,
          QC_Reviewer_1: experimentObj.QC_Reviewer_1,
          QC_Reviewer_2: experimentObj.QC_Reviewer_2,
          QA_Reviewer_1: experimentObj.QA_Reviewer_1,
          QA_Reviewer_2: experimentObj.QA_Reviewer_2,
          QC_Approver: experimentObj.QC_Approver,
          QA_Approver: experimentObj.QA_Approver,
          Aim: experimentObj.Aim,
          Rationale: experimentObj.Rationale
        });
        for (let i = 0; i <= 3; i++) {
          setTimeout(() => {
            this.elnHeaderForm.markAsPristine();
          }, 1000);
        }
      });
    }
  }

  GetUserList() {
    this._elnExperimentService.getUserList().subscribe((data) => {
      this.UserList = data['Object'].filter(user => {
        return this.expVersionObj.IsAllowEdit == false || user.UserId !== this.loginUser['UserID']
      });
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
        this._elnExperimentService.saveExperiment(this.elnHeaderForm.value).subscribe((data) => {
          if (data['Result']) {
            if (this.expVersionObj.ExperimentId == undefined) {
              this.elnHeaderForm.patchValue({
                ExperimentId: data['Object'].ExperimentId,
                VersionId: data['Object'].VersionId
              });
              this.data.setVersionInfo(data['Object']);
            }
            this.elnHeaderForm.markAsPristine();
            this._toastr.success(data['ResultMessage']);
            this.parentCallback.emit(true);
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


  matchField() {
    let witnessId = this.elnHeaderForm.get('WitnessId').value;
    let QC_Reviewer_1 = this.elnHeaderForm.get('QC_Reviewer_1').value;
    let QA_Reviewer_1 = this.elnHeaderForm.get('QA_Reviewer_1').value;
    let QC_Reviewer_2 = this.elnHeaderForm.get('QC_Reviewer_2').value;
    let QA_Reviewer_2 = this.elnHeaderForm.get('QA_Reviewer_2').value;
    let QC_Approver = this.elnHeaderForm.get('QC_Approver').value;
    let QA_Approver = this.elnHeaderForm.get('QA_Approver').value;
    if (witnessId == QC_Reviewer_1) {
      this._toastr.error('Witness and QC reviewer 1 should not be same');
      return false;
    } else if (QC_Reviewer_2 != '' && QC_Reviewer_2 != null && witnessId == QC_Reviewer_2) {
      this._toastr.error('Witness and QC reviewer 2 should not be same');
      return false;
    } else if (witnessId == QA_Reviewer_1) {
      this._toastr.error('Witness and QA reviewer 1 should not be same');
      return false;
    } else if (QA_Reviewer_2 != '' && QA_Reviewer_2 != null && witnessId == QA_Reviewer_2) {
      this._toastr.error('Witness and QA reviewer 2 should not be same');
      return false;
    } else if (witnessId == QC_Approver) {
      this._toastr.error('Witness and QC Approver should not be same');
      return false;
    } else if (witnessId == QA_Approver) {
      this._toastr.error('Witness and QA Approver should not be same');
      return false;
    }

    else if (QC_Reviewer_2 != '' && QC_Reviewer_2 != null && QC_Reviewer_1 == QC_Reviewer_2) {
      this._toastr.error('QC reviewer 1 and QC reviewer 2 should not be same');
      return false;
    } else if (QC_Reviewer_1 == QA_Reviewer_1) {
      this._toastr.error('QC reviewer 1 and QA reviewer 1 should not be same');
      return false;
    } else if (QA_Reviewer_2 != '' && QA_Reviewer_2 != null && QC_Reviewer_1 == QA_Reviewer_2) {
      this._toastr.error('QC reviewer 1 and QA reviewer 2 should not be same');
      return false;
    } else if (QC_Reviewer_1 == QC_Approver) {
      this._toastr.error('QC reviewer 1 and QC Approver should not be same');
      return false;
    } else if (QC_Reviewer_1 == QA_Approver) {
      this._toastr.error('QC reviewer 1 and QA Approver should not be same');
      return false;
    }

    else if (QC_Reviewer_2 != '' && QC_Reviewer_2 != null && QC_Reviewer_2 == QA_Reviewer_1) {
      this._toastr.error('QC reviewer 2 and QA reviewer 1 should not be same');
      return false;
    } else if (QA_Reviewer_2 != '' && QA_Reviewer_2 != null && QC_Reviewer_2 == QA_Reviewer_2) {
      this._toastr.error('QC reviewer 2 and QA reviewer 2 should not be same');
      return false;
    } else if (QC_Reviewer_2 != '' && QC_Reviewer_2 != null && QC_Reviewer_2 == QC_Approver) {
      this._toastr.error('QC reviewer 2 and QC Approver should not be same');
      return false;
    } else if (QC_Reviewer_2 != '' && QC_Reviewer_2 != null && QC_Reviewer_2 == QA_Approver) {
      this._toastr.error('QC reviewer 2 and QA Approver should not be same');
      return false;
    }

    else if (QA_Reviewer_2 != '' && QA_Reviewer_2 != null && QA_Reviewer_1 == QA_Reviewer_2) {
      this._toastr.error('QA reviewer 1 and QA reviewer 2 should not be same');
      return false;
    } else if (QA_Reviewer_1 == QC_Approver) {
      this._toastr.error('QA reviewer 1 and QA Approver should not be same');
      return false;
    } else if (QA_Reviewer_1 == QA_Approver) {
      this._toastr.error('QA reviewer 1 and QA Approver should not be same');
      return false;
    }

    else if (QA_Reviewer_2 != '' && QA_Reviewer_2 != null && QA_Reviewer_2 == QC_Approver) {
      this._toastr.error('QA reviewer 2 and QC Approver should not be same');
      return false;
    } else if (QA_Reviewer_2 != '' && QA_Reviewer_2 != null && QA_Reviewer_2 == QA_Approver) {
      this._toastr.error('QA reviewer 2 and QA Approver should not be same');
      return false;
    }

    else if (QC_Approver == QA_Approver) {
      this._toastr.error('QC Approver and QA Approver should not be same');
      return false;
    }

    else {
      return true;
    }
  }
}