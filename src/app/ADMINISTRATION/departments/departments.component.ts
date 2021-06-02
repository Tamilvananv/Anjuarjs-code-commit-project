import { Component, ViewChild, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { EmitType } from "@syncfusion/ej2-base";
import { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { Query } from "@syncfusion/ej2-data";
import { DepartmentService } from "./Service/Department.service";
import { Department } from "./Service/Department.model";
import { ToastrService } from "ngx-toastr";
import {
  GridLine,
  FilterSettingsModel,
  GroupSettingsModel,
  EditSettingsModel,
  ToolbarItems,
  GridComponent,
  CommandModel,
  CommandClickEventArgs,
  PdfExportProperties,
  ExcelExportProperties
} from "@syncfusion/ej2-angular-grids";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";

@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.css"],
})
export class DepartmentsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  closeResult: string;
  // DepartmentForm: Department;

  DepartmentForm: FormGroup;

  public ObjManagerNameList: object[];
  public ObjDepartmentList: object[];
  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private routes: Router,
    private _DepartmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService
  ) {}
  public filterOptions: FilterSettingsModel;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public lines: GridLine;
  public IsDepartmentEdit = false;
  public view: string;
  public toolbarOptions: ToolbarItems[];
  public PageAccessRight: object = {};
  public groupOptions: GroupSettingsModel;
  public pageSettings: Object;
  public data3: { [key: string]: Object }[] = [{ Name: "Select", Code: "S" }];

  // maps the appropriate column to fields property
  public fields: Object = { text: "UserName", value: "UserId" };
  //public UserFields: Object = { text: 'UserName', value: 'UserId' };
  // set the height of the popup element
  public height: string = "220px";
  // set the placeholder to ComboBox input element
  public watermark: string = "Select Department Head";
  public watermark1: string = "Select Type";
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== "" ? query.where("Name", "startswith", e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data3, query);
  };

  ngOnInit() {
    this._DepartmentService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });
    this.load();
    /* this.commands = [
      { buttonOption: { content: "Edit", cssClass: "edit_link" } },
    ]; */

    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];

    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
    this.view = "Details";
    this.toolbarOptions = ["ExcelExport", "Search", "PdfExport"];
    this.groupOptions = { showGroupedColumn: true };
    this.pageSettings = { pageSize: 10 };
  }

  adddepartment(content) {
    //this.resetDepartmentForm();
    this.resetForm();
    this.IsDepartmentEdit = false;
    this.modalService
      .open(content, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      })
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

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
        const excelExportProperties: ExcelExportProperties = {
          fileName: 'Department.xlsx'
      };
      this._DepartmentService.SaveExcelReportDownload().subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties);      
        } else {    
        }
      });  
      
        break;
      case "Grid_pdfexport":
        const pdfExportProperties: PdfExportProperties = {
          fileName: "Department.pdf",
        };
        this._DepartmentService.SavePdfReportDownload().subscribe((res) => {
          if (res["Result"]) {
            this.grid.pdfExport(pdfExportProperties);        
          } else {    
          }
        });  

        break;
    }
  }

  load() {
    this.SetForm();
    this.GetManagerNameList();
    this.GetDepartmentList();
  }

  /* resetDepartmentForm(form?: NgForm) {
    this.DepartmentForm = {
      DepartmentId: null,
      ManagerId: null,
      DepartmentName: '',
      ManagerName: ''
    };
  } */

  GetManagerNameList() {
    this._DepartmentService.GetManagerNameList().subscribe((data) => {
      this.ObjManagerNameList = data["Object"];
    });
  }

  GetDepartmentList() {
    this._DepartmentService.GetDepartmentList().subscribe((data) => {
      this.ObjDepartmentList = data["Object"];
    });
  }

  SaveDepartment() {
    if (this.DepartmentForm.valid) {
      this._DepartmentService
        .SaveDepartment(this.DepartmentForm.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this.toastr.success(res["ResultMessage"]);
            this.resetForm();
            this.GetDepartmentList();
            this.closeDepartmentModal();
          } else {
            this.toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.DepartmentForm);
    }
  }

  closeDepartmentModal() {
    this.modalService.dismissAll();
  }

  EditDepartment(args: CommandClickEventArgs): void {
    this._DepartmentService
      .GetDepartmentDetail(args["rowData"]["DepartmentId"])
      .subscribe((data) => {        
        const DepartmentDetail = data["Object"] as Department;
        this.DepartmentForm.patchValue({
          DepartmentId: DepartmentDetail.DepartmentId,
          DepartmentHead: DepartmentDetail.DepartmentHead,
          DepartmentName: DepartmentDetail.DepartmentName,
          DepartmentHeadName: DepartmentDetail.DepartmentHeadName,
        });
        this.IsDepartmentEdit = true;
      });
  }

  UpdateDepartment() {
    if (this.DepartmentForm.valid) {
      this._DepartmentService
        .UpdateDepartment(this.DepartmentForm.value)
        .subscribe((res) => {
          if (res["Result"]) {
            this.toastr.success(res["ResultMessage"]);
            this.GetDepartmentList();
            this.resetForm();
            this.closeDepartmentModal();
          } else {
            this.toastr.warning(res["ResultMessage"]);
          }
        });
    }
    else{
      this.formErrorDisplay.showErrors(this.DepartmentForm);
    }
  }
  SetForm() {
    this.DepartmentForm = this.formBuilder.group({
      DepartmentId: [""],
      DepartmentName: ["", Validators.required],
      DepartmentHeadName: [""],
      DepartmentHead: ["", Validators.required],
    });
  }
  resetForm() {
    this.DepartmentForm.reset();
  }

  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }

  public created(args) { //for cancle icon on grid
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

}
