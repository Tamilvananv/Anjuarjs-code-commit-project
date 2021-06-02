import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Permission } from '../Service/group.model';
import{CommonService } from "../../../Shared Services etc/Services/Common.Service";
@Injectable({
    providedIn: 'root'
})

export class GroupService {
    readonly _urlGroup = environment.apiUrl + '/api/Permission/';
    constructor(private _http: HttpClient, private _toastr: ToastrService, private _commonService: CommonService,) { }

    SaveGroup(GroupFormData: Permission) {
        return this._http.post(this._urlGroup + 'SavePermissionName', GroupFormData);
    }
    UpdateGroup(GroupFormData: Permission) {
        return this._http.post(this._urlGroup + 'UpdatePermissionName', GroupFormData);
    }
    getFeatureName() {
        return this._http.get(this._urlGroup + 'GetFeatureList');
    }
    getGroupList() {
        return this._http.get(this._urlGroup + 'GetPermissionList');
    }
    SaveGroupPermission(ObjGroupPermissionEnt: any,GroupId:any) {
         return this._http.post(this._urlGroup + 'SavePermissions/'+GroupId, ObjGroupPermissionEnt);
     }  

    GetGroupDetails(GroupId) {
        return this._http.post(this._urlGroup + 'GetPermissionNameDetails/' + GroupId, GroupId);
    }
    getGroupPermissinDetails(GroupId) {
        return this._http.post(this._urlGroup + 'GetPermissionsDetails/' + GroupId, GroupId);
    }

    UpdateGroupPermission(ObjGroupPermissionEnt: any,GroupId:any) {
        return this._http.post(this._urlGroup + 'UpdatePermissions/'+GroupId, ObjGroupPermissionEnt);
    }  
   
    getAccessRight() {
        return this._http.get(this._urlGroup + 'GetAccessRight');
    }

    GetCompanyImageLogo() {
        return this._commonService.GetCompanyImageLogo();
      }

    SaveExcelReportDownload() {
        return this._http.post(this._urlGroup + 'ExcelReportDownload',1);
    }
    SavePdfReportDownload() {
        return this._http.post(this._urlGroup + 'PdfReportDownload',1);
    }
   

}

