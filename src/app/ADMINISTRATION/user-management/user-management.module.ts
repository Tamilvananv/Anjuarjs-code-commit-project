import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { UserManagementComponent } from "./user-management.component";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import {
  GridModule,
  PageService,
  SortService,
  FilterService,
  CommandColumnService,
  ExcelExportService,
  ToolbarService,
  ResizeService,
  GroupService,
  ColumnMenuService,
  PdfExportService,
  PdfExportProperties,
  
} from "@syncfusion/ej2-angular-grids";//GridModule, PageService, ExcelExportService, SortService, FilterService ,  EditService,  ToolbarService, CommandColumnService
import {
  ComboBoxModule,
  DropDownListModule,
  ListBoxModule,
} from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import { AddUserComponent } from "./add-user/add-user.component";
import { DialogAllModule } from "@syncfusion/ej2-angular-popups";
import { TabAllModule } from "@syncfusion/ej2-angular-navigations";
import { NumericTextBoxAllModule } from "@syncfusion/ej2-angular-inputs";
import { ListViewModule } from "@syncfusion/ej2-angular-lists";
import { TreeGridModule } from "@syncfusion/ej2-angular-treegrid";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FileManagerModule, NavigationPaneService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MyCommonModule } from "./../../Shared Services etc/my-common/my-common.module";
@NgModule({
  declarations: [UserManagementComponent, AddUserComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ButtonModule,
    GridModule,
    ComboBoxModule,
    FormsModule,
    NgbModule,
    DialogAllModule,
    TabAllModule,
    NumericTextBoxAllModule,
    ListViewModule,
    ListBoxModule,
    TreeGridModule,
    DropDownListModule,
    DatePickerModule,
    ReactiveFormsModule,
    MyCommonModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    CommandColumnService,
    ToolbarService,
    ResizeService,
    GroupService,
    ColumnMenuService,
    ExcelExportService,
    NavigationPaneService,
    DetailsViewService,
    PdfExportService
  ],
})
export class UserManagementModule {}
