import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GridModule,
  FilterService,
  FreezeService,
  GroupService,
  SortService,
  PageService,
  CommandColumnService,
  EditService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  ColumnMenuService,
  ResizeService,
  PdfExportProperties,
} from "@syncfusion/ej2-angular-grids";
import { DepartmentsRoutingModule } from "./departments-routing.module";
import { DepartmentsComponent } from "./departments.component";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { ComboBoxModule ,DropDownListModule} from "@syncfusion/ej2-angular-dropdowns";
import {
  FileManagerModule,
  NavigationPaneService,
  DetailsViewService,
} from "@syncfusion/ej2-angular-filemanager";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyCommonModule } from "./../../Shared Services etc/my-common/my-common.module";

@NgModule({
  declarations: [DepartmentsComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    GridModule,
    ButtonModule,
    ComboBoxModule,
    FormsModule,
    MyCommonModule,
    ReactiveFormsModule,
    DropDownListModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    GroupService,
    FreezeService,
    CommandColumnService,
    EditService,
    ToolbarService,
    NavigationPaneService,
    DetailsViewService,
    ExcelExportService,
    ResizeService,
    ColumnMenuService,
    PdfExportService,
  ],
})
export class DepartmentsModule {}
