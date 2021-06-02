import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ProgramCodeEnt,TargetIdEnt } from "../service/eln-user-setting.model";
@Injectable({
  providedIn: "root"
})
export class ELNUserSettingService {
  readonly _urlELNUserSetting = environment.apiUrl + "/api/ELNUserSetting/";

  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

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


  GetTargetId() {
    return this._http.get(this._urlELNUserSetting + "GetTargetId");
  }
  SaveTargetId(TargetIdFormData: TargetIdEnt) {
    return this._http.post(
      this._urlELNUserSetting + "SaveTargetId",
      TargetIdFormData
    );
  }
  GetTargetIdDetail(ELNTargetId) {
    return this._http.post(
      this._urlELNUserSetting + "GetTargetIdDetail/" + ELNTargetId,
      ELNTargetId
    );
  }
  UpdateTargetId(TargetIdFormData: TargetIdEnt) {
    return this._http.post(
      this._urlELNUserSetting + "UpdateTargetId",
      TargetIdFormData
    );
  }
  getAccessRight() {
    return this._http.get(this._urlELNUserSetting + 'GetAccessRight');
}


}
