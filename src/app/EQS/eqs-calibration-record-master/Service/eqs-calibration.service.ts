import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';
import { EqsCalibration } from '../Service/eqs-calibration.model'


@Injectable({
    providedIn: 'root'
})
export class EqsCalibrationService {
    readonly _urlEqsCalibration = environment.apiUrl + '/api/EqsCalibration/';
    readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';

    constructor(private _http: HttpClient, private _toastr: ToastrService, private _eqsCommonService: EqsCommonService) { }

    GetEquipmentList() {
        return this._eqsCommonService.GetEquipmentList();
    }
    GetEquipmentTypeById(EqsEquipmentId) {
        return this._eqsCommonService.GetEquipmentTypeById(EqsEquipmentId);
    }
    GetCalibrationPerformedByNameList() {
        return this._http.get(this._urlEqsCalibration + 'GetCalibrationPerformedByNameList');
    }
    SaveEqsCalibration(obj, calibAttachment: File[], serviceAttachment: File[]) {
      let formData = new FormData();
      formData.append("CalibrationObj", JSON.stringify(obj));
      calibAttachment.forEach((calibAttachment) => {
        formData.append("Calibrationfile", calibAttachment['Attachment']);
      });
      serviceAttachment.forEach((serviceAttachment) => {
        formData.append("Servicefile", serviceAttachment['Attachment']);
      });
      return this._http.post(this._urlEqsCalibration + 'SaveCalibration', formData);
    }
    UpdateEqsCalibration(obj, calibAttachment: File[], serviceAttachment: File[]) {
      let formData = new FormData();
      formData.append("CalibrationObj", JSON.stringify(obj));
      calibAttachment.forEach((calibAttachment) => {
        formData.append("Calibrationfile", calibAttachment['Attachment']);
      });
      serviceAttachment.forEach((serviceAttachment) => {
        formData.append("Servicefile", serviceAttachment['Attachment']);
      });
      return this._http.post(this._urlEqsCalibration + 'UpdateCalibration', formData);
    }
    GetCalibrationList() {
        return this._http.get(this._urlEqsCalibration + 'Get');
    }
    GetCalibrationDetail(EqsCalibrationRecordId) {
        return this._http.post(this._urlEqsCalibration + 'GetCalibrationDetails/' + EqsCalibrationRecordId, EqsCalibrationRecordId);
    }

    GetCalibrationRequiredEquipmentId() {
        return this._eqsCommonService.GetCalibrationRequiredEquipmentId();
    }

    getAccessRight() {
      return this._http.get(this._urlEqsCalibration + 'GetAccessRight');
  }
SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlEqsCommon + 'ReportDownloadlog',ObjAudit);
}

DeleteCalibration(EqsCalibrationRecordId) {
  let params = new HttpParams();
  params = params.append('EqsCalibrationRecordId', EqsCalibrationRecordId.toString());
    return this._http.get(this._urlEqsCalibration + 'DeleteCalibration'  , { params: params });
}

 GetEquipmentTypeList() {
  return this._eqsCommonService. GetEquipmentTypeList();
}

GetEquipmentAndType(EqsEquipmentId) {
  return this._http.post(this._urlEqsCalibration + 'GetEquipmentAndType/' + EqsEquipmentId, EqsEquipmentId);
} 

SaveCalibrationRecord(EqsEquipmentId) {
   let params = new HttpParams();
  params = params.append('EqsEquipmentId', EqsEquipmentId.toString());
    return this._http.get(this._urlEqsCalibration + 'SaveCalibrationRecord'  , { params: params }); 
//  return this._http.post(this._urlEqsCalibration + 'SaveCalibrationRecord', EqsEquipmentId);
}


}
