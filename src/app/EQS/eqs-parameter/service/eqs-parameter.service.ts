import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';
import { NgForm } from '@angular/forms';
import { EqsParameter } from '../service/eqs-parameter.model';


@Injectable({
    providedIn: 'root'
})
export class EqsParameterService {
    readonly _urlEqsParameter = environment.apiUrl + '/api/EqsParameter/';
    readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';
    
    constructor(private _http: HttpClient, private _toastr: ToastrService, private _eqsCommonService: EqsCommonService) { }

    GetEquipmentist() {
        return this._eqsCommonService.GetEquipmentList();
    }
    GetParameterList() {
        return this._http.get(this._urlEqsParameter + 'GetParameterList');
    }
    SaveParameter(EqsParameterFormData: EqsParameter) {
        return this._http.post(this._urlEqsParameter + 'SaveParameter', EqsParameterFormData);
    }
    GetParameterDetail(EqsParameterId) {
        return this._http.post(this._urlEqsParameter + 'GetParameterDetails/' + EqsParameterId, EqsParameterId);
    }
    UpdateEqsParameter(EqsParameterFormData: EqsParameter) {
        return this._http.post(this._urlEqsParameter + 'UpdateParameter', EqsParameterFormData);
    }

    ValidateRange(UValue, LValue, TValue) {
        let Result = true;
        const UpperValue = parseFloat(UValue);
        const LowerValue = parseFloat(LValue);
        const TargetValue = parseFloat(TValue);
        if (UpperValue < TargetValue) {
            this._toastr.warning('Upper Value Should be Greater than Target Value ');
            Result = false;
        } else if (UpperValue < LowerValue) {
            this._toastr.warning('Upper Value Should be Greater than Lower Value ');
            Result = false;
        } else if (TargetValue < LowerValue) {
            this._toastr.warning('Target Value Should be Greater than Lower Value ');
            Result = false;
        } else if (TargetValue > UpperValue) {
            this._toastr.warning('Target Value Should be Less than Upper Value ');
            Result = false;
        } else if (LowerValue > TargetValue) {
            this._toastr.warning('Lower Value Should be Less Than Target Value ');
            Result = false;
        } else if (LowerValue > UpperValue) {
            this._toastr.warning('Lower Value Should be Less Than Upper Value');
            Result = false;
        } else {
            Result = true;
        }
        return Result;
    }

    getAccessRight() {
        return this._http.get(this._urlEqsParameter + 'GetAccessRight');
    }
    SaveReportDownloadLogInAudit(ObjAudit) {
        return this._http.post(this._urlEqsCommon + 'ReportDownloadlog',ObjAudit);
      }

}