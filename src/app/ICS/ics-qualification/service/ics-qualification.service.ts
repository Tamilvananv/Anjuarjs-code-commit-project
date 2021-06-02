import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { IcsQualification } from '../../ics-instrument-master/service/ics-qualification.model';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  readonly _urlIcsQualification = environment.apiUrl + '/api/IcsQualification/';
  readonly _urlIcsMaster = environment.apiUrl + '/api/ICSMaster/';
  readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
  constructor(private _http: HttpClient, private _toastr: ToastrService
    , private _icsCommonService: IcsCommonService, private _commonListService: CommonListService) { }

  SaveQualification(obj, fileList: File[]) {
    let formData = new FormData();
    formData.append("QualificationObj", JSON.stringify(obj));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlIcsQualification + 'SaveQualification', formData);
  }
  UpdateQualification(obj, fileList: File[]) {
    let formData = new FormData();
    formData.append("QualificationObj", JSON.stringify(obj));
    fileList.forEach((file) => {
      formData.append("file", file['Attachment']);
    });
    return this._http.post(this._urlIcsQualification + 'UpdateQualification', formData);
  }
  GetQualificationList() {
    return this._http.get(this._urlIcsQualification + 'Get');
  }
  GetQualificationDetail(ICSQualificaationTypeRecordId) {
    return this._http.post(this._urlIcsQualification + 'GetQualificationDetail/' + ICSQualificaationTypeRecordId, ICSQualificaationTypeRecordId);
  }
  getAccessRight() {
    return this._http.get(this._urlIcsQualification + 'GetAccessRight');
}

SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlIcsCommon + 'ReportDownloadlog',ObjAudit);
}

DeleteQualification(QualificationTypeRecordId) {
  let params = new HttpParams();
  params = params.append('QualificationTypeRecordId', QualificationTypeRecordId.toString());
    return this._http.get(this._urlIcsQualification + 'DeleteQualification'  , { params: params });
}


}
