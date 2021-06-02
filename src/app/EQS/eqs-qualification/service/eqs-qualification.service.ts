import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { EqsQualification } from '../../eqs-master/service/eqs-qualification.model';

@Injectable({
    providedIn: 'root'
})
export class EqsQualificationService {
    readonly _urlEqsQualification = environment.apiUrl + '/api/EQSQualification/';
    readonly _urlEqsMaster = environment.apiUrl + '/api/EQSMaster/';
    readonly _urlEqsCommon = environment.apiUrl + '/api/EQSCommon/';

    constructor(private _http: HttpClient, private _toastr: ToastrService, private _eqsCommonService: EqsCommonService, private _commonListService: CommonListService) { }

    GetEqsQualificationTypeList() {
        return this._eqsCommonService.GetEqsQualificationTypeList();
    }
    GetEquipmentList() {
        return this._eqsCommonService.GetEquipmentList();
    }
    GetEquipmentTypeList() {
        return this._eqsCommonService.GetEquipmentTypeList();
    }
    GetEquipmentTypeById(EqsEquipmentId) {
        return this._eqsCommonService.GetEquipmentTypeById(EqsEquipmentId);
    }
    SaveQualification(obj, fileList: File[]) {
      let formData = new FormData();
      formData.append("QualificationObj", JSON.stringify(obj));
      fileList.forEach((file) => {
        formData.append("file", file['Attachment']);
      });
      return this._http.post(this._urlEqsQualification + 'SaveQualification', formData);
    }
    GetQualificationList() {
        return this._http.get(this._urlEqsQualification + 'Get');
    }
    GetQualificationDetail(EqsQualificationTypeRecordId) {
        return this._http.post(this._urlEqsQualification + 'GetQualificationDetail/' + EqsQualificationTypeRecordId, EqsQualificationTypeRecordId);
    }
    UpdateEqsQualification(obj, fileList: File[]) {
      let formData = new FormData();
      formData.append("QualificationObj", JSON.stringify(obj));
      fileList.forEach((file) => {
        formData.append("file", file['Attachment']);
      });
        return this._http.post(this._urlEqsQualification + 'UpdateQualification', formData);
    }

    getAccessRight() {
        return this._http.get(this._urlEqsQualification + 'GetAccessRight');
    }
    SaveReportDownloadLogInAudit(ObjAudit) {
        return this._http.post(this._urlEqsCommon + 'ReportDownloadlog',ObjAudit);
      }

      DeleteQualification(EqsQualificationTypeRecordId) {
        let params = new HttpParams();
        params = params.append('EqsQualificationTypeRecordId', EqsQualificationTypeRecordId.toString());
          return this._http.get(this._urlEqsQualification + 'DeleteQualification'  , { params: params });
      }
}
