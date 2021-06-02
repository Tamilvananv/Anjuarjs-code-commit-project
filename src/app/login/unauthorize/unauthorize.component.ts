import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Service/login.service';
@Component({
  selector: 'app-unauthorize-access',
  templateUrl: './unauthorize.component.html',
})

export class UnauthorizeComponent  {
constructor(private loginService: LoginService){}
  logOut() {
    this.loginService.logout();
  }
}