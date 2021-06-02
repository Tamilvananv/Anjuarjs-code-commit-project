import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoginService } from '../login/Service/login.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  constructor(
    private loginService: LoginService,
    private routes: Router
  ) { }

  public config: PerfectScrollbarConfigInterface = {};


  public isCollapsed = false;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;

  ModuleList = [];

  options = {
    theme: 'light',
    dir: 'ltr',
    layout: 'vertical',
    sidebartype: 'full',
    sidebarpos: 'fixed',
    headerpos: 'fixed',
    boxed: 'full',
    navbarbg: 'skin2',
    // navbarbg: 'skin3',
    sidebarbg: 'skin2',
    logobg: 'skin2'
     // logobg: 'skin3'
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    let loginUser = this.loginService.getLoginUser();
    this.getAssimedModuleList(loginUser['UserID']);
  }

  goToModule(ModuleObj) {
    localStorage.setItem('ModuleId', ModuleObj['ModuleId']);
    this.routes.navigate(['/' + ModuleObj['ModuleURL']]);
  }

  getAssimedModuleList(userId: number) {
    this.loginService.getAssimedModuleList(userId).subscribe((data) => {
      this.ModuleList = data['Object'];
    });
  }
}
