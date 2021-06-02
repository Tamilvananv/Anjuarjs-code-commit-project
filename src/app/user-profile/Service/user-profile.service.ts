
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserProfileEnt } from "./User-Profile.model";


@Injectable({
    providedIn: 'root'
})


export class UserProfileService {
    readonly _urlUser = environment.apiUrl + '/api/User/';

    constructor(private _http: HttpClient) { }

    getUserProfileDetails(UserId) {
        return this._http.post(this._urlUser + 'GetUserProfileDetails/' + UserId, UserId);
    }

    UpdateUserProfile(UserProfileData: UserProfileEnt,fileList: File[]) {
        let formData = new FormData();
        formData.append("UserProfileObj", JSON.stringify(UserProfileData));
        fileList.forEach((file) => {
          formData.append("file", file['Attachment']);
        });  
        return this._http.post(this._urlUser + 'UpdateUserProfile', formData);
    }

    CheckedCurrentUserIsManager(ManagerId) {
        return this._http.post(this._urlUser + 'CheckedCurrentUserIsManager/' + ManagerId, ManagerId);
    }

    GetSignatureforApproval(ManagerId) {
        return this._http.post(this._urlUser + 'GetSignatureforApproval/' + ManagerId, ManagerId);
    }

    ApproveSignature(data) {
        return this._http.post(this._urlUser + 'ApproveSignature', data);
    }

    RejectSignature(data) {
        return this._http.post(this._urlUser + 'RejectSignature', data);
    }

}