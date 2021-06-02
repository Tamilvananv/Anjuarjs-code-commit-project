import { Component, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoginService } from 'src/app/login/Service/login.service';
// import { Input } from '@syncfusion/ej2-inputs';
// import { Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ModuleList } from 'src/app/Shared Services etc/commonList';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [LoginService]
})
export class NavigationComponent implements AfterViewInit {
  //   public href: string = "";
  //   url: string = "asdf";
  //   ngOnInit() {
  //     this.href = this.router.url;
  //     console.log(this.router.url);
  // }
  public UserInfo: object = {};
  @Input() layout;
  pageInfo;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() isLanding: boolean;
  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
  constructor(private modalService: NgbModal
    , private loginService: LoginService
    , private router: Router
    , private activatedRoute: ActivatedRoute,
    private titleService: Title) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });
  }
  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-info',
      icon: 'ti-link',
      title: 'You are active',
      // subject: 'Just see the my new admin!',
      time: '9:30 AM'
    }
    // {
    //   btn: 'btn-success',
    //   icon: 'ti-calendar',
    //   title: 'Event today',
    //   subject: 'Just a reminder that you have event',
    //   time: '9:10 AM'
    // },
    // {
    //   btn: 'btn-info',
    //   icon: 'ti-settings',
    //   title: 'Settings',
    //   subject: 'You can customize this template as you want',
    //   time: '9:08 AM'
    // },
    // {
    //   btn: 'btn-primary',
    //   icon: 'ti-user',
    //   title: 'Pavan kumar',
    //   subject: 'Just see the my admin!',
    //   time: '9:00 AM'
    // }
  ];
  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'ABC',
      subject: 'Regards',
      time: '9:30 AM'
    }
  ];
  ngAfterViewInit() {
    this.getUserInfo();
  }
  logOut() {
    this.loginService.logout();
  }

  /*  help() {
 
     window.open('assets/PDF/SymphonyTech ELN.pdf', '_blank');
   } */

   help() {
    var routerUrl = this.router.url;
    var newarr = routerUrl.split("/");
    // let laststringfromUrl=newarr[newarr.length-1]
    let z = Number(newarr[newarr.length - 1])

    if (!isNaN(z)) {
      routerUrl = routerUrl.replace('/' + newarr[newarr.length - 1], '');
      console.log(routerUrl);
    }

    switch (routerUrl) {
      case "/landing":
        window.open(
          "assets/WebHelp/topics/getting-started-application-module-master.htm",
          "_blank"
        );
        break;
      case "/elnhome":
      case "/elnhome/listview/1/Ongoing%20":
      case "/elnhome/listview/2/Submitted":
      case "/elnhome/listview/3/Rework%20":
      case "/elnhome/listview/4/Closed%20":
      case "/elnhome/listview/-1/Favourites":
      case "/elnhome/listview/0/Approval%20Pending":
      case "/elnhome/listview/-2/All":
        window.open("assets/WebHelp/topics/eln-introduction.htm", "_blank");
        break;

      case "/elnexperiments/new":
        window.open("assets/WebHelp/topics/eln-new-experiments.htm", "_blank");
        break;
      case "/elnnusersettings":
        window.open("assets/WebHelp/topics/eln-settings.htm", "_blank");
        break;
      case "/icshome":
        window.open("assets/WebHelp/topics/ics-introduction.htm", "_blank");
        break;
      case "/icshome/addinstrument":
        window.open(
          "assets/WebHelp/topics/ics-instrument-master.htm",
          "_blank"
        );
        break;
      case "/ics-parameter":
        window.open("assets/WebHelp/topics/ics-parameters.htm", "_blank");
        break;
      case "/ics-qualification":
        window.open("assets/WebHelp/topics/ics-qualification.htm", "_blank");
        break;
      case "/ics-calibration":
        window.open("assets/WebHelp/topics/ics-calibration.htm", "_blank");
        break;
      case "/ics-maintenance":
        window.open("assets/WebHelp/topics/ics-maintenance.htm", "_blank");
        break;
      case "/ics-reports/instrumentsList":
        window.open("assets/WebHelp/topics/ics-reports.htm", "_blank");
        break;
      case "/ics-reports/instrument-Usage":
        window.open("assets/WebHelp/topics/ics-reports.htm", "_blank");
        break;
      case "/ics-reports/calibrationReport":
        window.open("assets/WebHelp/topics/ics-reports.htm", "_blank");
        break;
      case "/ics-settings/usersetting":
        window.open("assets/WebHelp/topics/ics-settings.htm", "_blank");
        break;
      case "/eqs-home":
        window.open("assets/WebHelp/topics/eqs-introduction.htm", "_blank");
        break;
      case "/eqs-home/addequipment":
        window.open("assets/WebHelp/topics/eqs-equipment-master.htm", "_blank");
        break;
      case "/eqs-parameter":
        window.open("assets/WebHelp/topics/eqs-parameters.htm", "_blank");
        break;
      case "/eqs-qualification":
        window.open("assets/WebHelp/topics/eqs-qualification.htm", "_blank");
        break;
      case "/eqs-calibration":
        window.open("assets/WebHelp/topics/eqs-calibration.htm", "_blank");
        break;
      case "/eqs-maintenance":
        window.open("assets/WebHelp/topics/eqs-maintenance.htm", "_blank");
        break;
      case "/eqs-reports/equipment-List":
        window.open("assets/WebHelp/topics/eqs-reports.htm", "_blank");
        break;
      case "/eqs-reports/calibration-Report":
        window.open("assets/WebHelp/topics/eqs-reports.htm", "_blank");
        break;
      case "/eqs-reports/equipment-Usage":
        window.open("assets/WebHelp/topics/eqs-reports.htm", "_blank");
        break;
      case "/eqs-settings/user-settings":
        window.open("assets/WebHelp/topics/eqs-settings.htm", "_blank");
        break;
      case "/usermanagement":
        window.open("assets/WebHelp/topics/admin-introduction.htm", "_blank");
        break;
      case "/usermanagement/adduser":
        window.open(
          "assets/WebHelp/topics/admin-user-management-users.htm",
          "_blank"
        );
        break;
      case "/Permission":
        window.open(
          "assets/WebHelp/topics/admin-user-management-permission-groups.htm",
          "_blank"
        );
        break;
      case "/Permission/CreatePermission":
        window.open(
          "assets/WebHelp/topics/admin-user-management-permission-groups.htm",
          "_blank"
        );
        break;
      case "/departments":
        window.open(
          "assets/WebHelp/topics/admin-user-management-departments.htm",
          "_blank"
        );
        break;
      case "/audittrail":
        window.open("assets/WebHelp/topics/admin-audit-trail.htm", "_blank");
        break;
      case "/icshome/editinstrument":
        window.open(
          "assets/WebHelp/topics/ics-instrument-master.htm",
          "_blank"
        );
        break;
      case "/eqs-home/editequipment":
        window.open(
          "assets/WebHelp/topics/eqs-equipment-master.htm",
          "_blank"
        );
        break;
      case "/elnexperiments/edit":
        window.open(
          "assets/WebHelp/topics/eln-new-experiments.htm",
          "_blank"
        );
        break;
      case "/Permission-group/EditPermission":
        window.open(
          "assets/WebHelp/topics/admin-user-management-permission-groups.htm",
          "_blank"
        );
        break;
      case "/usermanagement/edituser":
        window.open(
          "assets/WebHelp/topics/admin-user-management-users.htm",
          "_blank"
        );
        break;

      default:
        window.open(
          "assets/WebHelp/topics/getting-started-application-module-master.htm",
          "_blank"
        );

    }
  }






  help1() {
    if (this.router.url === '/landing') {
      window.open('assets/WebHelp/topics/getting-started-application-module-master.htm', '_blank');
    } else if (this.router.url === '/elnhome') {
      window.open('assets/WebHelp/topics/eln-introduction.htm', '_blank');
    } else if (this.router.url === '/elnexperiments/new') {
      window.open('assets/WebHelp/topics/eln-new-experiments.htm', '_blank');
    } else if (this.router.url === '/elnnusersettings') {
      window.open('assets/WebHelp/topics/eln-settings.htm', '_blank');
    } else if (this.router.url === '/icshome') {
      window.open('assets/WebHelp/topics/ics-introduction.htm', '_blank');
    } else if (this.router.url === '/icshome/addinstrument') {
      window.open('assets/WebHelp/topics/ics-instrument-master.htm', '_blank');
    } else if (this.router.url === '/ics-parameter') {
      window.open('assets/WebHelp/topics/ics-parameters.htm', '_blank');
    } else if (this.router.url === '/ics-qualification') {
      window.open('assets/WebHelp/topics/ics-qualification.htm', '_blank');
    } else if (this.router.url === '/ics-calibration') {
      window.open('assets/WebHelp/topics/ics-calibration.htm', '_blank');
    } else if (this.router.url === '/ics-maintenance') {
      window.open('assets/WebHelp/topics/ics-maintenance.htm', '_blank');
    } else if (this.router.url === '/ics-reports/instrumentsList') {
      window.open('assets/WebHelp/topics/ics-reports.htm', '_blank');
    } else if (this.router.url === '/ics-reports/instrumentsHistory') {
      window.open('assets/WebHelp/topics/ics-reports.htm', '_blank');
    } else if (this.router.url === '/ics-reports/calibrationReport') {
      window.open('assets/WebHelp/topics/ics-reports.htm', '_blank');
    } else if (this.router.url === '/ics-settings/usersetting') {
      window.open('assets/WebHelp/topics/ics-settings.htm', '_blank');
    } else if (this.router.url === '/eqs-home') {
      window.open('assets/WebHelp/topics/eqs-introduction.htm', '_blank');
    } else if (this.router.url === '/eqs-home/addequipment') {
      window.open('assets/WebHelp/topics/eqs-equipment-master.htm', '_blank');
    } else if (this.router.url === '/eqs-parameter') {
      window.open('assets/WebHelp/topics/eqs-parameters.htm', '_blank');
    } else if (this.router.url === '/eqs-qualification') {
      window.open('assets/WebHelp/topics/eqs-qualification.htm', '_blank');
    } else if (this.router.url === '/eqs-calibration') {
      window.open('assets/WebHelp/topics/eqs-calibration.htm', '_blank');
    } else if (this.router.url === '/eqs-maintenance') {
      window.open('assets/WebHelp/topics/eqs-maintenance.htm', '_blank');
    } else if (this.router.url === '/eqs-reports/equipment-List') {
      window.open('assets/WebHelp/topics/eqs-reports.htm', '_blank');
    } else if (this.router.url === '/eqs-reports/calibration-Report') {
      window.open('assets/WebHelp/topics/eqs-reports.htm', '_blank');
    } else if (this.router.url === '/eqs-reports/equipment-History') {
      window.open('assets/WebHelp/topics/eqs-reports.htm', '_blank');
    } else if (this.router.url === '/eqs-settings/user-settings') {
      window.open('assets/WebHelp/topics/eqs-settings.htm', '_blank');
    } else if (this.router.url === '/usermanagement') {
      window.open('assets/WebHelp/topics/admin-introduction.htm', '_blank');
    } else if (this.router.url === '/usermanagement/adduser') {
      window.open('assets/WebHelp/topics/admin-user-management-users.htm', '_blank');
    } else if (this.router.url === '/Permission') {
      window.open('assets/WebHelp/topics/admin-user-management-permission-groups.htm', '_blank');
    } else if (this.router.url === '/Permission/CreatePermission') {
      window.open('assets/WebHelp/topics/admin-user-management-permission-groups.htm', '_blank');
    } else if (this.router.url === '/departments') {
      window.open('assets/WebHelp/topics/admin-user-management-departments.htm', '_blank');
    } else if (this.router.url === '/audittrail') {
      window.open('assets/WebHelp/topics/admin-audit-trail.htm', '_blank');
    }
  }

  getUserInfo() {
    this.UserInfo = this.loginService.getLoginUser();
  }
}
