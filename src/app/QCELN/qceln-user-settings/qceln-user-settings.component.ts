import { Component, OnInit, ViewChild } from "@angular/core";
import {
  EditSettingsModel, ToolbarItems, EditService, ToolbarService, SortService, GridLine, GridComponent, CommandClickEventArgs,
  CommandModel, FilterService, FilterSettingsModel, GroupSettingsModel, ExcelExportProperties, PdfExportProperties
} from "@syncfusion/ej2-angular-grids";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl, } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ConfirmationDialogService } from 'src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { QCELNUserSettingService } from "./service/qceln-user-setting.service";
import { ProgramCodeEnt, SampleBarCodeEnt, TestTypeEnt, TypeEnt, TestMaterialEnt, UserSettingEnt } from "./service/qceln-user-setting.model";
@Component({
  selector: 'app-qceln-user-settings',
  templateUrl: './qceln-user-settings.component.html',
  styleUrls: ['./qceln-user-settings.component.css'],
  providers: [EditService, SortService, FilterService],
})
export class QCElnUserSettingsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public lines: GridLine;
  public data: object[];
  public filterOptions: FilterSettingsModel;
  public toolbar: String[];
  public groupOptions: GroupSettingsModel;
  public pageSettings: Object;
  public commands: CommandModel[];
  ProgramCodeForm: FormGroup;
  SampleBarcodeForm: FormGroup;
  TestMaterialForm: FormGroup;
  TestTypeForm: FormGroup;
  TypeForm: FormGroup;
  public ProgramCodeList: object[];
  public SampleBarcodeList: object[];
  public TestMaterialList: object[];
  public TestTypeList: object[];
  public TypeList: object[];
  public IsEditMode = false;
  public IsVisible = true;
  public PageAccessRight: object = {};

  constructor(private modalService: NgbModal,
    private _toastr: ToastrService,
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService
    , private confirmationDialogService: ConfirmationDialogService,
    private _UserSettingService: QCELNUserSettingService,) { }

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
    this.SetSampleBarcodeForm();
    this.GetSampleBarcodeList();
    this.SetTestMaterialForm();
    this.GetTestMaterialList();
    this.SetTestTypeForm();
    this.GetTestTypeList();
    this.SetTypeForm();
    this.GetTypeList();
    this.pageSettings = { pageSizes: 10 };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.toolbar = ["Search"];
    this.groupOptions = { showGroupedColumn: true };
    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  openModal(content) {
    this.resetSampleBarcodeForm();
    this.IsEditMode = false;
    this.modalService.open(content, { centered: true, size: "lg", backdrop: "static", keyboard: false, })
      .result.then(

      );
  }

  resetProgramCodeForm() {
    this.ProgramCodeForm.reset();
  }
  SetProgranCodeForm() {
    this.ProgramCodeForm = this.formBuilder.group({
      ProgramCodeId: [""],
      ProgramCode: ["", Validators.required],
    });
  }

  GetProgramCode() {
    this._UserSettingService.GetProgramCode().subscribe((data) => {
      this.ProgramCodeList = data["Object"];
    });
  }

  SaveProgramCode() {
    if (this.ProgramCodeForm.valid) {
      this._UserSettingService.SaveProgramCode(this.ProgramCodeForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetProgramCodeForm();
          this.GetProgramCode();
          this.closeModal();
        } else {
          this._toastr.error(res["ResultMessage"]);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.ProgramCodeForm);
    }
  }

  EditProgramCode(args: CommandClickEventArgs): void {
    this._UserSettingService.GetProgramCodeDetail(args['rowData']['Id']).subscribe((data) => {
      const ObjectData = data['Object'] as UserSettingEnt;
      if (ObjectData != null) {
        this.ProgramCodeForm.patchValue({
          ProgramCodeId: ObjectData.Id,
          ProgramCode: ObjectData.Name
        });
        this.IsEditMode = true;
      }
      else {
        this.ProgramCodeForm.patchValue({
          ProgramCodeId: null,
          ProgramCode: null
        });
      }
    });
  }

  UpdateProgramCode() {
    if (this.ProgramCodeForm.valid) {
      this._UserSettingService.UpdateProgramCode(this.ProgramCodeForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.GetProgramCode();
          this.resetProgramCodeForm();
          this.closeModal();
        } else {
          this._toastr.warning(res["ResultMessage"]);
        }
      });
    }
    else {
      this.formErrorDisplay.showErrors(this.ProgramCodeForm);
    }
  }

  SetSampleBarcodeForm() {
    this.SampleBarcodeForm = this.formBuilder.group({
      ELNSampleBarcodeId: [""],
      SampleBarcodeId: ["", Validators.required],
    });
  }

  resetSampleBarcodeForm() {
    this.SampleBarcodeForm.reset();
  }

  GetSampleBarcodeList() {
    this._UserSettingService.GetSampleBarcodeId().subscribe((data) => {
      this.SampleBarcodeList = data["Object"];
    });
  }

  SaveSampleBarcode() {
    if (this.SampleBarcodeForm.valid) {
      this._UserSettingService.SaveSampleBarcode(this.SampleBarcodeForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetSampleBarcodeForm();
          this.GetSampleBarcodeList();
          this.closeModal();
        } else {
          this._toastr.error(res["ResultMessage"]);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.SampleBarcodeForm);
    }
  }

  EditSampleBarcode(args: CommandClickEventArgs): void {
    this._UserSettingService.GetSampleBarcodeDetail(args['rowData']['Id']).subscribe((data) => {
      const ObjectData = data['Object'] as UserSettingEnt;
      if (ObjectData != null) {
        this.SampleBarcodeForm.patchValue({
          ELNSampleBarcodeId: ObjectData.Id,
          SampleBarcodeId: ObjectData.Name
        });
        this.IsEditMode = true;
      }
      else {
        this.SampleBarcodeForm.patchValue({
          ELNSampleBarcodeId: null,
          SampleBarcodeId: null
        });
      }
    });
  }

  UpdateSampleBarcode() {
    if (this.SampleBarcodeForm.valid) {
      this._UserSettingService.UpdateSampleBarcode(this.SampleBarcodeForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetSampleBarcodeForm();
          this.GetSampleBarcodeList();
          this.closeModal();
        } else {
          this._toastr.warning(res["ResultMessage"]);
        }
      });
    }
    else {
      this.formErrorDisplay.showErrors(this.SampleBarcodeForm);
    }
  }

  SetTestMaterialForm() {
    this.TestMaterialForm = this.formBuilder.group({
      ELNTestMaterialId: [""],
      TestMaterialId: ["", Validators.required],
    });
  }

  resetTestMaterialForm() {
    this.TestMaterialForm.reset();
  }

  GetTestMaterialList() {
    this._UserSettingService.GetTestMaterial().subscribe((data) => {
      this.TestMaterialList = data["Object"];
    });
  }

  SaveTestMaterial() {
    if (this.TestMaterialForm.valid) {
      this._UserSettingService.SaveTestMaterial(this.TestMaterialForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetTestMaterialForm();
          this.GetTestMaterialList();
          this.closeModal();
        } else {
          this._toastr.error(res["ResultMessage"]);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.TestMaterialForm);
    }
  }

  EditTestMaterial(args: CommandClickEventArgs): void {
    this._UserSettingService.GetTestMaterialDetail(args['rowData']['Id']).subscribe((data) => {
      const ObjectData = data['Object'] as UserSettingEnt;
      if (ObjectData != null) {
        this.TestMaterialForm.patchValue({
          ELNTestMaterialId: ObjectData.Id,
          TestMaterialId: ObjectData.Name
        });
        this.IsEditMode = true;
      }
      else {
        this.TestMaterialForm.patchValue({
          ELNTestMaterialId: null,
          TestMaterialId: null
        });
      }
    });
  }

  UpdateTestMaterial() {
    if (this.TestMaterialForm.valid) {
      this._UserSettingService.UpdateTestMaterial(this.TestMaterialForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetTestMaterialForm();
          this.GetTestMaterialList();
          this.closeModal();
        } else {
          this._toastr.warning(res["ResultMessage"]);
        }
      });
    }
    else {
      this.formErrorDisplay.showErrors(this.SampleBarcodeForm);
    }
  }

  resetTestTypeForm() {
    this.TestTypeForm.reset();
  }
  SetTestTypeForm() {
    this.TestTypeForm = this.formBuilder.group({
      ELNTestTypeId: [""],
      TestTypeId: ["", Validators.required],
    });
  }
  GetTestTypeList() {
    this._UserSettingService.GetTestType().subscribe((data) => {
      this.TestTypeList = data["Object"];
    });
  }

  SaveTestType() {
    if (this.TestTypeForm.valid) {
      this._UserSettingService.SaveTestType(this.TestTypeForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetTestTypeForm();
          this.GetTestTypeList();
          this.closeModal();
        } else {
          this._toastr.error(res["ResultMessage"]);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.TestTypeForm);
    }
  }

  EditTestType(args: CommandClickEventArgs): void {
    this._UserSettingService.GetTestTypeDetail(args['rowData']['Id']).subscribe((data) => {
      const ObjectData = data['Object'] as UserSettingEnt;
      if (ObjectData != null) {
        this.TestTypeForm.patchValue({
          ELNTestTypeId: ObjectData.Id,
          TestTypeId: ObjectData.Name
        });
        this.IsEditMode = true;
      }
      else {
        this.TestTypeForm.patchValue({
          ELNTestTypeId: null,
          TestTypeId: null
        });
      }
    });
  }

  UpdateTestType() {
    if (this.TestTypeForm.valid) {
      this._UserSettingService.UpdateTestType(this.TestTypeForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetTestTypeForm();
          this.GetTestTypeList();
          this.closeModal();
        } else {
          this._toastr.warning(res["ResultMessage"]);
        }
      });
    }
    else {
      this.formErrorDisplay.showErrors(this.TestTypeForm);
    }
  }

  resetTypeForm() {
    this.TypeForm.reset();
  }
  SetTypeForm() {
    this.TypeForm = this.formBuilder.group({
      ELNTypeId: [""],
      TypeId: ["", Validators.required],
    });
  }
  GetTypeList() {
    this._UserSettingService.GetType().subscribe((data) => {
      this.TypeList = data["Object"];
    });
  }

  SaveType() {
    if (this.TypeForm.valid) {
      this._UserSettingService.SaveType(this.TypeForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetTypeForm();
          this.GetTypeList();
          this.closeModal();
        } else {
          this._toastr.error(res["ResultMessage"]);
        }
      });
    } else {
      this.formErrorDisplay.showErrors(this.TypeForm);
    }
  }

  EditType(args: CommandClickEventArgs): void {
    this._UserSettingService.GetTypeDetail(args['rowData']['Id']).subscribe((data) => {
      const ObjectData = data['Object'] as UserSettingEnt;
      if (ObjectData != null) {
        this.TypeForm.patchValue({
          ELNTypeId: ObjectData.Id,
          TypeId: ObjectData.Name
        });
        this.IsEditMode = true;
      }
      else {
        this.TypeForm.patchValue({
          ELNTypeId: null,
          TypeId: null
        });
      }
    });
  }

  UpdateType() {
    if (this.TypeForm.valid) {
      this._UserSettingService.UpdateType(this.TypeForm.value).subscribe((res) => {
        if (res["Result"]) {
          this._toastr.success(res["ResultMessage"]);
          this.resetTypeForm();
          this.GetTypeList();
          this.closeModal();
        } else {
          this._toastr.warning(res["ResultMessage"]);
        }
      });
    }
    else {
      this.formErrorDisplay.showErrors(this.TypeForm);
    }
  }
}