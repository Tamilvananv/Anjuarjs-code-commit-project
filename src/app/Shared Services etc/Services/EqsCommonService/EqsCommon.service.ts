import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EqsCommonService {
  readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';
  readonly _urlEqsMaster = environment.apiUrl + '/api/EQSMaster/';
  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

  GetEquipmentList() {
    return this._http.get(this._urlEqsCommon + 'GetEquipmentList');
  }
  GetEqsQualificationTypeList() {
    return this._http.get(this._urlEqsCommon + 'GetEqsQualificationTypeList');
  }
  GetEqsMaintenanceTypeList() {
    return this._http.get(this._urlEqsCommon + 'EqsMaintenanceTypeList');
  }
  GetEquipmentTypeList() {
    return this._http.get(this._urlEqsCommon + 'GetEquipmentTypeList');
  }
  GetEqsStorageLocationList() {
    return this._http.get(this._urlEqsCommon + 'GetEqsStorageLocationList');
  }
  GetEquipmentTypeById(EqsEquipmentId) {
    return this._http.post(this._urlEqsCommon + 'GetEquipmentTypeById/' + EqsEquipmentId, EqsEquipmentId);
  }
  GetMaintenanceTypeByEquipmentId(EqsEquipmentId) {
    return this._http.post(this._urlEqsCommon + 'GetMaintenanceTypeByEquipmentId/' + EqsEquipmentId, EqsEquipmentId);
  }
  GetCalibrationRequiredEquipmentId() {
    return this._http.get(this._urlEqsCommon + 'GetCalibrationRequiredEquipmentId');
  }
  EqsMaintenanceTypeList() {
    return this._http.get(this._urlEqsCommon + 'EqsMaintenanceTypeList');
  }
  GetUserList() {
    return this._http.get(this._urlEqsMaster + 'GetUserList');
  }
}
