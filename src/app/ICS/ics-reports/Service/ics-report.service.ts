import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';

@Injectable({
    providedIn: 'root'
})
export class IcsReportService {
    readonly _urlIcsReport = environment.apiUrl + '/api/ICSReport/';
    readonly _urlIcsCalibration = environment.apiUrl + '/api/IcsCalibration/';
    readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
    constructor(private _http: HttpClient, private _toastr: ToastrService, private _icsCommonService: IcsCommonService) { }

    GetInstrumentListReport() {
        return this._http.get(this._urlIcsReport + 'GetInstrumentListReport');
    }
    GetCalibrationList() {
        return this._http.get(this._urlIcsCalibration + 'Get');
    }
    GetInstrumentHistoryReportList() {
        return this._http.get(this._urlIcsReport + 'GetInstrumentHistoryReport');
    }

    GetInstrumentCalibrationReport() {
        return this._http.get(this._urlIcsReport + 'GetInstrumentCalibrationReport');
    }

    SaveReportDownloadLogInAudit(ObjAudit) {
        return this._http.post(this._urlIcsCommon + 'ReportDownloadlog',ObjAudit);
      }
      

}
