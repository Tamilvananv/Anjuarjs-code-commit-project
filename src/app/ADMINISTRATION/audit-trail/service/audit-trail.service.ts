import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class AuditTrailService {
    readonly _urlAuditTrail = environment.apiUrl + '/api/AuditTrail/';
    constructor(private _http: HttpClient, private _toastr: ToastrService) { }

    GetAuditTrailList() {
        return this._http.get(this._urlAuditTrail + 'Get');
    }

    SaveExcelReportDownload() {
        return this._http.post(this._urlAuditTrail + 'ExcelReportDownload',1);
    }
    SavePdfReportDownload() {
        return this._http.post(this._urlAuditTrail + 'PdfReportDownload',1);
    }


}