import { Component, OnInit } from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UserProfileService } from "./Service/User-Profile.service";
import { UserProfileEnt } from "./Service/User-Profile.model";
import { LoginService } from "src/app/login/Service/login.service";
import { ToastrService } from "ngx-toastr";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
import { EmitType } from "@syncfusion/ej2-base";
import { CommonService } from "src/app/Shared Services etc/Services/Common.service";
//import { Md5 } from 'ts-md5';
import { environment } from "src/environments/environment";
import { ConfirmationDialogService } from "src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service";

import {
  Edit,
  GridLine,
  FilterSettingsModel,
  EditSettingsModel,
  ToolbarService,
  CommandClickEventArgs,
  ToolbarItems,
  CommandModel,
  GridComponent,
  TextWrapSettingsModel,
  GroupSettingsModel,
  ExcelExportProperties,
  Column,
  IFilter,
  PdfExportProperties,
} from "@syncfusion/ej2-angular-grids";
import { isUndefined, isNullOrUndefined } from "util";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private routes: Router,
    private formBuilder: FormBuilder,
    private _UserProfileService: UserProfileService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private formErrorDisplay: FormErrorDisplayService,
    private _common: CommonService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  public config: PerfectScrollbarConfigInterface = {};

  public isCollapsed = false;
  public HideEditForm = false;
  public imgflag = false;
  public toolbarOptions: ToolbarItems[];
  public pageSettings: Object;
  public lines: GridLine;
  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;
  UserProfileDetailsForm: FormGroup;
  public ObjUserProfile: object = {};
  public UserInfo: object = {};

  public imgUrl;
  public AttachmentList: object[];
  public ISManager = false;
  public ObjUserSignatureList: object  [];
  public Status = false;
  public StatusMessage :string;
  options = {
    theme: "light",
    dir: "ltr",
    layout: "vertical",
    sidebartype: "full",
    sidebarpos: "fixed",
    headerpos: "fixed",
    boxed: "full",
    navbarbg: 'skin2',
    //navbarbg: "skin3",
    sidebarbg: "skin2",
    logobg: 'skin2'
   //logobg: "skin3",
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }
  public path: Object = {
    saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  };
  public onUploadSuccess(args: any): void {
    if (args.operation === "upload") {
      console.log("File uploaded successfully");
    }
  }
  public onUploadFailure(args: any): void {
    console.log("File failed to upload");
  }
  public dropEle: HTMLElement;
  ngOnInit() {
    this.imgflag = false;
    this.ISManager = false;
    this.Status = false;
    this.SetUserProfileForm();
    this.getUserProfileDetails();
    this.CheckedCurrentUserIsManager();
    this.toolbarOptions = ["Search"];
    this.pageSettings = { pageSize: 10 };
    this.lines = "Both";
  }

  SetUserProfileForm() {
    this.UserProfileDetailsForm = this.formBuilder.group({
      UserId: [""],
      EmailId: ["", [Validators.required, Validators.email]],
      FirstName: ["", Validators.required],
      LastName: [""],
      MobileNumber: [""],
      /*  Password: ["", Validators.required],
      ConfirmPassword: ["", Validators.required], */
      AttachmentList: new FormArray([]),
    });
  }
  resetUserProfileForm() {
    this.UserProfileDetailsForm.reset();
    this.AttachmentList = [];
  }

  getUserProfileDetails() {
    this.UserInfo = this.loginService.getLoginUser();

    if (this.UserInfo != null) {
      this._UserProfileService
        .getUserProfileDetails(this.UserInfo["UserID"])
        .subscribe((data) => {
          this.ObjUserProfile = data["Object"];
          this.AttachmentList = this.ObjUserProfile["AttachmentList"];
          if(this.ObjUserProfile["SingatureStatus"] == "Rejected" || this.ObjUserProfile["SingatureStatus"] =="Pending" )
          {
            this.Status = true;
          }
          this.StatusMessage = this.ObjUserProfile["SingatureStatusMessage"];
          
          if (this.AttachmentList.length > 0) {
            if (this.AttachmentList[0]["AttachmentPath"] != null) {
              this.imgflag = true;
              this.imgUrl =
                environment.apiUrl +
                "/FileManager/GetImage?path=" +
                this.AttachmentList[0]["AttachmentPath"];
            }
          }
          if (this.ObjUserProfile != null) {
            this.UserProfileDetailsForm.patchValue({
              UserId: this.ObjUserProfile["UserId"],
              EmailId: this.ObjUserProfile["EmailId"],
              FirstName: this.ObjUserProfile["FirstName"],
              LastName: this.ObjUserProfile["LastName"],
              MobileNumber: this.ObjUserProfile["MobileNumber"],
            });
          }
        });
    }
  }

  EditUserProfile() {
    this.HideEditForm = true;
  }

  validateUserForm() {
    if (isNaN(this.UserProfileDetailsForm.get("MobileNumber").value)) {
      this.toastr.error("Mobile Number Should be Numeric Value Only");
      return false;
    }
    if (!isNaN(this.UserProfileDetailsForm.get("FirstName").value)) {
      this.toastr.error("Please Enter Correct First Name");
      return false;
    }
    if (!isNaN(this.UserProfileDetailsForm.get("LastName").value)) {
      this.toastr.error("Please Enter Correct Last Name");
      return false;
    }

    /*   if (
    this.UserProfileDetailsForm.get("Password").value !==
    this.UserProfileDetailsForm.get("ConfirmPassword").value
  ) {
    this.toastr.error("Password and Confirm Password do not match");
    return false;
  } */
    return true;
  }

  public onFileSelect: EmitType<Object> = (args: any) => {
    (this.UserProfileDetailsForm.controls.AttachmentList as FormArray).removeAt(
      0
    );

    args.filesData.forEach((file) => {
      (this.UserProfileDetailsForm.controls.AttachmentList as FormArray).push(
        this.formBuilder.group({
          Attachment: file.rawFile,
        })
      );
    });
  };

  public onFileRemove(args) {
    (this.UserProfileDetailsForm.controls.AttachmentList as FormArray).removeAt(
      0
    );
  }

  UpdateUserProfile() {
    if (this.UserProfileDetailsForm.valid) {
      let fileList = this.UserProfileDetailsForm.get("AttachmentList").value;

      if (this.validateUserForm()) {
        this._UserProfileService
          .UpdateUserProfile(this.UserProfileDetailsForm.value, fileList)
          .subscribe((res) => {
            if (res["Result"]) {
              this.toastr.success(res["ResultMessage"]);
              this.HideEditForm = false;
              this.getUserProfileDetails();
              this.resetUserProfileForm();
            } else {
              this.toastr.error(res["ResultMessage"]);
            }
          });
      }
    } else {
      this.formErrorDisplay.showErrors(this.UserProfileDetailsForm);
    }
  }

  CancleButtonClick() {
    this.HideEditForm = false;
  }

  DownLoadFile(filePath) {
    this._common.DownLoadFile(filePath).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      console.log("Fileurl:", fileURL);
      window.open(fileURL, "_blank");
    });
  }
  backToLanding() {
    this.routes.navigate(["/landing"]);
  }

  CheckedCurrentUserIsManager() {
    this.UserInfo = this.loginService.getLoginUser();
    if (this.UserInfo != null) {
      this._UserProfileService
        .CheckedCurrentUserIsManager(this.UserInfo["UserID"])
        .subscribe((data) => {
          this.ISManager = data["Object"];
          if (this.ISManager == true) {
            this.GetSignatureforApprovalList(this.UserInfo["UserID"]);
          }
        });
    }
  }

  GetSignatureforApprovalList(managerId) {
    this._UserProfileService
      .GetSignatureforApproval(managerId)
      .subscribe((data) => {
        this.ObjUserSignatureList = data["Object"];
        for (var i = 0; i < this.ObjUserSignatureList.length; i++) {
          if (this.ObjUserSignatureList[i]["Status"] == "Approved" || this.ObjUserSignatureList[i]["Status"] == "Rejected" ) {
            this.ObjUserSignatureList[i]["ShowApprovalAndRejectButton"] = false
          }
        }
      });
  }

  ApproveSignature(event, data) {
    this.confirmationDialogService
      .confirm(
        "Please confirm..",
        "Do you want to Approve Signature",
        "Yes",
        "No"
      )
      .then((result) => {
        if (result) {
          this._UserProfileService.ApproveSignature(data).subscribe((res) => {
            if (res["Result"]) {
              this.toastr.success(res["Object"]["ResultMessage"]);
              this.UserInfo = this.loginService.getLoginUser();
              if (this.UserInfo != null) {
                this.GetSignatureforApprovalList(this.UserInfo["UserID"]);
              }
            } else {
              this.toastr.error(res["ResultMessage"]);
            }
          });
        }
      });
  }

  RejectSignature(event, data) {
    this.confirmationDialogService
      .confirm(
        "Please confirm..",
        "Do you want to Reject Signature",
        "Yes",
        "No"
      )
      .then((result) => {
        if (result) {
          this._UserProfileService.RejectSignature(data).subscribe((res) => {
            if (res["Result"]) {
              this.toastr.success(res["Object"]["ResultMessage"]);
              this.UserInfo = this.loginService.getLoginUser();
              if (this.UserInfo != null) {
                this.GetSignatureforApprovalList(this.UserInfo["UserID"]);
              }
            } else {
              this.toastr.error(res["ResultMessage"]);
            }
          });
        }
      });
  }
}
