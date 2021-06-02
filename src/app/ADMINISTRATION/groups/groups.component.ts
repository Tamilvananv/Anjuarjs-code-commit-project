import { Component, ViewChild, OnInit } from "@angular/core";
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
import { GroupService } from "./Service/group.service";
import { Router } from "@angular/router";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { CommonService } from "../../Shared Services etc/Services/Common.Service";
import {
  PdfDocument,
  PdfBorders,
  PdfSection,
  PdfColor,
  PdfSolidBrush,
  PdfTrueTypeFont,
  PdfFontStyle,
  PdfPage,
  PdfStringFormat,
  PdfStandardFont,
  PdfLayoutResult,
  PdfFontFamily,
  PdfTextAlignment,
  PdfSubSuperScript,
  PdfTextElement,
  PdfGrid,
  PdfGridRow,
  PdfGridRowStyle,
  PdfPen,
  PointF,
  SizeF,
  PdfGridBeginCellDrawEventArgs,
  PdfFont,
  PdfTemplate,
  PdfBitmap,
  RectangleF,
  PdfPageTemplateElement,
  PdfHorizontalOverflowType,
  PdfGridCell,
  PdfWordWrapType,
  PdfLayoutFormat
} from "@syncfusion/ej2-pdf-export";
@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"],
})
export class GroupsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public ObjPermissionList: object[];
  public lines: GridLine;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  public PageAccessRight: object = {};
  public visibleEdit: boolean;
  public toolbar: ToolbarItems[];
  public groupOptions: GroupSettingsModel;
  public CompanyImage: string;
  public pageSettings: Object;
  
  constructor(private _groupService: GroupService, private routes: Router) {}

  ngOnInit(): void {
    this._groupService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });

    this.GetCompanyImageLogo();
    this.GetGroupList();
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Dialog",
    };
   /*  this.commands = [
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
  GetGroupList() {
    this._groupService.getGroupList().subscribe((data) => {
      this.ObjPermissionList = data["Object"];
    });
  }
  commandClick(args: CommandClickEventArgs): void {
    this.routes.navigate([
      "Permission-group/EditPermission",
      args.rowData["PermissionId"],
    ]);
  }

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
           const excelExportProperties: ExcelExportProperties = {
          fileName: 'Permission_Group.xlsx'
      };
      this._groupService.SaveExcelReportDownload().subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties);  
        } else {    
        }
      });  
       
        break;
        case "Grid_pdfexport":
        const pdfExportProperties: PdfExportProperties = {
          fileName: "Permission_Group.pdf"                  
        };
        this._groupService.SavePdfReportDownload().subscribe((res) => {
          if (res["Result"]) {
            this.grid.pdfExport(pdfExportProperties); 
          } else {    
          }
        });  
           
        break;
    }
  }

  pdfHeaderQueryCellInfo(args) {
    args.cell.row.pdfGrid.repeatHeader = true;   
  }


 /*  pdfQueryCellInfo(args) {
    args.style = { textBrushColor: "#000000" };
    if (args.cell.row.rowIndex % 2 !== 0) {
     // args.style = { backgroundColor: "#d5efee" };
      args.style = { backgroundColor: "#e8fcfb" };
    }
    if (args.cell.row.rowIndex % 2 === 0)
    {
     // args.style = { backgroundColor: "#e8fcfb" };
       args.style = { backgroundColor: "#d5efee" };
    }
  } */

  GetCompanyImageLogo() {
    this.CompanyImage = this._groupService.GetCompanyImageLogo();
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
