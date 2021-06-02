import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';
import { EqsMaintenance } from '../Service/eqs-maintenance.model'


@Injectable({
    providedIn: 'root'
})
export class EqsMaintenanceService {
    readonly _urlEqsMaintenance = environment.apiUrl + '/api/EqsMaintenance/';
    readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';
    
    constructor(private _http: HttpClient, private _toastr: ToastrService, private _eqsCommonService: EqsCommonService) { }

    GetEquipmentList() {
        return this._eqsCommonService.GetEquipmentList();
    }
    GetEquipmentTypeById(EqsEquipmentId) {
        return this._eqsCommonService.GetEquipmentTypeById(EqsEquipmentId);
    }
    GetMaintenanceTypeByEquipmentId(EqsEquipmentId) {
        return this._eqsCommonService.GetMaintenanceTypeByEquipmentId(EqsEquipmentId);
    }
    SaveEqsMaintenance(obj,fileList: File[]) {
        let formData = new FormData();
        formData.append("MaintenanceObj", JSON.stringify(obj));
        fileList.forEach((file) => {
          formData.append("file", file['Attachment']);
        });
        return this._http.post(this._urlEqsMaintenance + 'SaveMaintenance', formData);
    }
    GetMaintenanceList() {
        return this._http.get(this._urlEqsMaintenance + 'Get');
    }
    GetMaintenanceDetail(EqsMaintenanceRecordId) {
        return this._http.post(this._urlEqsMaintenance + 'GetMaintenanceDetail/' + EqsMaintenanceRecordId, EqsMaintenanceRecordId);
    }
    UpdateEqsMaintenance(obj,fileList: File[]) {
      let formData = new FormData();
      formData.append("MaintenanceObj", JSON.stringify(obj));
      fileList.forEach((file) => {
        formData.append("file", file['Attachment']);
      });
      return this._http.post(this._urlEqsMaintenance + 'UpdateMaintenance', formData);
        // return this._http.post(this._urlEqsMaintenance + 'UpdateMaintenance', MaintenanceFormData);
    }
    getAccessRight() {
        return this._http.get(this._urlEqsMaintenance + 'GetAccessRight');
    }
    SaveReportDownloadLogInAudit(ObjAudit) {
        return this._http.post(this._urlEqsCommon + 'ReportDownloadlog',ObjAudit);
      }

      DeleteMaintenance(EqsMaintenanceRecordId) {
        let params = new HttpParams();
        params = params.append('EqsMaintenanceRecordId', EqsMaintenanceRecordId.toString());
          return this._http.get(this._urlEqsMaintenance + 'DeleteMaintenance'  , { params: params });
      }

       GetEquipmentTypeList() {
        return this._eqsCommonService. GetEquipmentTypeList();
      }     

      GetEquipmentAndMaintenanceType(EqsEquipmentId) {
        return this._http.post(this._urlEqsMaintenance + 'GetEquipmentAndMaintenanceType/' + EqsEquipmentId, EqsEquipmentId);
      } 

      SaveMaintenanceRecord(ObjMaintenance) {
        return this._http.post(this._urlEqsMaintenance + 'SaveMaintenanceRecord',ObjMaintenance);
      }

    


}
