import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from './Service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { EncrDecrService } from '../Shared Services etc/Services/EncrDecrService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent implements AfterViewInit, OnInit {
  radioOptions = ['Choose this', 'Choose me'];
  constructor(private loginService: LoginService,
    private routes: Router,
    private EncrDecr: EncrDecrService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService) { }
  LoginForm: FormGroup;
  loginform = true;
  recoverform = false;
  isLoginError = false;
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  ngOnInit() {
    console.log("Here 1");
    debugger;
    console.log("Here");
    this.setForm();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.chekUserAlreadyLoggedin();
    }, 1000);
  }
  setForm() {
    this.LoginForm = this.formBuilder.group({
      LoginId: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }
  resetForm() {
    this.LoginForm.reset();
  }

  checkCredntials() {
    if (this.LoginForm.valid) {
      const uname = this.LoginForm.get('LoginId').value;
      //const pwd = this.EncrDecr.encryptRSA(this.LoginForm.get('Password').value);
      const pwd = this.LoginForm.get('Password').value
      console.log(pwd);
      this.loginService.userAuthentication(uname, pwd).subscribe((data: any) => {
        sessionStorage.setItem('userToken', data.access_token);
        this.toastr.success('Login Sucessfuly');
        this.getUserBasicInfo();
      },
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
          this.toastr.error(err.error.error_description);
        });
    }
    else {
      this.formErrorDisplay.showErrors(this.LoginForm);
    }
  }
  getUserBasicInfo() {
    this.loginService.getUserBasicInfo().subscribe((data) => {
      this.loginService.setLoginUser(data['Object']);
      this.routes.navigate(['/landing']);
    });
  }

  chekUserAlreadyLoggedin() {
    let token = this.loginService.getToken();
    if (token != null && token != undefined) {
      this.routes.navigate(['/landing']);
    } else {
      let msToken = this.loginService.getCurrentUserInfo();
      if (msToken != null && msToken != undefined) {
        this.loginService.getUserToken().subscribe((data) => {
         // if (data['Result'] == true) {
          if (data['Result'] == true && data['Object']!=null &&  data['Object']['access_token']!=null) {
            this.loginService.setLoginUser(data['ExtraObject']);
            this.loginService.setToken(data['Object']['access_token']);
            this.toastr.success('Login Sucessfuly');
            this.getUserBasicInfo();
          }
        });
      } else {
        this.routes.navigate(['/login']);
      }
    }
  }

  gotoLanding() {
    this.routes.navigate(['/landing']);
  }

  logOut() {
    this.loginService.logout();

  }
}
