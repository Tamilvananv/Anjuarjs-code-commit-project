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
export class IcsCommonService {
  readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

  GetInstrumentList() {
    return this._http.get(this._urlIcsCommon + 'GetInstrumentList');
  }
  GetCalibrationRequiredInstrumentList() {
    return this._http.get(this._urlIcsCommon + 'GetCalibrationRequiredInstrumentList');
  }
  GetIcsQualificationTypeList() {
    return this._http.get(this._urlIcsCommon + 'GetIcsQualificationTypeList');
  }
  GetIcsMaintenanceTypeList() {
    return this._http.get(this._urlIcsCommon + 'GetMaintenanceTypeList');
  }
  GetIcsMaintenanceType(IcsInstrumentId) {
    return this._http.post(this._urlIcsCommon + 'GetMaintenanceTypeList/' + IcsInstrumentId, IcsInstrumentId);
  }
  GetInstrumentTypeList() {
    return this._http.get(this._urlIcsCommon + 'GetInstrumentTypeList');
  }
  GetInstrumentTypeOrderBySrNo() {
    return this._http.get(this._urlIcsCommon + 'GetInstrumentTypeMasterList');
  }
  GetIcsStorageLocationList() {
    return this._http.get(this._urlIcsCommon + 'GetIcsStorageLocationList');
  }
  GetInstrumentTypeById(InstrumentId) {
    return this._http.post(this._urlIcsCommon + 'GetInstrumentTypeById/' + InstrumentId, InstrumentId);
  }
  GetPerformedByMasterList() {
    return this._http.get(this._urlIcsCommon + 'GetPerformedByMasterList');
  }
  GetSerialNo(List: Array<any>) {
    console.log(List);
    var SrNo = [];
    for (let i = 0; i < List.length; i++) {
      SrNo.push(i);
    }
    return SrNo;
  }

  GetMaintenanceTypeByInstrumentId(IcsInstrumentId) {
    return this._http.post(this._urlIcsCommon + 'GetMaintenanceTypeByInstrumentId/' + IcsInstrumentId, IcsInstrumentId);
  }
  GetMatchingInstrumentList(SearchChar) {
    return this._http.post(this._urlIcsCommon + 'GetMatchingInstrumentList/' + SearchChar, SearchChar);
  }
}
