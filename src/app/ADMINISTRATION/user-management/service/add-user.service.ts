import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AdditionalUserInfoEnt } from './add-user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly _urlUser = environment.apiUrl + '/api/User/';
    readonly _urlGroup = environment.apiUrl + '/api/Permission/';

    constructor(private _http: HttpClient, private _toastr: ToastrService) { }

    getADUserName() {
        return this._http.get(this._urlUser + 'GetActiveDirectoryUserList');
    }
    GetPermissionGroupNameList() {
        return this._http.get(this._urlUser + 'GetPermissionGroupNameList');
    }
    SaveUser(UserData: any) {       
        return this._http.post(this._urlUser + 'SaveUser', UserData);
    }
    getFeatureName() {
        return this._http.get(this._urlGroup + 'GetFeatureList');
    }

    getGroupPermissinDetails(PermissionGroupId) {
        return this._http.post(this._urlGroup + 'GetPermissionsDetails/' + PermissionGroupId, PermissionGroupId);
    }

    getDepartmentlist() {
        return this._http.get(this._urlUser + 'GetDepartmentList');
    }

    SaveUserDepartment(DepartMentList: any,UserId:any) {
        return this._http.post(this._urlUser + 'SaveUserDepartment/'+UserId, DepartMentList);
    }  

    SaveUserPermissions(ObjUserPermissionEnt: any,UserId:any) {
        return this._http.post(this._urlUser + 'SaveUserPermission/'+UserId, ObjUserPermissionEnt);
    }  

    UpdateUserPermissions(ObjUserPermissionEnt: any,UserId:any) {
        return this._http.post(this._urlUser + 'UpdateUserPermission/'+UserId, ObjUserPermissionEnt);
    }  

    getUserPermissionDetails(UserId) {
        return this._http.post(this._urlUser + 'GetUserPermissionDetails/' + UserId, UserId);
    }

    UpdateUserDepartment(DepartMentList: any,UserId:any) {
        return this._http.post(this._urlUser + 'UpdateUserDepartment/'+UserId, DepartMentList);
    }  

    getUserList() {
        return this._http.get(this._urlUser + 'GetUserList');
    }

    getUserDetails(UserId) {
        return this._http.post(this._urlUser + 'GetUserDetails/' + UserId, UserId);
    }

    getUserDepartmentDetails(UserId) {       
        return this._http.post(this._urlUser + 'GetUserDepartmentDetails/' + UserId, UserId);
    } 
    
    getUserPermissinDetails(UserId) {
        return this._http.post(this._urlUser + 'GetUserPermissionDetails/' + UserId, UserId);
    }
    getManagerList() {
        return this._http.get(this._urlUser + 'GetManagerList');
    } 
    SaveUserManager(UserId:any,ManagerData: any) {       
        //return this._http.post(this._urlUser + 'SaveUserManager/'+UserId, ManagerData);
        return this._http.post(this._urlUser + 'SaveUserManager/'+UserId, ManagerData);
    }

    getUserManagerDetails(UserId) {
        return this._http.post(this._urlUser + 'GetManagerDetails/' + UserId, UserId);
    }

    UpdateUserManager(UserId:any,ManagerData: any) {
        return this._http.post(this._urlUser + 'UpdateUserManager/'+UserId, ManagerData);
    }

    getAzureAdData() {
        return this._http.get(this._urlUser + 'GetUserDataFromAzure');
    }

    getAccessRight() {
        return this._http.get(this._urlUser + 'GetAccessRight');
    }

    SaveUserAdditionalInformation(UserFormData: AdditionalUserInfoEnt) {
        console.log("UserAdditinalInfo :",UserFormData);
        return this._http.post(this._urlUser + 'SaveUserAdditionalInformation', UserFormData);
      }
      GetUserAdditionalDetails(UserId) {       
        return this._http.post(this._urlUser + 'GetUserAdditionalDetails/' + UserId, UserId);
    } 

    SaveExcelReportDownload() {
        return this._http.post(this._urlUser + 'ExcelReportDownload',1);
    }
    SavePdfReportDownload() {
        return this._http.post(this._urlUser + 'PdfReportDownload',1);
    }
}