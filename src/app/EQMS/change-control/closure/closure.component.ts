import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridLine,TextWrapSettingsModel, CommandClickEventArgs, FilterSettingsModel,CommandModel, EditSettingsModel, ToolbarItems, IEditCell } from '@syncfusion/ej2-grids';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { RaiseNewRequestComponent } from '../raise-new-request/raise-new-request.component';
import { LoginService } from 'src/app/login/Service/login.service';
@Component({
  selector: 'app-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.css']
})
export class ClosureComponent implements OnInit {
  public lines: GridLine;
  public data: object[];
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
 
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public ddParams: IEditCell;
  public ddParams1: IEditCell;
  public deptlist: IEditCell;
  public action: IEditCell;
  public dateValue: Date = new Date();
  public ReasonData: Object[] = [
    { Id: 'Yes', reason: 'Yes' },
    { Id: 'No', reason: 'No' },
    { Id: 'NA', reason: 'NA' }
];
public fieldsforDept: Object = { text: 'Name', value: 'Id' };
public fields1: Object = { text: 'reason', value: 'Id' };
public status: Object[] = [
  { Id: 'Approved', status: 'Approved' },
  { Id: 'Rework', status: 'Rework' }
];
public fields: Object = { text: 'status', value: 'Id' };
public Status: Object[] = [
  { Id: 'dept1', Status: 'Completed ' },
  { Id: 'dept2', Status: 'Non-Completed' }
];
public fields2: Object = { text: 'Status', value: 'Id' };
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
closeResult: string;


public wrapSettings: TextWrapSettingsModel;
public filterOptions: FilterSettingsModel;
public commands: CommandModel[];
public toolbarOptions: ToolbarItems[];
public ObjChangeDetailsList: object;
public ChangeControlNumber;
public ChangeControlNumberId;
public EqmsCcChangeDetailsId;
public ChangeControlInfo: object = {};
public objDepartmentList: Object[];
public restrictedPath: string;
public ajaxSettings: AjaxSettingsModel;
  public _restApi = environment.apiUrl + '/FileManager/';
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
  public toolbarSettings: object;
  public uploadSettings: object;
  public AttachmentList: object[];
EQMSAddChangeDetailsformData: FormGroup;
EQMSClosureQHformData: FormGroup;
EQMSClosureFHformData: FormGroup;
public fieldsforstatus: Object = { text: 'Status', value: 'Id' };
  public StatusData: Object[] = [
    { Id: false, Status: 'Not Completed', },
    { Id: true, Status: 'Completed' }
  ];
@ViewChild('addParameterModal', { static: false }) headerModal;
@ViewChild("grid", { static: false }) public grid: GridComponent;
public UserInfo: object = {};
public UserId;
public QualityHeadApprovalStatusText: string = "Not Initiated";
public QualityHeadLevelApprovalName;
public boolQualityHeadApproval: boolean = false;
public FHSubmitbtn: boolean = true;
public QHSubmitbtn: boolean = true;
public FHReadOnly: boolean = true;
public QHReadOnly: boolean = true;
constructor(private modalService: NgbModal, private loginService: LoginService, private RNRequest:RaiseNewRequestComponent, private _toastr: ToastrService, private formBuilder: FormBuilder, private _EqmsChangeControl: ServiceService,) { }

OpenModal(content) {
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
closeModal() {
  this.modalService.dismissAll();
}



ngOnInit():void {
  this.data = [
    {
      ProposedCAPA:'Auto Populate'
    }
  ];
  this.lines = 'Both';
  this.data1 = [
    {
      EmpList: 'Shruti',
      ChooseAction: 'Rework',
      Comments: 'Change Occur in versions.',
    },
    {
      EmpList: 'Shruti',
      ChooseAction: 'Approved',
      Comments: 'Change Occur in versions.',
    },
  ];
  this.getChangeControlNumberValue();
  this.GetChangeDetailsList();
  this.GetDepartmentList();
  this.initFileManager();
  this.setForm();
  this.getUserInfo();
  this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
  this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  this.deptlist = { params: { value: 'Shruti' } };
  this.action = { params: { value: 'Rework' } };
  this.lines = 'Both';
    this.wrapSettings = { wrapMode: 'Content' };
    this.filterOptions = {
      type: 'Menu'
    };
    this.toolbarOptions = ['ExcelExport'];
    this.commands = [
      {
        type: "Edit",
        buttonOption: { iconCss: "fa fa-edit", cssClass: "e-flat" },
      },
    ];
}
GetDepartmentList() {
  this._EqmsChangeControl.GetDepartmentList().subscribe((data) => {
    debugger;
    this.objDepartmentList = data['Object'];
  });
}
moveToTab(tabId) {
  this.RNRequest.moveToTab(tabId);
}
GetChangeDetailsList() {
  debugger;
  this._EqmsChangeControl.GetChangeDetailsList(this.ChangeControlNumberId).subscribe((data) => {
    this.ObjChangeDetailsList = data['Object'];
    console.log(this.ObjChangeDetailsList);
  });
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
toolbarClick(args: ClickEventArgs): void {
  switch (args.item.id) {
    case 'Grid_excelexport':
      this.grid.excelExport();
      break;
  }
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
    EqmsCcStatus:[''],
    /*  EqmsCcChangeControlNumberId: [''],
     EqmsCcChangeControlNumber: [''] */
    AttachmentList: new FormArray([])
  });
  this.EQMSClosureFHformData = this.formBuilder.group({   
    EqmsCcChangeControlNumberId: ['', Validators.required],
    EqmsCcDateofChangeImplementaion: [''],
    EqmsCcSignAndSubmitedBy: [''],
    EqmsCcFHSignAndSubmitedDate: [''],
    EqmsCcJustificationForDelay: [''],
    EqmsCcFuncHeadComment: [''],
    EqmsCcSignAndSubmitedName:[''],
  });
  this.EQMSClosureQHformData = this.formBuilder.group({   
    EqmsCcChangeControlNumberId: ['', Validators.required],
    EqmsCcQHApprovar: [''],
    EqmsCcQHApprovarName:[''],
    EqmsCcQHSignAndSubmitedDate: [''],
    EqmsCQHComment: [''],
    EqmsCQHStatus: [''],
    EqmsCcClosureisVerifiedByDept: [''],
    EqmsCcStandClosed: [''],
    EqmsCcJustificationForDelayisValid: [''],
    EqmsCcAuditTrailsisValid: [''],
   
  });

}


resetForm() {
  this.EQMSAddChangeDetailsformData.reset();
  this.AttachmentList = [];
  //this.EQMSAddChangeDetailsformData.get('AttachmentList').value.reset();
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

SaveFunctionHead(){
  this.EQMSClosureFHformData.patchValue({
    EqmsCcSignAndSubmitedBy:this.UserId,
    EqmsCcChangeControlNumberId:this.ChangeControlNumberId,
  });
   this._EqmsChangeControl.SaveClosureFHSign(this.EQMSClosureFHformData.value).subscribe(res => {
   
    if (res['Result']) {       
      this._toastr.success(res["Object"]["ResultMessage"]);
     
    } else {
      this._toastr.error(res["Object"]["ResultMessage"]);
    }
  }

  );
}
SaveQualityHead(){
  this.EQMSClosureQHformData.patchValue({
    EqmsCcQHApprovar:this.UserId,
    EqmsCcChangeControlNumberId:this.ChangeControlNumberId,
  });
   this._EqmsChangeControl.SaveClosureQHSign(this.EQMSClosureQHformData.value).subscribe(res => {
   
    if (res['Result']) {       
      this._toastr.success(res["Object"]["ResultMessage"]);
     
    } else {
      this._toastr.error(res["Object"]["ResultMessage"]);
    }
  }

  );
}
//Suvinay
getChangeControlNumberValue() {
  debugger;
  this.ChangeControlInfo = this._EqmsChangeControl.getOption();
  this.ChangeControlNumber = this.ChangeControlInfo['GetChangeControlNumber'];
  this.ChangeControlNumberId = this.ChangeControlInfo['GetEqmsCcChangeControlNumId'];
}
GetIsQAHeadOrDes(UserId, CCNumId) {
  debugger;
  this._EqmsChangeControl.GetIsQAHeadOrDes(UserId, CCNumId).subscribe((data) => {
    var UserRole = data['Object'];
    console.log("User Role ");
    console.log(UserRole);
    if (UserRole != null) {
      if (UserRole[0]["DeptHead"] == "Yes") {
        this.FHSubmitbtn = true;
      }
      else {
        this.FHSubmitbtn = false;
      }
      if (UserRole[0]["IsQAHead"] == "Yes") {
        this.QHSubmitbtn = true;
      }
      else {
        this.QHSubmitbtn = false;
      }
    }

  });
}
GetApprovalData(CCNumId) {

  this._EqmsChangeControl.GetClosureAapprovalData(CCNumId, this.UserId).subscribe((data2) => {
    var Data= data2['Object'];
    this.QualityHeadApprovalStatusText=Data[0]["EqmsCQHStatusText"];
    this.QualityHeadLevelApprovalName="By " + Data[0]["EqmsCcQHApprovarName"] + " on "+new Date(Data[0]["EqmsCcQHSignAndSubmitedDate"] );
    //console.log(Data,new Date(Data[0]["EqmsCcDateofChangeImplementaionDDMMYYY"]).getDate())
    if (Data[0]["EqmsCQHStatusText"] == "Approved") {
      this.boolQualityHeadApproval = false;
      this.FHSubmitbtn = false;
      this.QHSubmitbtn = false;
      this.FHReadOnly=false;
      this.QHReadOnly=false;

    }
    if (Data[0]["EqmsCQHStatusText"] == "Pending") {
      this.FHSubmitbtn = false;
      this.FHReadOnly=false;
    }
    this.EQMSClosureFHformData.patchValue({   
      EqmsCcChangeControlNumberId:Data[0]["EqmsCcChangeControlNumberId"],
      EqmsCcDateofChangeImplementaion: Data[0]["EqmsCcDateofChangeImplementaionDDMMYYY"],
      EqmsCcSignAndSubmitedBy: Data[0]["EqmsCcSignAndSubmitedBy"],
      EqmsCcFHSignAndSubmitedDate: Data[0]["EqmsCcFHSignAndSubmitedDate"],
      EqmsCcJustificationForDelay: Data[0]["EqmsCcJustificationForDelay"],
      EqmsCcFuncHeadComment: Data[0]["EqmsCcFuncHeadComment"],
      EqmsCcSignAndSubmitedName:Data[0]["EqmsCcSignAndSubmitedName"],
    });
    this.EQMSClosureQHformData = this.formBuilder.group({   
      EqmsCcChangeControlNumberId: Data[0]["EqmsCcChangeControlNumberId"],
      EqmsCcQHApprovar:  Data[0]["EqmsCcQHApprovar"],
      EqmsCcQHApprovarName: Data[0]["EqmsCcQHApprovarName"],
      EqmsCcQHSignAndSubmitedDate:  Data[0]["EqmsCcQHSignAndSubmitedDate"],
      EqmsCQHComment:  Data[0]["EqmsCQHComment"],
      EqmsCQHStatus:  Data[0]["EqmsCQHStatus"],
      EqmsCcClosureisVerifiedByDept:  Data[0]["EqmsCcClosureisVerifiedByDept"],
      EqmsCcStandClosed:  Data[0]["EqmsCcStandClosed"],
      EqmsCcJustificationForDelayisValid:  Data[0]["EqmsCcJustificationForDelayisValid"],
      EqmsCcAuditTrailsisValid:  Data[0]["EqmsCcAuditTrailsisValid"],
     
    });
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
OpenaddparameterModal(content, data,) {
  debugger;
  if(data!=null){
  this.editChangeRequest(data['EqmsCcChangeDetailsId']);
  this.EqmsCcChangeDetailsId = data['EqmsCcChangeDetailsId'];
  }
  if(data['EqmsCcStatus']==null){
    data['EqmsCcStatus']=false;
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
beforeSend(args) {
  debugger;
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
async getUserInfo() {
    await this.loginService.getUserBasicInfo().subscribe((data) => {
      localStorage.setItem('LoginUser', JSON.stringify(data['Object']));
      this.UserInfo = JSON.parse(localStorage.getItem('LoginUser'));
      this.UserId = this.UserInfo['UserID'];
      console.log("UserID", this.UserId);
      this.GetApprovalData(this.ChangeControlNumberId)
      this.GetIsQAHeadOrDes(this.UserId, this.ChangeControlNumberId);
    });
  }
setRowId(data) {
  debugger;
  this.ChangeControlNumberId = data.EqmsCcChangeControlNumberId;
  this.EqmsCcChangeDetailsId = data.EqmsCcChangeDetailsId;
}
editChangeRequest(Id): void {
  debugger;
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
        EqmsCcStatus: ObjChangeDetailsData[0]["EqmsCcStatus"],
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
UpdateEqmsChangeDetails() {
  
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
    this._EqmsChangeControl.UpdateChangeDetailsStatus(this.EQMSAddChangeDetailsformData.value, fileList).subscribe(res => {
      if (res['Result']) {
        this._toastr.success(res["Object"]["ResultMessage"]);
        this.GetChangeDetailsList();
        this.modalService.dismissAll();
        this.resetForm();        

      } else {
        this._toastr.error(res["Object"]["ResultMessage"]);
      }
    }

    );
 
}
commandClick(args: CommandClickEventArgs): void {
  debugger;
  switch (args['commandColumn']['type']) {
    case 'Edit': this.openAddModal(this.headerModal);    
      this.editChangeRequest(args['rowData']['EqmsCcChangeDetailsId']);
      this.EqmsCcChangeDetailsId=args['rowData']['EqmsCcChangeDetailsId'];
      console.log(args);
      break;
    default:
      break;
  }
}








}
