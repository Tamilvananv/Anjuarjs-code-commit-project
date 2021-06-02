import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
//import { IcsMaster } from './ics-master.model';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EqsMaster, EqsMaintenence } from './eqs-master.model';
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { EqsQualification } from './eqs-qualification.model'
import { EqsAvailability } from './eqs-availability.model'
@Injectable({
  providedIn: 'root'
})
export class EquipmentMasterService {
  readonly _urlEqsMaster = environment.apiUrl + '/api/EQSMaster/';
  readonly _urlEqsQualification = environment.apiUrl + '/api/EQSQualification/';
  readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';

  constructor(private _http: HttpClient, private _toastr: ToastrService, private _eqsCommonService: EqsCommonService, private _commonListService: CommonListService) { }

  GetEqsList()//this service for grid binding of eqs master
  {
    return this._http.get(this._urlEqsMaster + 'Get');
  }
  GetEquipmentTypeList() {
    return this._http.get(this._urlEqsMaster + 'GetEquipmentTypeList');
  }
  GetEqsCriticalityList() {
    return this._http.get(this._urlEqsMaster + 'GetEqsCriticalityList');
  }
  GetEqsStorageLocationList() {
    return this._http.get(this._urlEqsMaster + 'GetEqStorageLocationList');
  }
  GetEqsMasterDetail(EqsEquipmentId) {
    const data = 'id=' + EqsEquipmentId;
    return this._http.post(this._urlEqsMaster + 'GetEquipmentMasterDetails/' + EqsEquipmentId, data);
  }
  SaveEqsMaster(obj, imagefile: File,ursFileList:File[],poFileList:File[]) {
        let formData = new FormData();
        formData.append("EQSObj", JSON.stringify(obj));
        formData.append("EquipmentImagefile", imagefile);
        ursFileList.forEach((ursFileList) => {
          formData.append("URSFile", ursFileList['Attachment']);
        });
        poFileList.forEach((poFileList) => {
          formData.append("POFile", poFileList['Attachment']);
        });
    return this._http.post(this._urlEqsMaster + 'Save', formData);
  }

  UpdateEqsMaster(obj, imagefile: File,ursFileList:File[],poFileList:File[]) {
        let formData = new FormData();
        formData.append("EQSObj", JSON.stringify(obj));
        formData.append("EquipmentImagefile", imagefile);
        ursFileList.forEach((ursFileList) => {
          formData.append("URSFile", ursFileList['Attachment']);
        });
        poFileList.forEach((poFileList) => {
          formData.append("POFile", poFileList['Attachment']);
        });
    return this._http.post(this._urlEqsMaster + 'Update', formData);
  }

  GetEqsQualificationTypeList() {
    return this._eqsCommonService.GetEqsQualificationTypeList();
  }

  GetEqsQualification(EqsEquipmentId) {
    return this._http.post(this._urlEqsMaster + 'GetEqsQualification/' + EqsEquipmentId, EqsEquipmentId);
  }

  SaveEqsQualification(obj, fileList: File[]) {
    let formData = new FormData();
    formData.append("QualificationObj", JSON.stringify(obj));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlEqsQualification + 'SaveQualification', formData);
  }
  SaveEqsCalibration(CalibrationFormData: EqsMaster) {
    return this._http.post(this._urlEqsMaster + 'SaveCalibration', CalibrationFormData);
  }

  GetMonthList() {
    return this._commonListService.GetMonthList();
  }

  GetMonthsWithNAList() {
    return this._commonListService.GetMonthsWithNAList();
  }

  SaveMaintenence(MaintenenceFormData: EqsMaintenence) {
    return this._http.post(this._urlEqsMaster + 'SaveMaintenence', MaintenenceFormData);
  }

  GetEqsMaintenenceList(EqsEquipmentId) {
    return this._http.post(this._urlEqsMaster + 'GetMaintenenceList/' + EqsEquipmentId, EqsEquipmentId);
  }

  GetEqsMaintenanceTypeList() {
    return this._eqsCommonService.GetEqsMaintenanceTypeList();
  }

  SetAvailabilty(EqsEquipmentId) {
    return this._http.post(this._urlEqsMaster + 'SetAvailabilty/' + EqsEquipmentId, EqsEquipmentId);
  }
  GetCustomHeaderList() {
    return this._http.get(this._urlEqsMaster + 'GetCustomHeaderList');
  }
  GetCustomHeaderDetails(EqsEquipmentId) {
    return this._http.post(this._urlEqsMaster + 'GetCustomHeaderDetails/' + EqsEquipmentId, EqsEquipmentId);
  }
  GetDepartmentList() {
    return this._http.get(this._urlEqsMaster + 'GetDepartmentList');
  }

  SaveAvailability(EqsAvailabilityForm: EqsAvailability) {
    return this._http.post(this._urlEqsMaster + 'SaveAvailability', EqsAvailabilityForm);
  }
  SaveCustomHeader(objCustomHeaderList) {
    return this._http.post(this._urlEqsMaster + 'SaveCustomHeader', objCustomHeaderList);
  }

  getAccessRight() {
    return this._http.get(this._urlEqsMaster + 'GetAccessRight');
}
GetURSList()//this service for grid binding of eqs master
{
  return this._http.get(this._urlEqsMaster + 'GetURSList');
}
GetPOList()//this service for grid binding of eqs master
{
  return this._http.get(this._urlEqsMaster + 'GetPOList');
}
GetManufacturerList()//this service for grid binding of eqs master
{
  return this._http.get(this._urlEqsMaster + 'GetManufacturerList');
}

GetMaintenenceDetails(EqsMaintenenceTypeFrequencyId) {
  return this._http.post(this._urlEqsMaster + 'GetMaintenenceDetails/' + EqsMaintenenceTypeFrequencyId, EqsMaintenenceTypeFrequencyId);
}
SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlEqsCommon + 'ReportDownloadlog',ObjAudit);
}

}
