import { Component, OnInit, ViewChild } from "@angular/core";
import {  EditSettingsModel,  ToolbarItems,  EditService,  ToolbarService,  SortService,  GridLine,  GridComponent,  CommandClickEventArgs,
  CommandModel,  FilterService,  FilterSettingsModel,  GroupSettingsModel,  ExcelExportProperties,  PdfExportProperties} from "@syncfusion/ej2-angular-grids";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {  FormBuilder,  FormGroup,  Validators,  FormsModule,  ReactiveFormsModule,  FormControl,} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { ELNUserSettingService } from "./service/eln-user-setting.service";
import { ProgramCodeEnt ,TargetIdEnt} from "./service/eln-user-setting.model";
@Component({
  selector: 'app-eln-user-settings',
  templateUrl: './eln-user-settings.component.html',
  styleUrls: ['./eln-user-settings.component.css'],
  providers: [EditService, SortService, FilterService],
})
 export class ElnUserSettingsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public lines: GridLine;
  public data: object[];
  public filterOptions: FilterSettingsModel;
  public toolbar: String[];
  public groupOptions: GroupSettingsModel;
  public pageSettings: Object;
  public commands: CommandModel[];
  closeResult: string;
  ProgramCodeForm: FormGroup;
  TargetIdForm: FormGroup;
  public ObjProgramCodeList: object[];
  public ObjTargetIdList: object[];
  public IsProgramcodeEdit = false;
  public IsTargetIdEdit = false;
  public IsVisible = true;
  public PageAccessRight: object = {};
  
   constructor(private modalService: NgbModal,   
    private _toastr: ToastrService,
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService
    , private confirmationDialogService: ConfirmationDialogService,
    private _UserSettingService: ELNUserSettingService,) { }

   ngOnInit() {

    this._UserSettingService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);      
        this.IsVisible = false;
      }
    });



    this.SetProgranCodeForm();
    this.GetProgramCode();
    this.SetTargetIdForm();
    this.GetTargetId();
    this.pageSettings = { pageSizes: 10 };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.toolbar = ["Search"];
    this.groupOptions = { showGroupedColumn: true };
    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
   }


   addProgramcode(content) {     
    this.resetProgramCodeForm();  
    this.IsProgramcodeEdit= false;
    this.modalService .open(content, {centered: true, size: "lg", backdrop: "static",   keyboard: false,   })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  addTargetId(content) {   
    this.resetTargetIdForm();
    this.IsTargetIdEdit = false;    
    this.modalService .open(content, {centered: true, size: "lg", backdrop: "static",   keyboard: false,   })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  SetProgranCodeForm() {
    this.ProgramCodeForm = this.formBuilder.group({
      ProgramCodeId: [""],
      ProgramCode: ["", Validators.required],
     
    });
  }
  resetProgramCodeForm() {
    this.ProgramCodeForm.reset();
  }

  GetProgramCode() {
    this._UserSettingService.GetProgramCode().subscribe((data) => {
      this.ObjProgramCodeList = data["Object"];
    });
  }

  SaveProgramCode() {
    if (this.ProgramCodeForm.valid) {
      this._UserSettingService.SaveProgramCode(this.ProgramCodeForm.value).subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.resetProgramCodeForm();      
            this.GetProgramCode();     
            this.closeProgramCodeModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.ProgramCodeForm);
    }
  }

  closeProgramCodeModal() {
    this.modalService.dismissAll();
  }

  EditProgramCode(args: CommandClickEventArgs): void {
    this._UserSettingService.GetProgramCodeDetail(args['rowData']['ProgramCodeId']).subscribe((data) => {
      const ObjectData = data['Object'] as ProgramCodeEnt;
    if(ObjectData!=null){
        this.ProgramCodeForm.patchValue({
          ProgramCodeId: ObjectData.ProgramCodeId,         
          ProgramCode:  ObjectData.ProgramCode      
        });
      this.IsProgramcodeEdit = true;
      }
      else{
        this.ProgramCodeForm.patchValue({
          ProgramCodeId: null,
          ProgramCode:  null         
        });
      }
    });
  }

  UpdateProgramCode() {
    if (this.ProgramCodeForm.valid) {
      this._UserSettingService.UpdateProgramCode(this.ProgramCodeForm.value) .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.GetProgramCode();
            this.resetProgramCodeForm();
            this.closeProgramCodeModal();
          } else {
            this._toastr.warning(res["ResultMessage"]);
          }
        });
    }
    else{
      this.formErrorDisplay.showErrors(this.ProgramCodeForm);
    }
  }

  SetTargetIdForm() {
    this.TargetIdForm = this.formBuilder.group({
      ELNTargetId: [""],
      TargetId: ["", Validators.required],
     
    });
  }
  resetTargetIdForm() {
    this.TargetIdForm.reset();
  }
  GetTargetId() {
    this._UserSettingService.GetTargetId().subscribe((data) => {
      this.ObjTargetIdList = data["Object"];
    });
  }

  SaveTargetId() {
    if (this.TargetIdForm.valid) {
      this._UserSettingService.SaveTargetId(this.TargetIdForm.value).subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.resetTargetIdForm();      
            this.GetTargetId();     
            this.closeTargetIdModal();
          } else {
            this._toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.TargetIdForm);
    }
  }

  closeTargetIdModal() {
    this.modalService.dismissAll();
  }

  EditTargetId(args: CommandClickEventArgs): void {
    this._UserSettingService.GetTargetIdDetail(args['rowData']['ELNTargetId']).subscribe((data) => {
      const ObjectData = data['Object'] as TargetIdEnt;
    if(ObjectData!=null){
        this.TargetIdForm.patchValue({
          ELNTargetId: ObjectData.ELNTargetId,         
          TargetId:  ObjectData.TargetId      
        });
      this.IsTargetIdEdit = true;
      }
      else{
        this.TargetIdForm.patchValue({
          ELNTargetId: null,
          TargetId:  null         
        });
      }
    });
  }

  UpdateTargetId() {
    if (this.TargetIdForm.valid) {
      this._UserSettingService.UpdateTargetId(this.TargetIdForm.value) .subscribe((res) => {
          if (res["Result"]) {
            this._toastr.success(res["ResultMessage"]);
            this.resetTargetIdForm();      
            this.GetTargetId();     
            this.closeTargetIdModal();
          } else {
            this._toastr.warning(res["ResultMessage"]);
          }
        });
    }
    else{
      this.formErrorDisplay.showErrors(this.ProgramCodeForm);
    }
  }


 }
 