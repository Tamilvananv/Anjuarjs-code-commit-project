import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ImsInward } from './ims-inward.model';
@Injectable({
  providedIn: 'root'
})
export class ImsInwardService {

  readonly _urlImsInwardRecord = environment.apiUrl + '/api/ImsInwardRecord/';
  readonly _urlIMSCommon = environment.apiUrl + '/api/IMSCommon/';

  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

  GetImsInwardRecordList() {
    return this._http.get(this._urlImsInwardRecord + 'GetInwardRecord');
  }

  
  GetImsInwardRecordEditList(ImsInwardRecordId) {
    
    return this._http.post(this._urlImsInwardRecord + 'GetInwardRecord/'  + ImsInwardRecordId , ImsInwardRecordId);
  }
  UpdateInwardMaster(ImsAddInwardForm: ImsInward) {
    return this._http.post(this._urlImsInwardRecord + 'Update', ImsAddInwardForm);
  } 
  GetMaterialIdList() {
    return this._http.get(this._urlIMSCommon + 'GetMaterialIdList');
  }
  //  GetMaterialNameList(ImsMaterialId) {
  //   const data = 'ImsMaterialId=' + ImsMaterialId;
  //   return this._http.post(this._urlImsInwardRecord + 'GetMaterialName/' + ImsMaterialId, data);
  // } 
  GetMaterialNameList(ImsMaterialId) {
    const data = 'ImsMaterialId=' + ImsMaterialId;
    return this._http.post(this._urlIMSCommon + 'GetInwardMaterialName/' + ImsMaterialId, data);
  } 
  GetVendorNameList(ImsMaterialId) {
    const data = 'ImsMaterialId=' + ImsMaterialId;
    return this._http.post(this._urlIMSCommon + 'GetInwardVendorName/' + ImsMaterialId, data);
  } 
  GetStorageLocationList(ImsMaterialId) {
    const data = 'ImsMaterialId=' + ImsMaterialId;
    return this._http.post(this._urlIMSCommon + 'GetInwardStorageLocation/' + ImsMaterialId, data);
  } 
  GetManufacturerList(ImsMaterialId) {
    const data = 'ImsMaterialId=' + ImsMaterialId;
    return this._http.post(this._urlIMSCommon + 'GetManufacturer/' + ImsMaterialId, data);
  } 
 /*  GetVendorNameList(ImsMaterialId) {
    const data = 'ImsMaterialId=' + ImsMaterialId;
    return this._http.post(this._urlImsInwardRecord + 'GetVendorName/' + ImsMaterialId, data);
  } */
  SaveInwardMaster(ImsAddInwardForm) {
    return this._http.post(this._urlImsInwardRecord + 'Save', ImsAddInwardForm);
  }

  GetTypeByInventory(InventoryMasterId) {
    return this._http.post(this._urlImsInwardRecord + 'GetTypeByInventory/' + InventoryMasterId, InventoryMasterId);
  }

  GetDetails(InventoryMasterId){
    return this._http.post(this._urlImsInwardRecord + 'GetDetails/' + InventoryMasterId, InventoryMasterId);
  }
}
