import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Department } from '../Service/Department.model';

@Injectable({
    providedIn: 'root'
})

export class DepartmentService {
    readonly _urlDepartment = environment.apiUrl + '/api/Department/';
    constructor(private _http: HttpClient, private _toastr: ToastrService) { }

    GetManagerNameList() {
        return this._http.get(this._urlDepartment + 'GetUserList');
    }
    SaveDepartment(DepartmentFormData: Department) {
        return this._http.post(this._urlDepartment + 'SaveDepartment', DepartmentFormData);
    }
    GetDepartmentList() {
        return this._http.get(this._urlDepartment + 'Get');
    }
    GetDepartmentDetail(DepartmentId) {
        return this._http.post(this._urlDepartment + 'GetDepartmentDetails/' + DepartmentId, DepartmentId);
    }
    UpdateDepartment(DepartmentForm: Department) {
        return this._http.post(this._urlDepartment + 'UpdateDepartment', DepartmentForm);
    }

    getAccessRight() {
        return this._http.get(this._urlDepartment + 'GetAccessRight');
    }

    SaveExcelReportDownload() {
        return this._http.post(this._urlDepartment + 'ExcelReportDownload',1);
    }
    SavePdfReportDownload() {
        return this._http.post(this._urlDepartment + 'PdfReportDownload',1);
    }

}
