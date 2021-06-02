import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/login/Service/login.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar-ics.component.html',
  styleUrls: ['./sidebar-ics.component.css']
})
export class SidebarIcsComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private loginService: LoginService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    const ModuleId = localStorage.getItem('ModuleId');
    let loginUser = this.loginService.getLoginUser();
    if (loginUser != null) {
      this.GetModuleMenuList(loginUser['UserID']);
    }
  }

  GetModuleMenuList(userId: number) {
    const ModuleId = Number(localStorage.getItem('ModuleId'));
    this.loginService.GetModuleMenuList(userId, ModuleId).subscribe((data) => {
      let menuList = data['Object'];
      var topMenus = menuList.filter(item => item.ParentFeatureId == null || item.ParentFeatureId == 0);
      topMenus.forEach(function (menuItem) {
        menuItem.ChildFeatureList = [];
        menuItem.extralink = false;
        //menuItem.FeatureIcon = 'fa fa-retweet';
        menuItem.class = '';
        var IS_ChildExists = menuList.filter(item => item.ParentFeatureId == menuItem.FeatureId);
        if (IS_ChildExists != null && IS_ChildExists.length > 0) {
          menuItem.ChildFeatureList = this.GetChildElements(menuItem.FeatureId, menuList);
        }
      }.bind(this));
      this.sidebarnavItems = topMenus;
    });
  }

  GetChildElements(ID, listData) {
    var newList = [];
    var childMenu = listData.filter(item => item.ParentFeatureId == ID);
    childMenu.forEach(function (menuItem) {
      menuItem.ChildFeatureList = [];
      menuItem.extralink = false;
     // menuItem.FeatureIcon = '';
      menuItem.class = '';
      var IS_ChildExists = listData.filter(item => item.ParentFeatureId == menuItem.FeatureId);
      if (IS_ChildExists != null && IS_ChildExists.length > 0) {
        menuItem.ChildFeatureList = this.GetChildElements(menuItem.FeatureId, listData);
      }
      newList.push(menuItem);
    }.bind(this));
    return newList;
  }

}
