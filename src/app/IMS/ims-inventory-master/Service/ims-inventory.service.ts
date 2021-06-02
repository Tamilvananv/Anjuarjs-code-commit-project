import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ImsMaster } from './ims-inventory.model';
@Injectable({
  providedIn: 'root'
})
export class ImsInventoryService {
  readonly _urlIMSCommon = environment.apiUrl + '/api/IMSCommon/';
  readonly _urlImsInventoryMaster = environment.apiUrl + '/api/ImsInventoryMaster/';
  // readonly _urlImsVendorMaster = environment.apiUrl + '/api/ImsVendorMaster/';
  // readonly _urlImsManufacturer = environment.apiUrl + '/api/ImsManufacturer/';

  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

   GetImsList() {
    return this._http.get(this._urlImsInventoryMaster + 'Get');
   }
   SaveImsMaster(ImsAddInventoryForm) {
    return this._http.post(this._urlImsInventoryMaster + 'Save', ImsAddInventoryForm);
  }
  GetInventoryMasterDetails(ImsInventoryMasterId) {
    const data = 'id=' + ImsInventoryMasterId;
    return this._http.post(this._urlImsInventoryMaster + 'GetInventoryMasterDetails/' + ImsInventoryMasterId, data);
  }
   UpdateImsMaster(ImsAddInventoryForm: ImsMaster) {
    return this._http.post(this._urlImsInventoryMaster + 'Update', ImsAddInventoryForm);
  } 
  GetStorageLocationList() {
    return this._http.get(this._urlIMSCommon + 'GetStorageLocationList');
  }
  GetVendorMasterList() {
    return this._http.get(this._urlIMSCommon + 'GetVendorMasterList');
  }
  GetManufacturerList() {
    return this._http.get(this._urlIMSCommon + 'GetManufacturerList');
  }

  GetStorageLocationNameBasedOnTemp(StorageTem) {
    let params = new HttpParams();
   params = params.append('StorageTem', StorageTem.toString());
   // return this._http.post(this._urlIMSCommon + 'GetStorageLocationNameBasedOnTemp/' + StorageTem, StorageTem);
    return this._http.get(this._urlIMSCommon + 'GetStorageLocationNameBasedOnTemp'  , { params: params });
  }

}
