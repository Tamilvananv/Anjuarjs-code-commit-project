import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MsalUserService } from './msaluser.service';

@Injectable()
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  readonly rootUrl = environment.apiUrl;
  constructor(private http: HttpClient, private msalService: MsalUserService, private routes: Router, private toastr: ToastrService) { }
  public ActiveUserData: object[]
  // tslint:disable-next-line:no-debugger
  userAuthentication(userName: string, password: string) {
    const data = 'UserName=' + userName + '&Password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'no-auth': 'True' });
    return this.http.post(this.rootUrl + '/Token', data, { headers: reqHeader });
  }

  logout() {
    sessionStorage.removeItem('userToken');
    sessionStorage.clear();
    localStorage.clear();
    this.msalService.logout();
    //this.routes.navigate(['/login']);
  }
  getUserToken() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.msalService.GetAccessToken()
      })
    };
    return this.http.post(this.rootUrl + '/api/login/ValidateMSUser',{}, this.httpOptions);
  }

  getUserBasicInfo() {
    return this.http.get(this.rootUrl + '/api/login/GetUserInfo');
  }

  getAssimedModuleList(userId: number) {
    let params = new HttpParams();
    params = params.append('UserId', userId.toString());
    return this.http.get(this.rootUrl + '/api/login/GetAssimedModuleList', { params: params });
  }

  GetModuleMenuList(userId: number, ModuleId: number) {
    let params = new HttpParams();
    params = params.append('UserId', userId.toString());
    params = params.append('ModuleId', ModuleId.toString());
    return this.http.get(this.rootUrl + '/api/login/GetModuleMenuList', { params: params });
  }

  setLoginUser(obj) {
    sessionStorage.setItem('LoginUser', JSON.stringify(obj));
  }

  getLoginUser() {
    return JSON.parse(sessionStorage.getItem('LoginUser'));
  }

  getToken() {
    return sessionStorage.getItem('userToken');
  }

  setToken(token) {
    sessionStorage.setItem('userToken', token);
  }
  
  getCurrentUserInfo() {
    return this.msalService.getCurrentUserInfo();
  }
}
