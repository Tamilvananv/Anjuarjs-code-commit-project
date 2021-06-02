import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class IcsMaintenanceService {
  readonly _urlICSMaintenance = environment.apiUrl + '/api/IcsMaintenanceType/';
  readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
  constructor(private _http: HttpClient, private _toastr: ToastrService, private _icsCommonService: IcsCommonService) { }

  GetInstrumentList() {
    return this._icsCommonService.GetInstrumentList();
  }
  GetMaintenanceList() {
    return this._http.get(this._urlICSMaintenance + 'GetMaintenanceList');
  }
  GetMaintenanceDetail(id) {
    return this._http.post(this._urlICSMaintenance + 'GetMaintenanceDetail/' + id, id);
  }
  SaveMaintenance(obj, fileList: File[]) {
    let formData = new FormData();
    formData.append("MaintenanceObj", JSON.stringify(obj));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlICSMaintenance + 'SaveMaintenance', formData);
  }
  UpdateMaintenance(obj, fileList: File[]) {
    let formData = new FormData();
    formData.append("MaintenanceObj", JSON.stringify(obj));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    // formData.append("file", file);
    return this._http.post(this._urlICSMaintenance + 'UpdateMaintenance', formData);
  }
  GetIcsMaintenanceTypeList() {
    return this._icsCommonService.GetIcsMaintenanceTypeList();
  }
  GetMaintenanceTypeByInstrumentId(InstrumentId) {
    return this._icsCommonService.GetMaintenanceTypeByInstrumentId(InstrumentId);
  }

  getAccessRight() {
    return this._http.get(this._urlICSMaintenance + 'GetAccessRight');
}
SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlIcsCommon + 'ReportDownloadlog',ObjAudit);
}

DeleteMaintenance(IcsMaintenanceRecordId) {
  let params = new HttpParams();
  params = params.append('IcsMaintenanceRecordId', IcsMaintenanceRecordId.toString());
    return this._http.get(this._urlICSMaintenance + 'DeleteMaintenance'  , { params: params });
}

GetInstrumentAndMaintenanceType(IcsInstrumentId) {
  return this._http.post(this._urlICSMaintenance + 'GetInstrumentAndMaintenanceType/' + IcsInstrumentId, IcsInstrumentId);
} 

SaveMaintenanceRecord(ObjMaintenance) {
  return this._http.post(this._urlICSMaintenance + 'SaveMaintenanceRecord',ObjMaintenance);
}



}
