import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ImsStorageLocation } from './ims-storage-location.model';
import { ImsVendor } from './ims-vendor-master.model';
import { ImsManufacturer } from './ims-manufacturer.model';
import { ImsInventoryCategory } from './ims-inventory-category.model';
import { ImsInventorySubCategory } from './ims-inventory-sub-category.model';
import { ImsCategoryMaterial } from './ims-category-material.model';
// import { ImsInventorySubCategory } from './ims-inventory-sub-category.model';
@Injectable({
  providedIn: 'root'
})
export class ImsSettingsService {

  readonly _urlImsStorageLocation = environment.apiUrl + '/api/ImsStorageLocation/';
  readonly _urlImsVendorMaster = environment.apiUrl + '/api/ImsVendorMaster/';
  readonly _urlImsManufacturer = environment.apiUrl + '/api/ImsManufacturer/';
  readonly _urlImsCategory = environment.apiUrl + '/api/ImsCategory/';
  readonly _urlImsSubCategory = environment.apiUrl + '/api/ImsSubCategory/';
  readonly _urlIMSCommon = environment.apiUrl + '/api/IMSCommon/';
  readonly _urlImsCategoryMaterial = environment.apiUrl + '/api/ImsCategoryMaterial/';

  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

  GetImsStorageLocationList() {
    return this._http.get(this._urlImsStorageLocation + 'GetImsStorageLocationList');
  }
  addStorageLocation(ImsStorageLocationForm) {
    return this._http.post(this._urlImsStorageLocation + 'SaveStorageLocation', ImsStorageLocationForm);
  }

  ValidateRange(StorageLocationForm) {
    let Result = true;
    const ImsStorageTemperatureMinValue = parseFloat(StorageLocationForm.ImsStorageTemperatureMinValue);
    const ImsStorageTemperatureMaxValue = parseFloat(StorageLocationForm.ImsStorageTemperatureMaxValue);
    if (ImsStorageTemperatureMaxValue < ImsStorageTemperatureMinValue) {
      this._toastr.warning('Max Value Should be Greater than Min Value ');
      Result = false;
    } else if (ImsStorageTemperatureMinValue > ImsStorageTemperatureMaxValue) {
      this._toastr.warning('Min Value Should be Less than Max Value ');
      Result = false;
    } else {
      Result = true;
    }
    return Result;
  }
  GetStorageLocationDetail(StorageLocationId) {
    return this._http.post(this._urlImsStorageLocation + 'GetStorageLocationDetail/' + StorageLocationId, StorageLocationId);
  }
  UpdateStorageLocation(StorageLocationFrom: ImsStorageLocation) {
    return this._http.post(this._urlImsStorageLocation + 'UpdateStorageLocation', StorageLocationFrom);
  }

  GetManufacturerList() {
    return this._http.get(this._urlImsManufacturer + 'GetManufacturer');
  }
  SaveManufacturer(ImsManufacturerForm) {
    return this._http.post(this._urlImsManufacturer + 'Save', ImsManufacturerForm);
  }
  GetManufacturerDetail(ImsManufacturerId) {
    return this._http.post(this._urlImsManufacturer + 'GetImsManufacturerDetail/' + ImsManufacturerId, ImsManufacturerId);
  }
  UpdateManufacturer1(ManufacturerFrom: ImsManufacturer) {
    return this._http.post(this._urlImsManufacturer + 'Update', ManufacturerFrom);
  }

  GetVendorList() {
    return this._http.get(this._urlImsVendorMaster + 'GetVendorMaster');
  }
  SaveVendor(ImsVendorForm) {
    return this._http.post(this._urlImsVendorMaster + 'Save', ImsVendorForm);
  }

  GetVendorDetail(ImsVendorMasterId) {
    return this._http.post(this._urlImsVendorMaster + 'GetImsVendorDetail/' + ImsVendorMasterId, ImsVendorMasterId);
  }
  UpdateVendor(VendorFrom: ImsVendor) {
    return this._http.post(this._urlImsVendorMaster + 'Update', VendorFrom);
  }

  SaveInventoryCategory(ImsInventoryCategoryForm) {
    return this._http.post(this._urlImsCategory + 'Save', ImsInventoryCategoryForm);
  }
  GetCategoryNameList() {
    return this._http.get(this._urlIMSCommon + 'GetCategoryNameList');
  }
  GetSubCategoryNameList1(ImsInventorycategoryId) {
    const data = 'ImsInventorycategoryId=' + ImsInventorycategoryId;
    return this._http.post(this._urlIMSCommon + 'GetSubCategoryNameList/' + ImsInventorycategoryId, data);
  }
  SaveInventorySubCategory(InventorySubCategoryTabForm) {
    return this._http.post(this._urlImsSubCategory + 'Save', InventorySubCategoryTabForm);
  }
  SaveImsCategoryMaterial(ImsCategoryMaterialForm) {
    return this._http.post(this._urlImsCategoryMaterial + 'Save', ImsCategoryMaterialForm);
  }
  GetCategoryMaterialList(ImsInventorySubcategoryId) {
    const data = 'ImsInventorySubcategoryId=' + ImsInventorySubcategoryId;
    return this._http.post(this._urlIMSCommon + 'GetCategoryMaterialNameList/' + ImsInventorySubcategoryId, data);
  }

  GetInvMatList() {
    return this._http.get(this._urlImsCategoryMaterial + 'GetInvCatMaterialList');
  }
  
}
