import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { NgForm } from '@angular/forms';
import { InstrumentType, StorageLocation,CustomHeader } from './useSettings.model';

@Injectable({
  providedIn: 'root'
})
export class IcsUserSettingService {
  readonly _urlICSUserSetting = environment.apiUrl + '/api/ICSUserSetting/';
  readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
  constructor(private _http: HttpClient, private _toastr: ToastrService, private _icsCommonService: IcsCommonService) { }

  // GetInstrumentTypeList() {
  //   return this._icsCommonService.GetInstrumentTypeOrderBySrNo();
  // }
  SaveInstrumentType(InstrumentTypeForm: InstrumentType) {
    return this._http.post(this._urlICSUserSetting + 'SaveInstrumentType', InstrumentTypeForm);
  }
  // GetIcsStorageLocationList() {
  //   return this._icsCommonService.GetIcsStorageLocationList();
  // }
  SaveStorageLocation(StorageLocationFrom: StorageLocation) {
    return this._http.post(this._urlICSUserSetting + 'SaveStorageLocation', StorageLocationFrom);
  }
  GetInstrumentTypeDetail(InstrumentTypeId) {
    return this._http.post(this._urlICSUserSetting + 'GetInstrumentTypeDetail/' + InstrumentTypeId, InstrumentTypeId);
  }
  UpdateInstrumentType(InstrumentTypeForm: InstrumentType) {
    return this._http.post(this._urlICSUserSetting + 'UpdateInstrumentType', InstrumentTypeForm);
  }
  GetStorageLocationDetail(StorageLocationId) {
    return this._http.post(this._urlICSUserSetting + 'GetStorageLocationDetail/' + StorageLocationId, StorageLocationId);
  }
  UpdateStorageLocation(StorageLocationFrom: StorageLocation) {
    return this._http.post(this._urlICSUserSetting + 'UpdateStorageLocation', StorageLocationFrom);
  }

  GetCustomHeaderDetail(CustomHeaderMasterId) {
    return this._http.post(this._urlICSUserSetting + 'GetCustomHeaderDetail/' + CustomHeaderMasterId, CustomHeaderMasterId);
  }
  GetCustomHeader() {
    return this._http.get(this._urlICSUserSetting + 'GetCustomHeader');
  }
  SaveCustomHeader(CustomHeaderFrom: CustomHeader) {
    return this._http.post(this._urlICSUserSetting + 'SaveCustomHeader', CustomHeaderFrom);
  }
  UpdateCustomHeader(CustomHeaderFrom: CustomHeader) {
    return this._http.post(this._urlICSUserSetting + 'UpdateCustomHeader', CustomHeaderFrom);
  }
  DeleteCustomHeader(CustomHeaderMasterId) {
    let params = new HttpParams();
    params = params.append('CustomHeaderMasterId', CustomHeaderMasterId.toString());
      return this._http.get(this._urlICSUserSetting + 'DeleteCustomHeader'  , { params: params });
  }
  DeleteInstrumentType(InstrumentTypeId) {
    let params = new HttpParams();
    params = params.append('InstrumentTypeId', InstrumentTypeId.toString());
      return this._http.get(this._urlICSUserSetting + 'DeleteInstrumentType'  , { params: params });
  }
  DeleteStorageLocation(StorageLocationId) {
    let params = new HttpParams();
    params = params.append('StorageLocationId', StorageLocationId.toString());
      return this._http.get(this._urlICSUserSetting + 'DeleteStorageLocation'  , { params: params });
  }
  getAccessRight() {
    return this._http.get(this._urlICSUserSetting + 'GetAccessRight');
}

SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlIcsCommon + 'ReportDownloadlog',ObjAudit);
}


}
