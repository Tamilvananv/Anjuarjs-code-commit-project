import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { NgForm } from '@angular/forms';
import { Calibration } from './ics-calibration.model';
// import { Parameter } from './ics-parameter.model';

@Injectable({
  providedIn: 'root'
})
export class IcsCalibrationService {
  readonly _urlICSCalibration = environment.apiUrl + '/api/IcsCalibration/';
  readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
  constructor(private _http: HttpClient, private _icsCommonService: IcsCommonService) { }

  // GetInstrumentList() {
  //   return this._icsCommonService.GetInstrumentList();
  // }
  
  GetInstrumentTypeById(InstrumentId) {
    return this._icsCommonService.GetInstrumentTypeById(InstrumentId);
  }
  GetCalibrationList() {
    return this._http.get(this._urlICSCalibration + 'Get');
  }
  GetPerformedByMasterList() {
    return this._icsCommonService.GetPerformedByMasterList();
  }
  GetCalibrationDetail(CalibrationRecId) {
    return this._http.post(this._urlICSCalibration + 'GetQualificationDetails/' + CalibrationRecId, CalibrationRecId);
  }
  SaveCalibration(obj, calibAttachment: File[], serviceAttachment: File[]) {
    let formData = new FormData();
    formData.append("CalibrationObj", JSON.stringify(obj));
    calibAttachment.forEach((calibAttachment) => {
      formData.append("Calibrationfile", calibAttachment['Attachment']);
    });
    serviceAttachment.forEach((serviceAttachment) => {
      formData.append("Servicefile", serviceAttachment['Attachment']);
    });
    return this._http.post(this._urlICSCalibration + 'SaveCalibration', formData);
  }
  UpdateCalibration(obj, calibAttachment: File[], serviceAttachment: File[]) {
    let formData = new FormData();
    formData.append("CalibrationObj", JSON.stringify(obj));
    calibAttachment.forEach((calibAttachment) => {
      formData.append("Calibrationfile", calibAttachment['Attachment']);
    });
    serviceAttachment.forEach((serviceAttachment) => {
      formData.append("Servicefile", serviceAttachment['Attachment']);
    });
    return this._http.post(this._urlICSCalibration + 'UpdateInstrumentCalibration', formData);
  }
  GetSerialNo(ObjList) {
    return this._icsCommonService.GetSerialNo(ObjList);
  }
  GetInstrumentTypeList() {
    return this._icsCommonService.GetInstrumentTypeList();
  }
  getAccessRight() {
    return this._http.get(this._urlICSCalibration + 'GetAccessRight');
}

SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlIcsCommon + 'ReportDownloadlog',ObjAudit);
}


DeleteCalibration(IcsCalibrationRecordId) {
  let params = new HttpParams();
  params = params.append('IcsCalibrationRecordId', IcsCalibrationRecordId.toString());
    return this._http.get(this._urlICSCalibration + 'DeleteCalibration'  , { params: params });
}


GetInstrumentAndType(IcsInstrumentId) {
  return this._http.post(this._urlICSCalibration + 'GetInstrumentAndType/' + IcsInstrumentId, IcsInstrumentId);
} 

SaveCalibrationRecord(IcsInstrumentId) {
   let params = new HttpParams();
  params = params.append('IcsInstrumentId', IcsInstrumentId.toString());
    return this._http.get(this._urlICSCalibration + 'SaveCalibrationRecord'  , { params: params }); 

}

}
