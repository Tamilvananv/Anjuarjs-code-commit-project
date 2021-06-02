import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EqmsCc, EqmsCcChangeDetails,EqmsCcQualityAssuarance, EqmsCcApprovalStatus } from './eqms-cc.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 
 
  readonly _urlImsStorageLocation = environment.apiUrl + '/api/ImsStorageLocation/'; EQMSCommon
  readonly _urlEQMSCommon = environment.apiUrl + '/api/EQMSCommon/';
  readonly _urlIcsMaster = environment.apiUrl + '/api/ICSMaster/';

 
  constructor(private _http: HttpClient, private _toastr: ToastrService) { }
  
  
  GetCcRelatedToReasonList() {
    return this._http.get(this._urlEQMSCommon + 'GetCcRelatedToList');
  }

  GetMediumForChangeList() {
    return this._http.get(this._urlEQMSCommon + 'GetMediumForChangeList');
  }

  GetDepartmentList() {
    return this._http.get(this._urlIcsMaster + 'GetDepartmentList');
  }
  GetDepartmentListForPrimary(CCNum) {
    return this._http.get(this._urlEQMSCommon + 'GetDepartmentListForPrimary/'+ CCNum, CCNum);
    
  }
  GetRequesterDepartmentList(UserId) {
    return this._http.get(this._urlEQMSCommon + 'GetRequesterDepartmentList/' + UserId, UserId);
  } 
  GetInstrumentList() {
    return this._http.get(this._urlEQMSCommon + 'GetInstrumentList');
  }
  GetEquipmentList1() {
    return this._http.get(this._urlEQMSCommon + 'GetEquipmentList');
  }

  GetControlNumber() {
    return this._http.get(this._urlEQMSCommon + 'GetControlNumber');
  }
  GetIsQAHeadOrDes(UserId, CCNumId) {
    return this._http.post(this._urlEQMSCommon  + 'GetIsQAHeadOrDes/'+UserId+'/'+CCNumId, UserId,CCNumId);
  }
  GetControlNum() {
    return this._http.get(this._urlEQMSCommon + 'GetControlNum');
  }
  SaveRequisitionDetails(EQMSAddRequisitionDetailsformData: EqmsCc, fileList: File[]) {
    let formData = new FormData();
    formData.append("MaintenanceObj", JSON.stringify(EQMSAddRequisitionDetailsformData));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlEQMSCommon + 'SaveCcRequisitionDetails', formData);
  }
  UpdateCcRequisitionDetails(EQMSAddRequisitionDetailsformData: EqmsCc, fileList: File[]) {
    let formData = new FormData();
    formData.append("MaintenanceObj", JSON.stringify(EQMSAddRequisitionDetailsformData));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlEQMSCommon + 'UpdateCcRequisitionDetails', formData);
  }

  GetChangeControlList() {
    return this._http.get(this._urlEQMSCommon + 'GetCCList');
  }

 
  GetChangeDetailsList(ChangeControlRequisitionId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetChangeDetailsList/' + ChangeControlRequisitionId, ChangeControlRequisitionId);
  }
  SaveEqmsCcUserSign(EQMSAddRequisitionDetailsformData: EqmsCc) {
    return this._http.post(this._urlEQMSCommon + 'SaveCcUserSign', EQMSAddRequisitionDetailsformData);
  }
  SaveFirstLevelSign(EQMSFormData: FormData) {
    return this._http.post(this._urlEQMSCommon + 'SaveFirstLevelSign', EQMSFormData);
  }
  SaveSecondLevelSign(EQMSFormData: FormData) {
    return this._http.post(this._urlEQMSCommon + 'SaveSecondLevelSign', EQMSFormData);
  }
  SaveFirstLevelQADesSign(EQMSFormData: FormData) {
    return this._http.post(this._urlEQMSCommon + 'SaveFirstLevelQADesSign', EQMSFormData);
  }
  SaveSecondLevelQAHeadSign(EQMSFormData: FormData) {
    return this._http.post(this._urlEQMSCommon + 'SaveSecondLevelQAHeadSign', EQMSFormData);
  }
  SaveClosureFHSign(EQMSFormData: FormData) {
    return this._http.post(this._urlEQMSCommon + 'SaveClosureFHSign', EQMSFormData);
  }
  SaveClosureQHSign(EQMSFormData: FormData) {
    return this._http.post(this._urlEQMSCommon + 'SaveClosureQHSign', EQMSFormData);
  }
  GetClosureAapprovalData(EqmsCcChangeControlNumberId, UserId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetClosureAapprovalData/' + EqmsCcChangeControlNumberId+"/"+UserId, EqmsCcChangeControlNumberId,UserId);
  }
  SavePrimaryAssessFirstLevelSign(EQMSFormData: FormData) {
    return this._http.post(this._urlEQMSCommon + 'SavePrimaryAssessFirstLevelSign', EQMSFormData);
  }
  SaveChangeDetails(EQMSAddChangeDetailsformData, fileList: File[]) {
    let formData = new FormData();
    formData.append("MaintenanceObj", JSON.stringify(EQMSAddChangeDetailsformData));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlEQMSCommon + 'SaveCcChangeDetails', formData);
  }
  SaveApprovalsChangeDetails(EQMSAddApprovalsChangeDetailsformData: FormData) {
    return this._http.post(this._urlEQMSCommon + 'SaveApprovalsChangeDetails', EQMSAddApprovalsChangeDetailsformData);
  }
  SavePrimaryAssessment(EQMSAddChangeDetailsformData: EqmsCcChangeDetails) {
    return this._http.post(this._urlEQMSCommon + 'SaveCcPrimaryAssessment', EQMSAddChangeDetailsformData);
  }
  SavePrimaryAssessmentbyDeptSign(EQMSAddApprovalsChangeDetailsformData) {
    return this._http.post(this._urlEQMSCommon + 'SavePrimaryAssessmentbyDeptSign', EQMSAddApprovalsChangeDetailsformData);
  }
  SaveAddDeptForApprovalPrimaryAssessment(EQMSDeptPrimaryAssessApprovalStatusform) {
    return this._http.post(this._urlEQMSCommon + 'SaveAddDeptForApprovalPrimaryAssessment', EQMSDeptPrimaryAssessApprovalStatusform);
  }
  SaveQualityAssuarance(EQMSAddQualityAssuaranceformData: EqmsCcQualityAssuarance) {
    return this._http.post(this._urlEQMSCommon + 'SaveCcQualityAssuarance', EQMSAddQualityAssuaranceformData);
  }
  SaveCcUserSignQualityAssuarance(EQMSAddQualityAssuaranceformData: EqmsCcQualityAssuarance) {
    return this._http.post(this._urlEQMSCommon + 'SaveCcUserSignQualityAssuarance', EQMSAddQualityAssuaranceformData);
  }
  SaveApprovalStatus(EQMSAddApprovalStatusformData: EqmsCcApprovalStatus) {
    return this._http.post(this._urlEQMSCommon + 'SaveCcApprovalStatus', EQMSAddApprovalStatusformData);
  }
  GetChangeDetailsListOnCDId(ChangeControlDetailsId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetChangeDetailsListOnCDId/' + ChangeControlDetailsId, ChangeControlDetailsId);
  }

  GetChangeControlListonEqmsCcRequisitionId(EqmsCcRequisitionId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetChangeControlListonEqmsCcRequisitionId/' + EqmsCcRequisitionId, EqmsCcRequisitionId);
  }
  GetRequisitioAapprovalData(EqmsCcChangeControlNumberId, UserId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetRequisitioAapprovalData/' + EqmsCcChangeControlNumberId+"/"+UserId, EqmsCcChangeControlNumberId,UserId);
  }
  GetQualityAssuranceAapprovalData(EqmsCcChangeControlNumberId, UserId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetQualityAssuranceAapprovalData/' + EqmsCcChangeControlNumberId+"/"+UserId, EqmsCcChangeControlNumberId,UserId);
  }
  GetgetUserLeadData(UserId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetgetUserLeadData/'+ UserId, UserId);
  }
  UpdateChangeDetails(EQMSAddChangeDetailsformData, fileList: File[]) {
    let formData = new FormData();
    formData.append("MaintenanceObj", JSON.stringify(EQMSAddChangeDetailsformData));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlEQMSCommon + 'UpdateCcChangeDetails', formData);
  }
  GetPrimaryAssessmentonEqmsCcChangeControlId(ChangeControlNumberId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetPrimaryAssessmentonEqmsCcChangeControlId/' + ChangeControlNumberId, ChangeControlNumberId);
  }
  GetChangeDetailsAapprovalData(EqmsCcChangeControlNumberId, UserId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetChangeDetailsAapprovalData/' + EqmsCcChangeControlNumberId+"/"+UserId, EqmsCcChangeControlNumberId,UserId);
  }
  GetDeptPrimaryAssessmentAapprovalData(EqmsCcChangeControlNumberId, UserId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetDeptPrimaryAssessmentAapprovalData/' + EqmsCcChangeControlNumberId+"/"+UserId, EqmsCcChangeControlNumberId,UserId);
  }
  GetPrimaryAssessmentAapprovalData(EqmsCcChangeControlNumberId, UserId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetPrimaryAssessmentAapprovalData/' + EqmsCcChangeControlNumberId+"/"+UserId, EqmsCcChangeControlNumberId,UserId);
  }
  GetGetApprovalNeedListonEqmsCcChangeControlId(ChangeControlNumberId, UserID) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetGetApprovalNeedListonEqmsCcChangeControlId/' + ChangeControlNumberId+"/"+UserID, ChangeControlNumberId,UserID);
  }
  UpdateCcPrimaryAssessment(EQMSAddChangeDetailsformData: EqmsCcChangeDetails) {
    return this._http.post(this._urlEQMSCommon + 'UpdateCcPrimaryAssessment', EQMSAddChangeDetailsformData);
  }
  GetCCQualityAssuaranceonEqmsCcChangeControlId(ChangeControlNumberId) {
    debugger;
    return this._http.post(this._urlEQMSCommon + 'GetCCQualityAssuaranceonEqmsCcChangeControlId/' + ChangeControlNumberId, ChangeControlNumberId);
  }
//Function For Update status
  UpdateChangeDetailsStatus(EQMSAddChangeDetailsformData, fileList: File[]) {
    let formData = new FormData();
    formData.append("MaintenanceObj", JSON.stringify(EQMSAddChangeDetailsformData));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlEQMSCommon + 'UpdateCcChangeDetailsStatus', formData);
  }
  private data = {};  
  
  setOption(option, value) {  
    this.data[option] = value;  
  }  
  
  getOption() {  
    return this.data;  
  }  
  private Rowdata = "";  
  setOptionEditRow(Data) {  
    this.Rowdata = Data;  
  }  
  
  getOptionEditRow() {  
    return this.Rowdata;  
  }  
}
