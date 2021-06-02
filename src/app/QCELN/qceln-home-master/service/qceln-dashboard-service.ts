import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchEnt } from '../service/qceln-dashboard-model';

@Injectable({
    providedIn: 'root'
})
export  class  QCExperimentDashboardService {
    readonly _restApi = environment.apiUrl + '/api/qcexperiment/';
    constructor(private _http: HttpClient) { }

    getAccessRight() {
        return this._http.get(this._restApi + 'GetAccessRight');
    }
    
    getExperimentMasterList(obj:SearchEnt) {
        return this._http.post(this._restApi + 'GetExperimentMasterList',obj);
    }

    getExperimentCards() {
        return this._http.get(this._restApi + 'GetExperimentCards');
    }
}