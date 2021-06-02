import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { EquipmentStorageLocation, EquipmentType,CustomHeader } from "../service/userSettings.model";
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';

@Injectable({
  providedIn: "root",
})
export class EquipmentUserSettingService {
  readonly _urlEqsUserSetting = environment.apiUrl + '/api/EQSUserSetting/';
  readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';

  constructor(private _http: HttpClient, private _toastr: ToastrService, private _eqsCommonService: EqsCommonService) { }

  GetEquipmentStorageLocation() {
    return this._http.get(this._urlEqsUserSetting + 'GetStorageLocation');
    // return this._eqsCommonService.GetEqsStorageLocationList();
  }
  SaveEquipmentType(EquipmentTypeForm: EquipmentType) {
    return this._http.post(this._urlEqsUserSetting + 'SaveEquipmentType', EquipmentTypeForm);
  }
  SaveEquipmentStorageLocation(StorageLocationFrom: EquipmentStorageLocation) {
    return this._http.post(this._urlEqsUserSetting + 'SaveStorageLocation', StorageLocationFrom);
  }
  GetEquipmentType() {
    return this._http.get(this._urlEqsUserSetting + 'GetEquipmentType');
    //return this._eqsCommonService.GetEquipmentTypeList();
  }
  GetEquipmentTypeDetail(EquipmentTypeId) {
    return this._http.post(this._urlEqsUserSetting + 'GetEquipmentTypeDetail/' + EquipmentTypeId, EquipmentTypeId);
  }
  UpdateEquipmentType(EquipmentTypeForm: EquipmentType) {
    return this._http.post(this._urlEqsUserSetting + 'UpdateEquipmentType', EquipmentTypeForm);
  }
  GetStorageLocationDetail(StorageLocationId) {
    return this._http.post(this._urlEqsUserSetting + 'GetStorageLocationDetail/' + StorageLocationId, StorageLocationId);
  }
  UpdateStorageLocation(StorageLocationFrom: EquipmentStorageLocation) {
    return this._http.post(this._urlEqsUserSetting + 'UpdateStorageLocation', StorageLocationFrom);
  }

  GetCustomHeaderDetail(CustomHeaderMasterId) {
    return this._http.post(this._urlEqsUserSetting + 'GetCustomHeaderDetail/' + CustomHeaderMasterId, CustomHeaderMasterId);
  }
  GetCustomHeader() {
    return this._http.get(this._urlEqsUserSetting + 'GetCustomHeader');
  }
  SaveCustomHeader(CustomHeaderFrom: CustomHeader) {
    return this._http.post(this._urlEqsUserSetting + 'SaveCustomHeader', CustomHeaderFrom);
  }
  UpdateCustomHeader(CustomHeaderFrom: CustomHeader) {
    return this._http.post(this._urlEqsUserSetting + 'UpdateCustomHeader', CustomHeaderFrom);
  }
  DeleteCustomHeader(CustomHeaderMasterId) {
    let params = new HttpParams();
    params = params.append('CustomHeaderMasterId', CustomHeaderMasterId.toString());
      return this._http.get(this._urlEqsUserSetting + 'DeleteCustomHeader'  , { params: params });
  }
  DeleteEquipmentType(EquipmentTypeId) {
    let params = new HttpParams();
    params = params.append('EquipmentTypeId', EquipmentTypeId.toString());
      return this._http.get(this._urlEqsUserSetting + 'DeleteEquipmentType'  , { params: params });
  }
  DeleteStorageLocation(StorageLocationId) {
    let params = new HttpParams();
    params = params.append('StorageLocationId', StorageLocationId.toString());
      return this._http.get(this._urlEqsUserSetting + 'DeleteStorageLocation'  , { params: params });
  }
  getAccessRight() {
    return this._http.get(this._urlEqsUserSetting + 'GetAccessRight');
}
SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlEqsCommon + 'ReportDownloadlog',ObjAudit);
}
}
