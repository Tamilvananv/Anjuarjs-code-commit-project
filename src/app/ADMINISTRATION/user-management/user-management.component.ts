import { Component, ViewChild, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { UserService } from "./service/add-user.service";
import {
  GridLine,
  FilterSettingsModel,
  GroupSettingsModel,
  EditSettingsModel,
  SelectionSettingsModel,
  ToolbarItems,
  GridComponent,
  TextWrapSettingsModel,
  CommandModel,
  CommandClickEventArgs,
  PdfExportProperties,
  ExcelExportProperties 
  
} from "@syncfusion/ej2-angular-grids";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public lines: GridLine;
  public selectionOptions: SelectionSettingsModel;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  public wrapSettings: TextWrapSettingsModel;
  public ObjUserList: object[];
  closeResult: string;
  public PageAccessRight: object = {};
  public toolbar: ToolbarItems[];
  public groupOptions: GroupSettingsModel;
  public pageSettings: Object;
  constructor(
    private modalService: NgbModal,
    private routes: Router,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._userService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });

    this.getUserList();
    this.wrapSettings = { wrapMode: "Content" };
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    /* this.commands = [
      { buttonOption: { content: "Edit", cssClass: "edit_link" } },
    ]; */

    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];

    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
    this.toolbar = ["ExcelExport", "Search", "PdfExport"];
    this.groupOptions = { showGroupedColumn: true };
    this.pageSettings = { pageSize: 10 };
  }

  getUserList() {
    this._userService.getUserList().subscribe((data) => {
      this.ObjUserList = data["Object"];
    });
  }
  commandClick(args: CommandClickEventArgs): void {
    this.routes.navigate(["usermanagement/edituser", args.rowData["UserId"]]);
  }

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
        const excelExportProperties: ExcelExportProperties = {
          fileName: 'User.xlsx'
      };
      this._userService.SaveExcelReportDownload().subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties);   
        } else {    
        }
      });  
      
        break;
       case "Grid_pdfexport": 
      const pdfExportProperties: PdfExportProperties = {
        fileName: "User.pdf",
      }; 
      this._userService.SavePdfReportDownload().subscribe((res) => {
        if (res["Result"]) {
          this.grid.pdfExport(pdfExportProperties);
        } else {    
        }
      });        
             
        break;
    }
  }

  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }

  public created(args) {//for cancle icon on grid
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
