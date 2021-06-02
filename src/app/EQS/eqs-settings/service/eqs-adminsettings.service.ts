import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
  })
  export class EquipmentAdminSettingService {
    readonly _urlAdminUserSetting = environment.apiUrl + '/api/EQSAdminSetting/';
    readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';
    
    constructor(private _http: HttpClient, ) { }
  
    GetQualificationList() {
      return this._http.get(this._urlAdminUserSetting + 'GetQualification');    
    }
    SaveReportDownloadLogInAudit(ObjAudit) {
        return this._http.post(this._urlEqsCommon + 'ReportDownloadlog',ObjAudit);
      }
   
  
   
  }