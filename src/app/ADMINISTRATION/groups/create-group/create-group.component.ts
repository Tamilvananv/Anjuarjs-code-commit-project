import {
  Component,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  ElementRef,
} from "@angular/core";
import { DialogComponent } from "@syncfusion/ej2-angular-popups";
import {
  TabComponent,
  SelectEventArgs,
} from "@syncfusion/ej2-angular-navigations";
import { GridLine } from "@syncfusion/ej2-grids";
import { Permission, FeatureAndModule } from "../Service/group.model";
import { GroupService } from "../Service/group.service";
import { ToastrService } from "ngx-toastr";
import { toolbarRenderComplete } from "@syncfusion/ej2-angular-richtexteditor";
import { NonNullAssert } from "@angular/compiler";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from "@angular/forms";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
import { TreeGridComponent } from "@syncfusion/ej2-angular-treegrid";
import { ConfirmationDialogService } from "src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service";

@Component({
  selector: "app-create-group",
  templateUrl: "./create-group.component.html",
  styleUrls: ["./create-group.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CreateGroupComponent implements OnInit {
  @ViewChild("tab", { static: true }) tab: TabComponent;
  @ViewChild("alertDialog", { static: true }) alertDlg: DialogComponent;
  @ViewChild("Treegrid", { static: false }) Treegrid: TreeGridComponent;

  public checked: false;
  public collaspe: false;
  public FeatureName: object[];
  public topMenus: any[] = [];
  public lines: GridLine;
  public dlgButtons: Object[] = [];
  public headerText: Object[] = [];
  GroupForm: FormGroup;
  public savelist: any[] = [];
  isGroupEdit = false;
  public GroupId;
  public FeatureList;
  public FeatureListCopy;
  public updateFlag : boolean = false;

  constructor(
    private _groupService: GroupService,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService,
    private routes: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.SetGroupForm();
    this.route.params.subscribe((params) => {
      if (!isNaN(Number(params["id"]))) {
        this.GroupForm.patchValue({
          PermissionId: Number(params["id"]),
        });
        this.isGroupEdit = true;
        this.GetGroupDetails();
      } else {
        this.getFeatureName();
      }
    });
    this.lines = "Both";
    this.headerText = [{ text: "General" }, { text: "Permissions" }];
    document.body.style.visibility = "hidden";
    this.dlgButtons = [
      {
        buttonModel: { content: "Ok", isPrimary: true },
        click: () => {
          this.alertDlg.hide();
          this.tab.enableTab(0, true);
          this.tab.enableTab(1, false);
          this.tab.enableTab(2, false);
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
      case "goBackDetails":
        this.tab.enableTab(0, true);
        this.tab.select(0);
        this.tab.enableTab(1, false);
        break;
    }
  }

  SetGroupForm() {
    this.GroupForm = this.formBuilder.group({
      PermissionId: [""],
      PermissionName: ["", Validators.required],
      PermissionDescription: [""],
    });
  }

  SaveGroupForm() {
    if (this.GroupForm.valid) {
      this._groupService.SaveGroup(this.GroupForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.GroupId = res["Object"];
          this.tab.enableTab(0, false);
          this.tab.enableTab(1, true);
          this.tab.select(1);
        } else {
          this._toastr.error(res["ResultMessage"]);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.GroupForm);
    }
  }

  getFeatureName() {
    this._groupService.getFeatureName().subscribe((data) => {
      this.FeatureList = data["Object"];    
      this.ConvertIntoTreeStructure(this.FeatureList);
    });
    this._groupService.getFeatureName().subscribe((data) => {
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

  SaveGroupPermission() {
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
      console.log("Save List :", this.savelist);
      this._groupService
        .SaveGroupPermission(this.savelist, this.GroupId)
        .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.getfeatureListCopy(this.GroupId);
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this._toastr.error("At Least One Feature Is Mandatory.");
    }
  }

  GetGroupDetails() {
    this._groupService
      .GetGroupDetails(this.GroupForm.get("PermissionId").value)
      .subscribe((data) => {
        const ObjectData = data["Object"];
        if (ObjectData != null) {
          this.GroupForm.patchValue({
            PermissionId: ObjectData.PermissionId,
            PermissionName: ObjectData.PermissionName,
            PermissionDescription: ObjectData.PermissionDescription,
          });
        } else {
          this.GroupForm.patchValue({
            PermissionId: null,
            PermissionName: null,
            PermissionDescription: null,
          });
        }
      });
    this.getGroupPermissinDetails(this.GroupForm.get("PermissionId").value);
    this.getfeatureListCopy(this.GroupForm.get("PermissionId").value);
  }

  UpdateGroup() {
    if (this.GroupForm.valid) {
      this._groupService.UpdateGroup(this.GroupForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.tab.enableTab(0, false);
          this.tab.enableTab(1, true);
          this.tab.select(1);
        } else {
          this._toastr.error(res["ResultMessage"]);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.GroupForm);
    }
  }

  MarkFeatureRead(event, readObj) {
    console.log("event : ", event);
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
    console.log("Event :", event);
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

  getGroupPermissinDetails(GroupId: any) {
    this._groupService.getGroupPermissinDetails(GroupId).subscribe((data) => {
      this.FeatureList = data["Object"];    
      this.ConvertIntoTreeStructure(this.FeatureList);
    });    
  }

  UpdateGroupPermission() {
    this._groupService
      .UpdateGroupPermission(
        this.savelist,
        this.GroupForm.get("PermissionId").value
      )
      .subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.getfeatureListCopy(this.GroupForm.get("PermissionId").value);
          this.updateFlag= true
        } else {
          this._toastr.error(res["ResultMessage"]);
          this.updateFlag= false
        }
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
      ); //extract parent feature

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

        //  menuItem.SubFeatureList = IS_ChildExists;

        //4th level
        /*   menuItem.SubFeatureList.forEach(function (menuItem) {
                    var IS_ChildExists = featureList.filter((f) => f.FeatureParentId == menuItem.FeatureId);                
                    menuItem.SubFeatureList = IS_ChildExists; 
                }); */
      });
    });
    this.topMenus = moduleNameList;
  }

  getfeatureListCopy(GroupId) {
    this._groupService.getGroupPermissinDetails(GroupId).subscribe((data) => {
      this.FeatureListCopy = data["Object"];      
    });
  }

  gotoGroup(value : boolean) {   
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
                    if(value == false)
                    {
                    this.UpdateGroupPermission();                  
                    this.routes.navigate(["/Permission-group"]);
                   
                    }
                    else if(value = true)
                    {
                      this.SaveGroupPermission();
                      this.routes.navigate(["/Permission-group"]);
                    }
                   
                  } else {
                    this.routes.navigate(["/Permission-group"]);
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
      this.routes.navigate(["/Permission-group"]);
    }
  }

  GridReadHeaderClicked(event: any) {
    console.log("checked value :", event.target.checked);
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
          }
        });
    }
  }

  GridWriteHeaderClicked(event: any) {
    console.log("checked value :", event.target.checked);
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
          }
        });
    }
  }
}
