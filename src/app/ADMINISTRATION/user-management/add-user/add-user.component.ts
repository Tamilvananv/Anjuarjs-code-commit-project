import {
  Component,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  ElementRef,
} from "@angular/core";
import {
  FieldSettingsModel,
  ToolbarSettingsModel,
} from "@syncfusion/ej2-dropdowns";
import { DialogComponent } from "@syncfusion/ej2-angular-popups";
import {
  TabComponent,
  SelectEventArgs,
} from "@syncfusion/ej2-angular-navigations";
import { isNullOrUndefined as isNOU } from "@syncfusion/ej2-base";
import { GridLine } from "@syncfusion/ej2-grids";
import { UserService } from "../service/add-user.service";
//import { FeatureAndModule } from '../service/add-user.model';
import { ToastrService } from "ngx-toastr";
import { ListBoxComponent } from "@syncfusion/ej2-angular-dropdowns";
import { isUndefined, isNullOrUndefined } from "util";
import {
  GridComponent,
  RowSelectEventArgs,
  SelectionService,
  TextWrapSettingsModel,
  PageService,
} from "@syncfusion/ej2-angular-grids";
import { Router, ActivatedRoute } from "@angular/router";
import {
  EditSettingsModel,
  ToolbarItems,
  CellEditArgs,
  PageSettingsModel 
} from "@syncfusion/ej2-angular-grids";
import { ConfirmationDialogService } from "src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service";
import { VALUE } from "@syncfusion/ej2-angular-filemanager";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdditionalUserInfoEnt } from "../service/add-user.model";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
  providers: [SelectionService , PageService],
  encapsulation: ViewEncapsulation.None,
})
export class AddUserComponent implements OnInit {
  @ViewChild("tab", { static: true }) tab: TabComponent;
  @ViewChild("alertDialog", { static: true }) alertDlg: DialogComponent;
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild("listbox1", { static: false }) public ListBox1: ListBoxComponent;
  @ViewChild("listbox2", { static: false }) public ListBox2: ListBoxComponent;
  @ViewChild("managergrid", { static: false }) 
  public managergrid: GridComponent;
  public dateValue: Date = new Date();
  public setfields: Object = { text: "Name", value: "Id" };
  public Deptfields: FieldSettingsModel = {
    text: "DepartmentName",
    value: "DepartmentId",
  };
  public toolbarSettings: ToolbarSettingsModel = {
    items: ["moveTo", "moveFrom"],
  };
  public edit: Object = {
    allowAdding: true,
    allowDeleting: true,
    allowEditing: true,
  };

  public lines: GridLine;
  public dlgButtons: Object[] = [];
  public headerText: Object[] = [];
  public ObjGroupNameList: object[];
  public ObjUserNameList: object[];
  public objSaveDataList: object[];
  public DepartmentList = [];
  public SaveDepartmentList: object[];
  public ObjManagerList: object[];
  public ObjUserManagerList: object[];
  public topMenus: any[] = [];
  public savelist: any[] = [];
  public PermissionGroupId = null;
  public UserId = null;
  public Username: any;
  public UserEmail: any;
  public SaveUserData: any;
  public ManagerId: any;
  isUserEdit = false;
  public ObjUserDepartmentList = [];
  public checked: boolean;
  public flag: boolean;
  public ObjAzureUserNameList: object[];
  public toolbar: ToolbarItems[];
  // public initialPage: PageSettingsModel ;
  public initialPage: Object;
  public format:any;
  UserInfoForm: FormGroup;
  public FeatureListCopy;
  constructor(
    private _UserService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private routes: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService
  ) {}

  ngOnInit(): void {
    this.GetPermissionGroupNameList();   
    this.SetForm();
    this.route.params.subscribe((params) => {
      if (!isNaN(Number(params["id"]))) {
        this.UserId = Number(params["id"]);
        this.isUserEdit = true;
        this.tab.enableTab(0, false);
        this.tab.enableTab(1, true);
        this.tab.enableTab(2, false);
        this.tab.enableTab(3, false);
        this.tab.enableTab(4, false);
        this.tab.select(1);
        this.GetUserDetails();
        this.getUserDepartmentDetails();
        this.getUserPermissinDetails();
        //this.getManagerList();
       // this.GetUserAdditionalDetails();        
        this.getUserManagerDetails();
        this.getfeatureListCopy();
      } else {
        
        this.getAzureAdData();
        this.getFeatureName();
        this.getDepartmentlist();
      }
    });
  //  this.format={type:'date',format:'dd-MMM-yyyy'}
    this.toolbar = ["Search"];
    this.initialPage = { pageSize: 10 };
    this.lines = "Both";
    this.headerText = [
      { text: "Add User" },
      { text: "Department" },
      { text: "Select Manager" },
      { text: "Set Permissions" },
      { text: "Additional User Information" }
    ];
    document.body.style.visibility = "hidden";
    this.dlgButtons = [
      {
        buttonModel: { content: "Ok", isPrimary: true },
        click: () => {
          this.alertDlg.hide();
          this.tab.enableTab(0, true);
          this.tab.enableTab(1, false);
          this.tab.enableTab(2, false);
          this.tab.enableTab(3, false);
          this.tab.enableTab(4, false);
          this.tab.select(0);
        },
      },
    ];
  }
  public ngAfterViewInit(): void {
    document.body.style.visibility = "visible";
  }
  public tabSelected(e: SelectEventArgs): void {
    if (e.isSwiped) {
      e.cancel = true;
    }
  }

  public dlgCreated(): void {
    this.alertDlg.hide();
  }

  public btnClicked(e: any): void {
    switch (e.target.id) {
      case "goBackToManager":
        this.tab.enableTab(2, true);
        this.tab.select(2);
        this.tab.enableTab(3, false);
        this.tab.enableTab(1, false);
        this.tab.enableTab(0, false);
        break;
      case "goBackToDepartment":
        this.tab.enableTab(1, true);
        this.tab.select(1);
        this.tab.enableTab(2, false);
        this.tab.enableTab(3, false);
        this.tab.enableTab(0, false);
        break;
      case "goBackToUser":
        this.tab.enableTab(0, true);
        this.tab.select(0);
        this.tab.enableTab(1, false);
        this.tab.enableTab(2, false);
        this.tab.enableTab(3, false);
        break;
        case "goBackToUserInformation":
        // this.GetUserAdditionalDetails();   
          this.tab.enableTab(3, true);
          this.tab.select(3);
          this.tab.enableTab(4, false);
          this.tab.enableTab(2, false);
          this.tab.enableTab(1, false);
          this.tab.enableTab(0, false);
          break;
    }  

  }

  public EditbtnClicked(e: any): void {
    switch (e.target.id) {
      case "goBackToManager":
        this.tab.enableTab(2, false);
        this.tab.enableTab(1, true);
        this.tab.select(1);
        break;
      case "goBackToDepartment":
        this.tab.enableTab(0, true);
        this.tab.select(0);
        this.tab.enableTab(1, false);
        break;
        case "goBackToUserInformation":
        //  this.GetUserAdditionalDetails();   
          this.tab.enableTab(2, true);
          this.tab.select(2);
          this.tab.enableTab(3, false);
          break;
        
    }
  }

  GetPermissionGroupNameList() {
    this._UserService.GetPermissionGroupNameList().subscribe((data) => {
      this.ObjGroupNameList = data["Object"];
    });
  }

  getADUserList() {
    this._UserService.getADUserName().subscribe((data) => {
      this.ObjUserNameList = data["Object"];
    });
  }

  getManagerList() {
    this._UserService.getManagerList().subscribe((data) => {
      let ManagerList = data["Object"];
      let ManagerFilterList = ManagerList.filter(
        (f) => f.EmailId != this.UserEmail
      );
      this.ObjManagerList = ManagerFilterList;
    });
  }

  rowSelected(args: RowSelectEventArgs) {
    this.SaveUserData = args.data;
  }

  rowDeselected(args: RowSelectEventArgs) {
    this.SaveUserData = null;
  }

  rowSelecting(e) {
    if (this.grid.getSelectedRecords().length) {
      this.grid.clearSelection();
    }
  }

  headerCellInfo(args) {
    args.node.getElementsByClassName("e-checkbox-wrapper")[0] &&
      args.node.getElementsByClassName("e-checkbox-wrapper")[0].remove();
  }

  SaveUser() {
    if (isNullOrUndefined(this.SaveUserData)) {
      this.toastr.error("Please Add User First");
      return false;
    }
    this._UserService.SaveUser(this.SaveUserData).subscribe((res) => {
      if (res["Result"]) {
        this.toastr.success(res["ResultMessage"]);
        this.UserId = res["Object"];
        this.Username =
          this.SaveUserData.givenName + " " + this.SaveUserData.surname;
        this.UserEmail = this.SaveUserData.userPrincipalName;
        this.tab.enableTab(0, false);
        this.tab.enableTab(1, true);
        this.tab.select(1);
      } else {
        this.toastr.error(res["ResultMessage"]);
      }
    }); 
  }

  getFeatureName() {
    this._UserService.getFeatureName().subscribe((data) => {
      let FeatureList = data["Object"];
      this.ConvertIntoTreeStructure(FeatureList);
    });
    this._UserService.getFeatureName().subscribe((data) => {
      this.FeatureListCopy = data["Object"];   
    });
  }

  getChildElements(ID, Data) {
    let newList = [];
    let childMenu = Data.filter((f) => f.FeatureParentId == ID);
    let serviceRef = this;
    childMenu.forEach(function (menuItem, key) {
      let IS_ChildExists = Data.filter(
        (f) => f.FeatureParentId == menuItem.FeatureId
      );
      if (IS_ChildExists != null && IS_ChildExists.length > 0) {
        menuItem.SubFeatureList = serviceRef.getChildElements(
          menuItem.FeatureId,
          Data
        );
      }
      newList.push(menuItem);
    });
    return newList;
  }

  MarkFeatureRead(event, readObj) {
    if (readObj.ModuleId != null && readObj.FeatureId == 0) {
      this.savelist.forEach((x) => {
        if (x.ModuleId == readObj.ModuleId) x.FeatureRead = readObj.FeatureRead;
      });
      this.ConvertIntoTreeStructure(this.savelist);
    } else {
      this.savelist.forEach((x) => {
        if (x.FeatureId == readObj.FeatureId) {
          x.FeatureRead = readObj.FeatureRead;
        }
        if (x.FeatureParentId == readObj.FeatureId) {
          x.FeatureRead = readObj.FeatureRead;
          this.ConvertIntoTreeStructure(this.savelist);
        }
      });
    }
  }

  MarkFeatureWrite(event, writeObj) {
    if (writeObj.ModuleId != null && writeObj.FeatureId == 0) {
      this.savelist.forEach((x) => {
        if (x.ModuleId == writeObj.ModuleId && x.HasWriteAccess == true)
          x.FeatureWrite = writeObj.FeatureWrite;
        if (x.ModuleId == writeObj.ModuleId && writeObj.FeatureWrite == true) {
          x.FeatureRead = writeObj.FeatureWrite;
        }
      });
      this.ConvertIntoTreeStructure(this.savelist);
    } else {
      this.savelist.forEach((x) => {
        if (x.FeatureId == writeObj.FeatureId) {
          x.FeatureWrite = writeObj.FeatureWrite;
          if (writeObj.FeatureWrite == true) {
            x.FeatureRead = writeObj.FeatureWrite;
          }
          this.ConvertIntoTreeStructure(this.savelist);
        }
        if (x.FeatureParentId == writeObj.FeatureId) {
          if (x.HasWriteAccess == true) {
            x.FeatureWrite = writeObj.FeatureWrite;
          }
          if (writeObj.FeatureWrite == true) {
            x.FeatureRead = writeObj.FeatureWrite;
          }
          this.ConvertIntoTreeStructure(this.savelist);
        }
      });
    }
  }

  SaveDepartMent() {
    var item1 = this.ListBox1.getDataList();
    var SaveDepartmentListData = this.ListBox2.getDataList();

    /* this.tab.enableTab(1, false);
    this.tab.enableTab(2, true);
    this.tab.select(2);
    this.getManagerList(); */

     if (SaveDepartmentListData.length <= 0) {
      this.toastr.error("Please select Department");
      return false;
    }
    else{
    this._UserService
      .SaveUserDepartment(SaveDepartmentListData, this.UserId)
      .subscribe((res) => {
        if (res["Result"]) {
          this.toastr.success(res["ResultMessage"]);
          this.tab.enableTab(1, false);
          this.tab.enableTab(2, true);
          this.tab.select(2);
          this.getManagerList();
        } else {
          this.toastr.error(res["ResultMessage"]);
        }
      }); 
    }
  }

  GetGroupPermission() {
    this._UserService
      .getGroupPermissinDetails(this.PermissionGroupId)
      .subscribe((data) => {
        let FeatureList = data["Object"];
        this.ConvertIntoTreeStructure(FeatureList);
      });
  }

  getDepartmentlist() {
    this._UserService.getDepartmentlist().subscribe((data) => {
      this.DepartmentList = data["Object"];
    });
  }

  OnChangeGetGroupId(e: any) {
    this.PermissionGroupId = e.itemData.Id;
    this.GetGroupPermission();
  }

  SaveUserPermission() {
    var result = false,
      i;
    for (i = 0; i < this.savelist.length; i++) {
      if (
        this.savelist[i].FeatureWrite == true ||
        this.savelist[i].FeatureRead == true
      ) {
        result = true;
        break;
      }
    }
    if (result == true) {
      this._UserService
        .SaveUserPermissions(this.savelist, this.UserId)
        .subscribe((res) => {
          if (res["Result"]) {
            this.getfeatureListCopy();
            this.toastr.success(res["ResultMessage"]);
           /*  this.tab.enableTab(0, false);
            this.tab.enableTab(1, false);
            this.tab.enableTab(2, false);
            this.tab.enableTab(3, false);
            this.tab.enableTab(4, true);
            this.tab.select(4); */
          } else {
            this.toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.toastr.error("At Least One Feature Is Mandatory..");
      /* this.tab.enableTab(0, false);
      this.tab.enableTab(1, false);
      this.tab.enableTab(2, false);
      this.tab.enableTab(3, false);
      this.tab.enableTab(4, true);
      this.tab.select(4); */
    }
  }

  getUserPermissinDetails() {
    this._UserService.getUserPermissinDetails(this.UserId).subscribe((data) => {
      let FeatureList = data["Object"];
      this.ConvertIntoTreeStructure(FeatureList);
    });
  }

  UpdateUserPermission() {
    this._UserService
      .UpdateUserPermissions(this.savelist, this.UserId)
      .subscribe((res) => {
        if (res["Result"]) {
          this.getfeatureListCopy();
          this.toastr.success(res["ResultMessage"]);
        /*   this.tab.enableTab(1, false);
          this.tab.enableTab(3, true);
          this.tab.select(3); */
        } else {
          this.toastr.error(res["ResultMessage"]);
          /* this.tab.enableTab(1, false);
          this.tab.enableTab(3, true);
          this.tab.select(3); */
        }
      });
  }

  UpdateUserDepartment() {
    var item1 = this.ListBox1.getDataList();
    var item2 = this.ListBox2.getDataList();
    if (item2.length <= 0) {
      this.toastr.error("Please select Department");
      return false;
    }
else{
    this._UserService
      .UpdateUserDepartment(item2, this.UserId)
      .subscribe((res) => {
        if (res["Result"]) {
          this.toastr.success(res["ResultMessage"]);
          //this.getUserDepartmentDetails();
          this.tab.enableTab(0, false);
          this.tab.enableTab(1, true);
          this.tab.select(1);
          this.getManagerList();
        } else {
          this.toastr.error(res["ResultMessage"]);
        }
      });
    }
  }

  GetUserDetails() {
    this._UserService.getUserDetails(this.UserId).subscribe((data) => {
      this.ObjUserNameList = data["Object"];
      this.Username =
        this.ObjUserNameList["0"].FirstName +
        " " +
        this.ObjUserNameList["0"].LastName;
      this.UserEmail = this.ObjUserNameList["0"].EmailId;
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

  ConvertIntoTreeStructure(ObjFeatureList: any) {
    this.savelist = ObjFeatureList;
    let serviceRef = this;

    //1st level
    let moduleNameList = ObjFeatureList.filter((f) => f.FeatureId == 0);
    moduleNameList.forEach(function (ModuleName) {
      let featureList = [];
      for (var i = 0; i < ObjFeatureList.length; i++) {
        if (
          ObjFeatureList[i].ModuleId == ModuleName.ModuleId &&
          ObjFeatureList[i].FeatureId != 0
        ) {
          featureList.push(ObjFeatureList[i]);
        }
      }

      //2nd level
      ModuleName.SubFeatureList = featureList.filter(
        (f) => f.FeatureParentId == null
      );

      //3rd level
      ModuleName.SubFeatureList.forEach(function (menuItem) {
        var IS_ChildExists = featureList.filter(
          (f) => f.FeatureParentId == menuItem.FeatureId
        );
        if (IS_ChildExists != null && IS_ChildExists.length > 0) {
          menuItem.SubFeatureList = serviceRef.getChildElements(
            menuItem.FeatureId,
            featureList
          ); //this will handle n level
        }
        // menuItem.SubFeatureList = IS_ChildExists;
      });
    });
    this.topMenus = moduleNameList;
  }

  getfeatureListCopy() {
    this._UserService.getUserPermissinDetails(this.UserId).subscribe((data) => {
      this.FeatureListCopy = data["Object"];      
    });
  }

  gotoUserHome() {
    let flag:boolean = false;
    var i = 0,
      j = 0;
    outer_loop:
    for (i = 0; i < this.FeatureListCopy.length; i++) {
      for (j = 0; j < this.savelist.length; j++) {
        if (i == j) {
          if (this.FeatureListCopy[i]["FeatureId"] != 0) {
            if (this.FeatureListCopy[i]["FeatureRead"] ==  this.savelist[j]["FeatureRead"] &&this.FeatureListCopy[i]["FeatureWrite"] == this.savelist[j]["FeatureWrite"]) {
             
              flag = true
            } else {
              flag = false;
              this.confirmationDialogService
                .confirm(
                  "Please confirm..",
                  "Do you want to Save... ?",
                  "Yes",
                  "No"
                )
                .then((result) => {
                  if (result) {  
                    this.UpdateUserPermission();                  
                    this.routes.navigate(["/usermanagement"]); 
                  } else {
                    this.routes.navigate(["/usermanagement"]);
                  }
                });
           break outer_loop;
            }
          }
          break;
        }
        
      }
    }
    if(flag == true)
    {
      this.routes.navigate(["/usermanagement"]);
    }
   
  }

  ManagerRowSelected(args: RowSelectEventArgs) {
    this.ManagerId = args.data;
  }

  ManagerRowDeselected(args: RowSelectEventArgs) {
    this.ManagerId = null;
  }

  ManagerRowSelecting(e) {
    if (this.managergrid.getSelectedRecords().length) {
      this.managergrid.clearSelection();
    }
  }

  SaveUserManager() {
    if (!isNullOrUndefined(this.ManagerId)) {
      this._UserService
        .SaveUserManager(this.UserId, this.ManagerId)
        .subscribe((res) => {
          if (res["Result"]) {
            this.toastr.success(res["ResultMessage"]);
            this.tab.enableTab(0, false);
            this.tab.enableTab(1, false);
            this.tab.enableTab(2, false);
            this.tab.enableTab(3, true);
            this.tab.select(3);
          } else {
            this.toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.tab.enableTab(0, false);
      this.tab.enableTab(1, false);
      this.tab.enableTab(2, false);
      this.tab.enableTab(3, true);
      this.tab.select(3);
    }
  }

  getUserManagerDetails() {
    this._UserService.getUserManagerDetails(this.UserId).subscribe((data) => {
      this.ObjUserManagerList = data["Object"];
    });
  }

  UpdateUserManager() {
    if (!isNullOrUndefined(this.ManagerId)) {
      this._UserService
        .UpdateUserManager(this.UserId, this.ManagerId)
        .subscribe((res) => {
          if (res["Result"]) {
            this.toastr.success(res["ResultMessage"]);
            this.tab.enableTab(1, false);
            this.tab.enableTab(2, true);
            this.tab.select(2);
          } else {
            this.toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.tab.enableTab(1, false);
      this.tab.enableTab(2, true);
      this.tab.select(2);
    }
  }

  rowDataBound(args) {
    if (this.isUserEdit == true) {
      if (this.ObjUserManagerList["EmailId"] != null) {
        if (args.data.EmailId === this.ObjUserManagerList["EmailId"]) {
          args.row
            .getElementsByClassName("e-gridchkbox")[0]
            .classList.add("disablecheckbox");
          args.row
            .getElementsByClassName("e-checkbox-wrapper")[0]
            .classList.add("disablecheckbox");
        }
      }
    }
  }

  GridReadHeaderClicked(event: any) {
    if (event.target.checked === true) {
      this.confirmationDialogService
        .confirm(
          "Please confirm..",
          "Do you want to select All Read CheckBoxes... ?",
          "Yes",
          "No"
        )
        .then((result) => {
          if (result) {
            this.savelist.forEach((x) => {
              x.FeatureRead = true;
            });
            this.ConvertIntoTreeStructure(this.savelist);
          } else {
            this.checked = false;
          }
        });
    }
    if (event.target.checked === false) {
      this.confirmationDialogService
        .confirm(
          "Please confirm..",
          "Do you want to Unselect All Read CheckBoxes... ?",
          "Yes",
          "No"
        )
        .then((result) => {
          if (result) {
            this.savelist.forEach((x) => {
              x.FeatureRead = false;
            });
            this.ConvertIntoTreeStructure(this.savelist);
          } else {
            this.checked = true;
          }
        });
    }
  }

  GridWriteHeaderClicked(event: any) {
    if (event.target.checked === true) {
      this.confirmationDialogService
        .confirm(
          "Please confirm..",
          "Do you want to select All Write CheckBoxes... ?",
          "Yes",
          "No"
        )
        .then((result) => {
          if (result) {
            this.savelist.forEach((x) => {
              if (x.HasWriteAccess == true) {
                x.FeatureWrite = true;
              }
              x.FeatureRead = true;
            });
            this.ConvertIntoTreeStructure(this.savelist);
          } else {
            this.checked = false;
          }
        });
    }
    if (event.target.checked === false) {
      this.confirmationDialogService
        .confirm(
          "Please confirm..",
          "Do you want to Unselect All Write CheckBoxes... ?",
          "Yes",
          "No"
        )
        .then((result) => {
          if (result) {
            this.savelist.forEach((x) => {
              x.FeatureWrite = false;
            });
            this.ConvertIntoTreeStructure(this.savelist);
          } else {
            this.checked = true;
          }
        });
    }
  }

  getAzureAdData() {
    this._UserService.getAzureAdData().subscribe((data) => {
      this.ObjAzureUserNameList = data["Object"];
    });
  }
 
 SaveUserAdditionalInformation()
  {     
    var result = false;
    if (this.UserInfoForm.valid) {  
        this.UserInfoForm.patchValue({    UserId: this.UserId ,
          EmailId: this.UserEmail
        }); 
       result =  isNaN((this.UserInfoForm.get('EmployeeId').value))
       if(result == false)
       {   
          this._UserService.SaveUserAdditionalInformation(this.UserInfoForm.value).subscribe(res => {
            if (res['Result']) {
              this.toastr.success(res['ResultMessage']); 
              this.resetForm();      
              this.tab.enableTab(3, false);   
              this.tab.enableTab(4, true);   
            }
            else {
              this.toastr.error(res['ResultMessage']);
            }
          });
        }
        else{
          this.toastr.error("Employee Id Should be Numeric Value Only");
        }
}
else {
  this.formErrorDisplay.showErrors(this.UserInfoForm);
} 
  }

UpdateUserAdditionalInformation()
{ 
  var result = false;
  if (this.UserInfoForm.valid) { 
    this.UserInfoForm.patchValue({    UserId: this.UserId ,
      EmailId: this.UserEmail
    }); 
    result =  isNaN((this.UserInfoForm.get('EmployeeId').value))
   // console.log("check value :",result)
   
    if(result == false)
    {
      this._UserService.SaveUserAdditionalInformation(this.UserInfoForm.value).subscribe(res => {
        if (res['Result']) {
          this.UserInfoForm.markAsPristine();
          this.toastr.success(res['ResultMessage']); 
            this.resetForm();      
            this.tab.enableTab(2, false);   
            this.tab.enableTab(3, true);
          
        }
        else {
          this.toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
      this.toastr.error("Employee Id Should be Numeric Value Only");
    }
 }
else {
  this.formErrorDisplay.showErrors(this.UserInfoForm);
} 
}

SetForm() {
    this.UserInfoForm = this.formBuilder.group({
      UserId: [""],
      EmailId:[""],
      EmployeeId: ["",Validators.required],
      DateOfJoining: ["",Validators.required],
     
    });
  }
  resetForm() {
    this.UserInfoForm.reset();
  }

  GetUserAdditionalDetails() {
    this._UserService.GetUserAdditionalDetails(this.UserId).subscribe((data) => {
      const UserDetail  = data["Object"] as AdditionalUserInfoEnt;
      this.UserInfoForm.patchValue({
        UserId: UserDetail.UserId,
        EmployeeId: UserDetail.EmployeeId,
        DateOfJoining: UserDetail.DateOfJoining,
       
      });
    });
  }

  public created(args) {   //for cancle icon on grid   
    var gridElement = this.grid.element;   
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }
  public cancelBtnClick(args) {    
    this.grid.searchSettings.key = "";
    (this.grid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";  
  }

  public createdManager(args) { //for cancle icon on grid     
    var gridElement = this.managergrid.element;   
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClickManager.bind(this);
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }
  public cancelBtnClickManager(args) {    
    this.managergrid.searchSettings.key = "";
    (this.managergrid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";  
  }

  public NextbtnClicked(e: any): void {
    switch (e.target.id) {
      case "goToManager":
        this.getManagerList();
        console.log("next : user department List lenght before : ",this.ObjUserDepartmentList.length)
        var lenght1 = this.ObjUserDepartmentList.length
        var lenght2 = this.ListBox2.getDataList().length;
        console.log("user Department count in listbox : ",lenght2)
        if(lenght1 != lenght2)
        {
          this.confirmationDialogService.confirm("Please confirm..","Do you want to Save... ?","Yes","No" ).then((result) => {
            if (result) {  
            this.UserInfoForm.markAsPristine();
             this.UpdateUserDepartment();
            } else {
              this.tab.enableTab(0, false);
              this.tab.enableTab(1, true);
               this.tab.select(1);
            }
          });
        }
        else
        {  
          this.tab.enableTab(0, false);
          this.tab.enableTab(1, true);
          this.tab.select(1);
        }
        
        break;
      case "goToUserInformation":
        if (!isNullOrUndefined(this.ManagerId)) 
          {
            this.confirmationDialogService.confirm("Please confirm..","Do you want to Save... ?","Yes","No" ).then((result) => {
              if (result) {  
                  this.UpdateUserManager();           
              }
              else {
                this.tab.enableTab(1, false);
                this.tab.enableTab(2, true);
                this.tab.select(2);
              }
            });
          }
          else
          {
            this.tab.enableTab(1, false);
            this.tab.enableTab(2, true);
            this.tab.select(2);
          }
        break;
        case "goToUserPermission":              
        if(this.UserInfoForm.dirty){
          e.preventDefault();
          this.confirmationDialogService.confirm('Please confirm..', 'Do you want to save your changes... ?', 'Yes', 'No').then((result) => {
            if (result) {
              this.UpdateUserAdditionalInformation();
            } else {
              this.UserInfoForm.markAsPristine();             
              this.tab.enableTab(2, false);   
              this.tab.enableTab(3, true);
              this.tab.select(3);
            }           
          });
        }
        else
      {
          this.tab.enableTab(2, false);   
          this.tab.enableTab(3, true);
          this.tab.select(3);
      }
         
          break;
        
    }
  }
 

}
