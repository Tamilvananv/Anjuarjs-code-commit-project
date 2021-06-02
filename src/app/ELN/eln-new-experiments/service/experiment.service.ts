import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ExpVersionEnt } from './experiment.model';
import { retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ExperimentService {

    readonly _restApi = environment.apiUrl + '/api/experiment/';
    constructor(
        private _http: HttpClient,
        private _toastr: ToastrService
    ) { }

    getVersionInfo(versionId: number) {
        let params = new HttpParams();
        params = params.append('VersionId', versionId.toString());
        return this._http.get(this._restApi + 'GetVersionInfo', { params: params });
    }

    getExperimentNo() {
        return this._http.get(this._restApi + 'GetExperimentNo');
    }

    loadApprovers(expVersionObj) {
        return this._http.post(this._restApi + 'GetUserList', expVersionObj);
    }

    getExperimentDetails(expVersionObj) {
        return this._http.post(this._restApi + 'GetExperimentDetails', expVersionObj);
    }
    getProgrameCodeList(expVersionObj: ExpVersionEnt) {
        let params = new HttpParams();
        params = params.append('VersionId', expVersionObj.VersionId > 0 ? expVersionObj.VersionId.toString() : "0");
        return this._http.get(this._restApi + 'GetProgramCodeList', { params: params });
    }
    getTargetList(expVersionObj: ExpVersionEnt) {
        let params = new HttpParams();
        params = params.append('VersionId', expVersionObj.VersionId > 0 ? expVersionObj.VersionId.toString() : "0");
        return this._http.get(this._restApi + 'GetTargetList', { params: params });
    }
    getELNTypeList(expVersionObj: ExpVersionEnt) {
        let params = new HttpParams();
        params = params.append('VersionId', expVersionObj.VersionId > 0 ? expVersionObj.VersionId.toString() : "0");
        return this._http.get(this._restApi + 'GetELNTypeList', { params: params });
    }

    getInstrumentList(versionId: number) {
        let params = new HttpParams();
        params = params.append('VersionId', versionId.toString());
        return this._http.get(this._restApi + 'GetInstrumentList', { params: params });
    }

    getEquipmentList(versionId: number) {
        let params = new HttpParams();
        params = params.append('VersionId', versionId.toString());
        return this._http.get(this._restApi + 'GetEquipmentList', { params: params });
    }

    getMaterialList(versionId: number) {
        let params = new HttpParams();
        params = params.append('VersionId', versionId.toString());
        return this._http.get(this._restApi + 'GetMaterialList', { params: params });
    }
    saveExperiment(experimentObj) {
        return this._http.post(this._restApi + 'Save', experimentObj);
    }
    saveProcessResult(processObj, fileList) {
        let formData = new FormData();
        fileList.forEach(element => {
            formData.append(element.Type, element.File, element.Type + ".docx");
        });
        formData.append("list", JSON.stringify(processObj));
        return this._http.post(this._restApi + 'SaveProcessResult', formData);
    }
    saveInstrument(list, versionId: number) {
        let params = new HttpParams();
        params = params.append('VersionId', versionId.toString());
        return this._http.post(this._restApi + 'AddELNInstrument', list, { params: params });
    }
    saveEquipment(list, versionId: number) {
        let params = new HttpParams();
        params = params.append('VersionId', versionId.toString());
        return this._http.post(this._restApi + 'AddELNEquipment', list, { params: params });
    }
    saveMaterial(list, versionId: number) {
        let params = new HttpParams();
        params = params.append('VersionId', versionId.toString());
        return this._http.post(this._restApi + 'AddELNMaterial', list, { params: params });
    }

    getELNInstrumentList(expVersionObj) {
        return this._http.post(this._restApi + 'GetELNInstrumentList', expVersionObj);
    }
    getELNEquipmentList(expVersionObj) {
        return this._http.post(this._restApi + 'GetELNEquipmentList', expVersionObj);
    }
    getELNMaterialList(expVersionObj) {
        return this._http.post(this._restApi + 'GetELNMaterialList', expVersionObj);
    }

    getPrecaution(expVersionObj) {
        return this._http.post(this._restApi + 'GetPrecaution', expVersionObj);
    }
    getSOPList(expVersionObj) {
        return this._http.post(this._restApi + 'GetSOPList', expVersionObj);
    }
    addSOP(obj, file: File) {
        let formData = new FormData();
        formData.append("SOPObj", JSON.stringify(obj));
        formData.append("file", file);
        return this._http.post(this._restApi + 'SaveSOP', formData);
    }
    savePrecaution(obj, document) {
        let formData = new FormData();
        formData.append("PrecautionObj", JSON.stringify(obj));
        formData.append("file", document, "precautionFile.docx");
        return this._http.post(this._restApi + 'SavePrecaution', formData);
    }
    getProcessResultList(expVersionObj) {
        return this._http.post(this._restApi + 'GetProcessResultList', expVersionObj);
    }

    getUserSignature(expVersionObj: ExpVersionEnt) {
        return this._http.post(this._restApi + 'GetUserSignature', expVersionObj);
    }
    sendForApproval(expVersionObj: ExpVersionEnt, file: File) {
        let postData = new FormData();
        postData.append("VersionObj", JSON.stringify(expVersionObj));
        postData.append("fileObj", file);
        return this._http.post(this._restApi + 'SendForApproval', postData);
    }

    commitAndNewVersion(expVersionObj: ExpVersionEnt) {
        return this._http.post(this._restApi + 'CommitAndNewVersion', expVersionObj);
    }

    commitExperiment(expVersionObj: ExpVersionEnt) {
        return this._http.post(this._restApi + 'CommitExperiment', expVersionObj);
    }
    createNewVersion(expVersionObj: ExpVersionEnt) {
        return this._http.post(this._restApi + 'CreateNewVersion', expVersionObj);
    }
    saveFavouriteVersion(expVersionObj: ExpVersionEnt) {
        return this._http.post(this._restApi + 'SaveFavouriteVersion', expVersionObj);
    }

    saveApproval(obj: any, file: File) {
        let postData = new FormData();
        postData.append("UserSignObj", JSON.stringify(obj));
        postData.append("fileObj", file);
        return this._http.post(this._restApi + 'SaveApproval', postData);
    }
    getReworkList(expVersionObj: ExpVersionEnt) {
        return this._http.post(this._restApi + 'GetReworkList', expVersionObj);
    }
    addRework(obj) {
        return this._http.post(this._restApi + 'AddRework', obj);
    }
    reworkMarkAsComplete(reworkObj) {
        return this._http.post(this._restApi + 'ReworkMarkAsComplete', reworkObj);
    }
    saveAsRework(expVersionObj) {
        return this._http.post(this._restApi + 'SaveAsRework', expVersionObj);
    }
    printReport(htmlContent) {
        return this._http.post(environment.apiUrl + '/Api/HtmlToPDF/GeneratePDF', htmlContent, { responseType: 'blob' });
        //return this._http.post(environment.apiUrl + '/api/Experiment/PrintReport', {VersionId:1} );
    }

    getBase64Img(filePath) {
        return this._http.get(environment.apiUrl + '/FileManager/GetBase64Img?filePath=' + filePath, { responseType: 'text' });
    }

    getSftdToHtml(sftdBody) {
        return this._http.post(environment.apiUrl + '/api/DocumentEditor/SfdtToHtml', sftdBody);
    }

    downloadFile(filePath) {
        let params = new HttpParams();
        params.append("filePath", filePath);
        return this._http.get(environment.apiUrl + '/FileManager/GetAWSFile?filePath=' + filePath, { responseType: 'blob', params: params });
    }

}