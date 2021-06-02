import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ProgramCodeEnt, SampleBarCodeEnt, TestMaterialEnt, TestTypeEnt, TypeEnt } from "../service/qceln-user-setting.model";
@Injectable({
  providedIn: "root"
})
export class QCELNUserSettingService {
  readonly _urlELNUserSetting = environment.apiUrl + "/api/QCELNUserSetting/";

  constructor(private _http: HttpClient, private _toastr: ToastrService) { }
  getAccessRight() {
    return this._http.get(this._urlELNUserSetting + 'GetAccessRight');
  }

  GetProgramCode() {
    return this._http.get(this._urlELNUserSetting + "GetProgramCode");
  }

  SaveProgramCode(ProgramCodeEnt: ProgramCodeEnt) {
    return this._http.post(
      this._urlELNUserSetting + "SaveProgramCode",
      ProgramCodeEnt
    );
  }

  GetProgramCodeDetail(ProgramCodeId) {
    return this._http.post(
      this._urlELNUserSetting + "GetProgramCodeDetail/" + ProgramCodeId,
      ProgramCodeId
    );
  }

  UpdateProgramCode(ProgramCodeEnt: ProgramCodeEnt) {
    return this._http.post(
      this._urlELNUserSetting + "UpdateProgramCode",
      ProgramCodeEnt
    );
  }

  SaveSampleBarcode(SampleBarcodeFormData: SampleBarCodeEnt) {
    return this._http.post(
      this._urlELNUserSetting + "SaveSampleBarcode",
      SampleBarcodeFormData
    );
  }
  UpdateSampleBarcode(SampleBarcodeFormData: SampleBarCodeEnt) {
    return this._http.post(
      this._urlELNUserSetting + "UpdateSampleBarcode",
      SampleBarcodeFormData
    );
  }
  GetSampleBarcodeId() {
    return this._http.get(this._urlELNUserSetting + "GetSampleBarcode");
  }
  GetSampleBarcodeDetail(recordId) {
    let params = new HttpParams();
    params = params.append('RecordId', recordId.toString());
    return this._http.get(this._urlELNUserSetting + 'GetSampleBarcodeDetails', { params: params });
  }

  SaveTestMaterial(TestMaterialFormData: TestMaterialEnt) {
    return this._http.post(this._urlELNUserSetting + "SaveTestMaterialId", TestMaterialFormData);
  }
  UpdateTestMaterial(TestMaterialFormData: TestMaterialEnt) {
    return this._http.post(this._urlELNUserSetting + "UpdateTestMaterial", TestMaterialFormData);
  }
  GetTestMaterial() {
    return this._http.get(this._urlELNUserSetting + "GetTestMaterialId");
  }
  GetTestMaterialDetail(recordId) {
    let params = new HttpParams();
    params = params.append('RecordId', recordId.toString());
    return this._http.get(this._urlELNUserSetting + 'GetTestMateriaDetail', { params: params });
  }

  SaveTestType(TestTypeFormData: TestTypeEnt) {
    return this._http.post(this._urlELNUserSetting + "SaveTestTypeId", TestTypeFormData);
  }
  UpdateTestType(TestTypeFormData: TestTypeEnt) {
    return this._http.post(this._urlELNUserSetting + "UpdateTestTypeId", TestTypeFormData);
  }
  GetTestType() {
    return this._http.get(this._urlELNUserSetting + "GetTestTypeId");
  }
  GetTestTypeDetail(recordId) {
    let params = new HttpParams();
    params = params.append('RecordId', recordId.toString());
    return this._http.get(this._urlELNUserSetting + 'GetTestTypeDetail', { params: params });
  }

  SaveType(TypeFormData: TypeEnt) {
    return this._http.post(this._urlELNUserSetting + "SaveTypeId", TypeFormData);
  }
  UpdateType(TypeFormData: TypeEnt) {
    return this._http.post(this._urlELNUserSetting + "UpdateTypeId", TypeFormData);
  }
  GetType() {
    return this._http.get(this._urlELNUserSetting + "GetTypeId");
  }
  GetTypeDetail(recordId) {
    let params = new HttpParams();
    params = params.append('RecordId', recordId.toString());
    return this._http.get(this._urlELNUserSetting + 'GetTypeDetail', { params: params });
  }
}