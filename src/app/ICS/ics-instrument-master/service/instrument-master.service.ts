import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { IcsMaster, IcsMaintenence } from './ics-master.model';
import { Observable } from 'rxjs/Observable';
import { IcsQualification } from './ics-qualification.model';
import { IcsCalibration } from './ics-calibration.model';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { IcsAvailability } from './ics-availability.model'

@Injectable({
  providedIn: 'root'
})
export class InstrumentMasterService {
  readonly _urlIcsMaster = environment.apiUrl + '/api/ICSMaster/';
  readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
  constructor(private _http: HttpClient, private _toastr: ToastrService, private _icsCommonService: IcsCommonService, private _commonListService: CommonListService) { }

  GetIcsList() {
    return this._http.get(this._urlIcsMaster + 'Get');
  }
  GetInstrumentTypeList() {
    return this._icsCommonService.GetInstrumentTypeList();
  }
  GetIcsCriticalityList() {
    return this._http.get(this._urlIcsMaster + 'GetIcsCriticalityList');
  }
  GetIcsStorageLocationList() {
    return this._icsCommonService.GetIcsStorageLocationList();
  }
  SaveIcsMaster(obj, imagefile: File,ursFileList:File[],poFileList:File[]) {
        let formData = new FormData();
        formData.append("ICSObj", JSON.stringify(obj));
        formData.append("InstrumentImagefile", imagefile);
        ursFileList.forEach((ursFileList) => {
          formData.append("URSFile", ursFileList['Attachment']);
        });
        poFileList.forEach((poFileList) => {
          formData.append("POFile", poFileList['Attachment']);
        });

    return this._http.post(this._urlIcsMaster + 'Save', formData);
  }
  GetIcsMasterDetail(IcsInstrumentId) {
    const data = 'id=' + IcsInstrumentId;
    return this._http.post(this._urlIcsMaster + 'GetIcsMasterDetail/' + IcsInstrumentId, data);
  }
  GetIcsQualificationTypeList() {
    return this._icsCommonService.GetIcsQualificationTypeList();
  }
  UpdateICSMaster(obj, imagefile: File,ursFileList:File[],poFileList:File[]) {
        let formData = new FormData();
        formData.append("ICSObj", JSON.stringify(obj));
        formData.append("InstrumentImagefile", imagefile);
        ursFileList.forEach((ursFileList) => {
          formData.append("URSFile", ursFileList['Attachment']);
        });
        poFileList.forEach((poFileList) => {
          formData.append("POFile", poFileList['Attachment']);
        });
    return this._http.post(this._urlIcsMaster + 'UpdateICSMaster', formData);
  }
  GetICSQualification(InstrumentId) {
    return this._http.post(this._urlIcsMaster + 'GetICSQualification/' + InstrumentId, InstrumentId);
  }
  SaveIcsQualification(formData: IcsQualification) {
    return this._http.post(this._urlIcsMaster + 'SaveQualification', formData);
  }
  SaveIcsCalibration(formData: IcsMaster) {
    return this._http.post(this._urlIcsMaster + 'SaveCalibration', formData);
  }
  GetIcsMaintenanceTypeList() {
    return this._icsCommonService.GetIcsMaintenanceTypeList();
  }
  GetMonthList() {
    return this._commonListService.GetMonthList();
  }
  GetMonthsWithNAList() {
    return this._commonListService.GetMonthsWithNAList();
  }
  SaveMaintenence(MaintenenceFormData: IcsMaintenence) {
    return this._http.post(this._urlIcsMaster + 'SaveMaintenence', MaintenenceFormData);
  }
  GetIcsMaintenenceList(InstrumentId) {
    return this._http.post(this._urlIcsMaster + 'GetMaintenenceList/' + InstrumentId, InstrumentId);
  }
  SetAvailabilty(InstrumentId) {
    return this._http.post(this._urlIcsMaster + 'SetAvailabilty/' + InstrumentId, InstrumentId);
  }
  GetDepartmentList() {
    return this._http.get(this._urlIcsMaster + 'GetDepartmentList');
  }
  GetUserList() {
    return this._http.get(this._urlIcsMaster + 'GetUserList');
  }
  GetCustomHeaderList() {
    return this._http.get(this._urlIcsMaster + 'GetCustomHeaderList');
  }
  GetCustomHeaderDetails(InstrumentId) {
    return this._http.post(this._urlIcsMaster + 'GetCustomHeaderDetails/' + InstrumentId, InstrumentId);
  }
  SaveAvailability(IcsAvailabilityForm: IcsAvailability) {
    return this._http.post(this._urlIcsMaster + 'SaveAvailability', IcsAvailabilityForm);
  }
  SaveCustomHeader(objCustomHeaderList) {
    return this._http.post(this._urlIcsMaster + 'SaveCustomHeader', objCustomHeaderList);
  }
  // getMaterialDetails(materialId: number) {
  //     let params = new HttpParams();
  //     params.append("MaterialId", materialId.toString());
  //     return this._http.get(this._restApi + 'GetMaterialDetails', { params: params });
  // }

  getAccessRight() {
    return this._http.get(this._urlIcsMaster + 'GetAccessRight');
}
GetURSList() {
  return this._http.get(this._urlIcsMaster + 'GetURSList');
}
GetPOList() {
  return this._http.get(this._urlIcsMaster + 'GetPOList');
}
GetManufacturerList() {
  return this._http.get(this._urlIcsMaster + 'GetManufacturerList');
}


GetMaintenenceDetails(IcsMaintenenceTypeFrequencyId) {
  return this._http.post(this._urlIcsMaster + 'GetMaintenenceDetails/' + IcsMaintenenceTypeFrequencyId, IcsMaintenenceTypeFrequencyId);
}

SaveReportDownloadLogInAudit(ObjAudit) {
  return this._http.post(this._urlIcsCommon + 'ReportDownloadlog',ObjAudit);
}

}
