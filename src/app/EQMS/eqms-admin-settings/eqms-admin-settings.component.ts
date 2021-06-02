import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/ADMINISTRATION/user-management/service/add-user.service';
import {
  FieldSettingsModel,
  ToolbarSettingsModel,
} from "@syncfusion/ej2-dropdowns";
import { ListBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-eqms-admin-settings',
  templateUrl: './eqms-admin-settings.component.html',
  styleUrls: ['./eqms-admin-settings.component.css']
})
export class EqmsAdminSettingsComponent implements OnInit {
  @ViewChild("listbox1", { static: false }) public ListBox1: ListBoxComponent;
  @ViewChild("listbox2", { static: false }) public ListBox2: ListBoxComponent;
  public DepartmentList = [];
  public ObjUserDepartmentList = [];
  public UserId = null;
  public toolbarSettings: ToolbarSettingsModel = {
    items: ["moveTo", "moveFrom"],
  };
  public Deptfields: FieldSettingsModel = {
    text: "DepartmentName",
    value: "DepartmentId",
  };
  constructor( private _UserService: UserService,) { }

  ngOnInit() {
    this.getDepartmentlist();
  }
  getDepartmentlist() {
    this._UserService.getDepartmentlist().subscribe((data) => {
      this.DepartmentList = data["Object"];
    });
  }
  getUserDepartmentDetails() {
    this._UserService.getDepartmentlist().subscribe((data) => {
      let AllDepartmentList = data["Object"];
      this._UserService.getUserDepartmentDetails(this.UserId).subscribe((data) => {
          this.ObjUserDepartmentList = data["Object"];
          if (this.ObjUserDepartmentList.length > 0) {
            //Remove Departments from Main List (DepartmentList) If departments Names presents in ObjUserDepartmentList
            let smalldata = this.ObjUserDepartmentList;
            for (var i = 0; i < smalldata.length; i++) {
              for (var j = 0; j < AllDepartmentList.length; j++) {
                if (
                  AllDepartmentList[j].DepartmentId ==
                  smalldata[i].DepartmentId
                ) {
                  AllDepartmentList.splice(j, 1);
                  break;
                }
              }
            }
          }
          this.DepartmentList = AllDepartmentList;
        });
       
    });
  }

}
