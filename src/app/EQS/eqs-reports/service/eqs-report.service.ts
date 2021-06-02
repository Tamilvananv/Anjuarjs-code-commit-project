import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';

@Injectable({
    providedIn: 'root'
})
export class EqsReportService {
    readonly _urlEqsReport = environment.apiUrl + '/api/EQSReport/';
    readonly _urlEqsCalibration = environment.apiUrl + '/api/EqsCalibration/';
    readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';


    constructor(private _http: HttpClient, private _toastr: ToastrService, private _eqsCommonService: EqsCommonService) { }

    GetEquipmentList() {
        return this._eqsCommonService.GetEquipmentList();
    }
    GetEquipmentListReport() {
        return this._http.get(this._urlEqsReport + 'GetEquipmentListReport');
    }
    GetCalibrationList() {
        return this._http.get(this._urlEqsCalibration + 'Get');
    }    
    GetEquipmentHistoryReportList() {
        return this._http.get(this._urlEqsReport + 'GetEquipmentHistoryReport');
    }
    GetEquipmentCalibrationReport() {
        return this._http.get(this._urlEqsReport + 'GetEquipmentCalibrationReport');
    }
    SaveReportDownloadLogInAudit(ObjAudit) {
        return this._http.post(this._urlEqsCommon + 'ReportDownloadlog',ObjAudit);
      }

}
