import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter,Output } from '@angular/core';
import { GridLine, TextWrapSettingsModel, FilterSettingsModel, ToolbarItems, CommandClickEventArgs, CommandModel } from '@syncfusion/ej2-grids';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EqmsCc } from '../eqms-cc.model';
import { ChangeControlDataServiceService } from '../change-control-data-service.service';
import { EmitType } from '@syncfusion/ej2-base';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from "@angular/router";
import { LoginService } from 'src/app/login/Service/login.service';
import { RaiseNewRequestComponent } from '../raise-new-request/raise-new-request.component';
@Component({
  selector: 'app-change-details',
  templateUrl: './change-details.component.html',
  styleUrls: ['./change-details.component.css']
})
export class ChangeDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild('addParameterModal', { static: false }) headerModal;
  
  //@ViewChild('tabset', { static: true }) tabset;
  public ajaxSettings: AjaxSettingsModel;
  public _restApi = environment.apiUrl + '/FileManager/';
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
  public toolbarSettings: object;
  public uploadSettings: object;
  public ChangeControlNumber;
  public ChangeControlNumberId;
  public AllowedForEditUser;
  public objDepartmentList: Object[];
  EQMSAddChangeDetailsformData: FormGroup;
  EQMSAddApprovalsChangeDetailsformData: FormGroup;
  EQMSAddRequisitionDetailsform: FormGroup;
  public fields: Object = { text: 'Name', value: 'Id' };
  EQMSAddRequisitionDetailsformData: EqmsCc;
  public UserInfo: object = {};
  public ObjChangeDetailsApprovalData: Object[];
  public UserId;
  public lines: GridLine;
  public wrapSettings: TextWrapSettingsModel;
  public filterOptions: FilterSettingsModel;
  public toolbarOptions: ToolbarItems[];
  closeResult: string;
  public IfEditForNotAllowed: boolean = true;
  public btnNext: boolean = false;
  public ChangeControlInfo: object = {};
  public ObjChangeDetailsList: object;
  public AttachmentList: object[];
  public restrictedPath: string;
  public EqmsCcChangeDetailsId;
  public commands: CommandModel[];
  public NgifForEdit: boolean = true;
  constructor(private modalService: NgbModal,private RNRequest:RaiseNewRequestComponent, private _toastr: ToastrService, private _EqmsChangeControl: ServiceService,
    private data: ChangeControlDataServiceService, private loginService: LoginService, private formBuilder: FormBuilder, private router: ActivatedRoute) { }
  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };
  public onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {
      console.log('File uploaded successfully');
    }
  }
  public onUploadFailure(args: any): void {
    console.log('File failed to upload');
  }
  public dropEle: HTMLElement;

  async ngOnInit() {

    this.GetDepartmentList();
    this.setForm();
    this.resetForm();
    this.getChangeControlNumberValue();
    this.load();
    this.commands = [
      {
        type: "Edit",
        buttonOption: { iconCss: "fa fa-edit", cssClass: "e-flat" },
      },
      {
        type: "None",
        buttonOption: { iconCss: "fa fa-eye", cssClass: "e-flat" },
      },
    ];

    this.data.currenntVersionObj.subscribe(obj => {
      this.EQMSAddRequisitionDetailsformData = obj;
      // this.GetDepartmentList();
    });
    this.lines = 'Both';
    this.wrapSettings = { wrapMode: 'Content' };
    this.filterOptions = {
      type: 'Menu'
    };
    this.toolbarOptions = ['ExcelExport'];


    // this.GetControlNum();



  }
  GetApprovalData(CCNumId) {

    this._EqmsChangeControl.GetChangeDetailsAapprovalData(CCNumId, this.UserId).subscribe((data2) => {
      this.ObjChangeDetailsApprovalData = data2['Object'];
      if(this.ObjChangeDetailsApprovalData.length!=0)
      {
        this.IfEditForNotAllowed = true;
        this.btnNext=true;
      }
    });


  }
  async ngAfterViewInit() {
    await this.getUserInfo()
    await this.router.data.subscribe(data => {
      let Action = data.urls[3]["title"];
      if (Action == "Edit Request") {
        this.NgifForEdit = true;
        //var Rowdata = this._EqmsChangeControl.getOptionEditRow();
        console.log('ssssssssssssssssssssssssssssssssss');



      } else {
        this.NgifForEdit = false;
        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      }
    })
  }
  setForm() {

    this.EQMSAddChangeDetailsformData = this.formBuilder.group({
      EqmsCcChangeDetailsId: [''],
      EqmsCcChangeControlNumberId: ['', Validators.required],
      EqmsCcProposedChange: [''],
      EqmsCcProcedure: [''],
      EqmsCcJustification: [''],
      DepartmentId: [''],
      EqmsCcActionPlan: [''],
      EqmsCcAttachment: [''],
      /*  EqmsCcChangeControlNumberId: [''],
       EqmsCcChangeControlNumber: [''] */
      AttachmentList: new FormArray([])
    });
    this.EQMSAddApprovalsChangeDetailsformData= this.formBuilder.group({
      EqmsCcChangeControlNumberId: ['', Validators.required],
      EqmsCcSignAndSubmitedBy: [''],
    });
  }
  getUserInfo() {
    this.loginService.getUserBasicInfo().subscribe((data) => {
      localStorage.setItem('LoginUser', JSON.stringify(data['Object']));
      this.UserInfo = JSON.parse(localStorage.getItem('LoginUser'));
      this.UserId = this.UserInfo['UserID'];
      console.log("UserID", this.UserId);
      this.GetApprovalData(this.ChangeControlNumberId);
      this.getUserLead(this.AllowedForEditUser);
    });
  }

  async getUserLead(UserId)
  {
    await this._EqmsChangeControl.GetgetUserLeadData(UserId).subscribe((data2) => {
      var UserLead = data2['Object'];
      if (UserLead == this.UserId) {
        this.IfEditForNotAllowed = false;
      }
      else {
        this.IfEditForNotAllowed = true;
      }
    });

  }
  moveToTab(tabId) {
    this.RNRequest.moveToTab(tabId);
  }
  resetForm() {
    this.EQMSAddChangeDetailsformData.reset();
    this.AttachmentList = [];
    //this.EQMSAddChangeDetailsformData.get('AttachmentList').value.reset();
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    // this.MaintenanceFormGrp.patchValue({
    //   Attachment: args.filesData[0].rawFile
    // });
    args.filesData.forEach(file => {
      (this.EQMSAddChangeDetailsformData.controls.AttachmentList as FormArray).push(this.formBuilder.group({
        Attachment: file.rawFile
      }));
    });

  }
  addEqmsChangeDetails() {
    if (this.NgifForEdit) {
      this.EQMSAddChangeDetailsformData.patchValue({
        EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
        EqmsCcChangeDetailsId: this.EqmsCcChangeDetailsId,
      });
      let fileList = this.EQMSAddChangeDetailsformData.get('AttachmentList').value;
      if (fileList["length"] > 0) {
        this.EQMSAddChangeDetailsformData.patchValue({
          EqmsCcAttachment: true,
        });
      }
      else {
        this.EQMSAddChangeDetailsformData.patchValue({
          EqmsCcAttachment: false,
        });
      }
      this._EqmsChangeControl.UpdateChangeDetails(this.EQMSAddChangeDetailsformData.value, fileList).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res["Object"]["ResultMessage"]);
          this.GetChangeDetailsList();
          this.modalService.dismissAll();
          this.resetForm();

          /*  this.EQMSAddChangeDetailsformData.patchValue({
             EqmsCcRequisitionId: this.EQMSAddRequisitionDetailsformData.EqmsCcRequisitionId,
           }); */
          if (this.EQMSAddRequisitionDetailsformData.EqmsCcChangeControlNumberId == undefined) {
            this.EQMSAddChangeDetailsformData.patchValue({
              EqmsCcChangeControlNumberId: this.data['Object'].EqmsCcChangeControlNumberId
            }
            );
            console.log(this.EQMSAddChangeDetailsformData);
            this.data.setVersionInfo(this.data['Object']);
          }


        } else {
          this._toastr.error(res["Object"]["ResultMessage"]);
        }
      }

      );
    }
    else {
      debugger;
      this.EQMSAddChangeDetailsformData.patchValue({
        EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
        EqmsCcChangeDetailsId: 0,
      });
      let fileList = this.EQMSAddChangeDetailsformData.get('AttachmentList').value;
      if (fileList["length"] > 0) {
        this.EQMSAddChangeDetailsformData.patchValue({
          EqmsCcAttachment: true,
        });
      }
      else {
        this.EQMSAddChangeDetailsformData.patchValue({
          EqmsCcAttachment: false,
        });
      }
      this._EqmsChangeControl.SaveChangeDetails(this.EQMSAddChangeDetailsformData.value, fileList).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res["Object"]["ResultMessage"]);
          this.GetChangeDetailsList();
          this.modalService.dismissAll();
          this.resetForm();

          /*  this.EQMSAddChangeDetailsformData.patchValue({
             EqmsCcRequisitionId: this.EQMSAddRequisitionDetailsformData.EqmsCcRequisitionId,
           }); */
          if (this.EQMSAddRequisitionDetailsformData.EqmsCcChangeControlNumberId == undefined) {
            this.EQMSAddChangeDetailsformData.patchValue({
              EqmsCcChangeDetailsId: 0,
              EqmsCcChangeControlNumberId: this.data['Object'].EqmsCcChangeControlNumberId
            }
            );
            console.log(this.EQMSAddChangeDetailsformData);
            this.data.setVersionInfo(this.data['Object']);
          }


        } else {
          this._toastr.error(res["Object"]["ResultMessage"]);
        }
      }

      );

    }
  }
  /* GetControlNum() {
    this._EqmsChangeControl.GetControlNum().subscribe((data) => {
      this.ChangeControlNumber = data['Object'];
      console.log(this.ChangeControlNumber)
    });
  } */
  GetDepartmentList() {
    this._EqmsChangeControl.GetDepartmentList().subscribe((data) => {
      this.objDepartmentList = data['Object'];
    });
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        this.grid.excelExport();
        break;
    }
  }
  clickSignAndSubmit() {
    this.EQMSAddApprovalsChangeDetailsformData.patchValue({
      EqmsCcChangeControlNumberId: this.ChangeControlNumberId,
      EqmsCcSignAndSubmitedBy: this.UserId,
    });
    this._EqmsChangeControl.SaveApprovalsChangeDetails(this.EQMSAddApprovalsChangeDetailsformData.value).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        this._toastr.success("Now Fill Primary Assessment Info");
        this.moveToTab('tab-selectbyid3');
        this.IfEditForNotAllowed = true;

      } else {
        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    }

    );
  }
  OpenaddparameterModal(content, data) {
    debugger;
    if(data!=null){
    this.editChangeRequest(data['EqmsCcChangeDetailsId']);
    this.EqmsCcChangeDetailsId = data['EqmsCcChangeDetailsId'];
    }
    this.resetForm();
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static',
      keyboard: false
    }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  closeAddParameterModal() {
    this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  //Suvinay
  getChangeControlNumberValue() {
    debugger;
    this.ChangeControlInfo = this._EqmsChangeControl.getOption();
    this.ChangeControlNumber = this.ChangeControlInfo['GetChangeControlNumber'];
    this.ChangeControlNumberId = this.ChangeControlInfo['GetEqmsCcChangeControlNumId'];
    this.AllowedForEditUser = this.ChangeControlInfo['AlowedForEdit'];
  }
  load() {
    this.GetChangeDetailsList();
    this.initFileManager();
  }
  //suvinay for gridbind


  GetChangeDetailsList() {
    debugger;
    this._EqmsChangeControl.GetChangeDetailsList(this.ChangeControlNumberId).subscribe((data) => {
      this.ObjChangeDetailsList = data['Object'];
      console.log(this.ObjChangeDetailsList);
    });
  }
  openAddModal(content3) {
    this.modalService.open(content3, {
      centered: true, size: 'lg', backdrop: 'static',
      keyboard: false
    }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  initFileManager() {
    this.ajaxSettings = {
      url: this._restApi + "FileOperations",
      getImageUrl: this._restApi + "GetImage",
      uploadUrl: this._restApi + "Upload",
      downloadUrl: this._restApi + "Download",
    };
    this.searchSettings = {
      allowSearchOnTyping: false,
    };
    this.navigationPaneSettings = environment.navigationPaneSettings;
    this.contextMenuSettings = environment.contextMenuSettings;
    this.toolbarSettings = environment.toolbarSettings;
  }
  beforeSend(args) {
    // Get the value of Dropdownlist.
    this.restrictedPath = "Eqms/CC/ChangeDetails/CC_" + this.ChangeControlNumberId + "/CD_" + this.EqmsCcChangeDetailsId + "";
    if (
      args["name"] == "beforeImageLoad" &&
      args["imageUrl"].indexOf(this.restrictedPath) == -1
    ) {
      let indexOfPath = args["imageUrl"].indexOf("path=") + 5;
      args["imageUrl"] =
        args["imageUrl"].substring(0, indexOfPath) +
        this.restrictedPath +
        args["imageUrl"].substring(indexOfPath);
    } else if (args.name == "beforeDownload") {
      if (args.data["path"].indexOf(this.restrictedPath) == -1) {
        args.data["path"] = this.restrictedPath + args.data["path"];
      }
    } else {
      var data = JSON.parse(args.ajaxSettings.data);
      if (args["action"] == "Upload") {
        // args.preventDefault();
        args.cancel = true;
        if (data[0]["path"].indexOf(this.restrictedPath) == -1) {
          data[0]["path"] = this.restrictedPath + data[0]["path"];
        }
      } else if (data["path"].indexOf(this.restrictedPath) == -1) {
        data["path"] = this.restrictedPath + data["path"];
        if (args["action"] == 'move') {
          data["targetPath"] = this.restrictedPath + data["targetPath"];
        } else if (args["action"] == 'copy') {
          data["targetPath"] = this.restrictedPath + data["targetPath"];
        }
      }
      args.ajaxSettings.data = JSON.stringify(data);
    }
  }

  setRowId(data) {
    this.ChangeControlNumberId = data.EqmsCcChangeControlNumberId;
    this.EqmsCcChangeDetailsId = data.EqmsCcChangeDetailsId;
  }
  editChangeRequest(Id): void {
    this._EqmsChangeControl.GetChangeDetailsListOnCDId(Id).subscribe((data) => {
      const ObjChangeDetailsData = data['Object'];
      if (ObjChangeDetailsData != null) {
        this.EQMSAddChangeDetailsformData.patchValue({
          EqmsCcProposedChange: ObjChangeDetailsData[0]["EqmsCcProposedChange"],
          EqmsCcProcedure: ObjChangeDetailsData[0]["EqmsCcProcedure"],
          EqmsCcJustification: ObjChangeDetailsData[0]["EqmsCcJustification"],
          DepartmentId: ObjChangeDetailsData[0]["DepartmentId"],
          EqmsCcActionPlan: ObjChangeDetailsData[0]["EqmsCcActionPlan"],
          EqmsCcAttachment: ObjChangeDetailsData[0]["EqmsCcAttachment"],
          EqmsCcChangeDetailsId: ObjChangeDetailsData[0]["EqmsCcChangeDetailsId"],
        });
        //this.StorageEdit = true;
      }
      else {
        this.EQMSAddChangeDetailsformData.patchValue({
          StorageLocationId: null,
          StorageLocationName: null,
        });
      }
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    debugger;

    switch (args['commandColumn']['type']) {
      case 'Edit': this.openAddModal(this.headerModal);
        this.editChangeRequest(args['rowData']['EqmsCcChangeDetailsId']);
        this.EqmsCcChangeDetailsId = args['rowData']['EqmsCcChangeDetailsId'];
        break;
      case 'None': this.openAddModal(this.headerModal);
        this.editChangeRequest(args['rowData']['EqmsCcChangeDetailsId']);
        this.EqmsCcChangeDetailsId = args['rowData']['EqmsCcChangeDetailsId'];
        break;
      default:
        break;
    }

  }

}
