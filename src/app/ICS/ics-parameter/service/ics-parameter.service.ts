import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class IcsParameterService {
  readonly _urlICSParameter = environment.apiUrl + '/api/ICSParameter/';
  readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

  GetParameterList() {
    return this._http.get(this._urlICSParameter + 'GetParameterList');
  }
  GetQualificationDetail(id) {
    return this._http.post(this._urlICSParameter + 'GetParameterDetails/' + id, id);
  }
  SaveParameter(ParameterForm) {
    return this._http.post(this._urlICSParameter + 'SaveParameter', ParameterForm);
  }
  UpdateParameter(ParameterForm) {
    return this._http.post(this._urlICSParameter + 'UpdateParameter', ParameterForm);
  }
  ValidateRange(paramForm) {
    let Result = true;
    const UpperValue = parseFloat(paramForm.UpperValue);
    const LowerValue = parseFloat(paramForm.LowerValue);
    const TargetValue = parseFloat(paramForm.TargetValue);
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
    return this._http.get(this._urlICSParameter + 'GetAccessRight');
}

SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlIcsCommon + 'ReportDownloadlog',ObjAudit);
}

}
