import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GroupsRoutingModule } from "./groups-routing.module";
import { GroupsComponent } from "./groups.component";
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
  PdfExportProperties 
} from "@syncfusion/ej2-angular-grids";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogAllModule } from "@syncfusion/ej2-angular-popups";
import { TabAllModule } from "@syncfusion/ej2-angular-navigations";
import { NumericTextBoxAllModule } from "@syncfusion/ej2-angular-inputs";
import { TreeGridModule } from "@syncfusion/ej2-angular-treegrid";
//import { PageService, SortService, FilterService ,CommandColumnService} from '@syncfusion/ej2-angular-treegrid';
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { MyCommonModule } from "src/app/Shared Services etc/my-common/my-common.module";

@NgModule({
  declarations: [GroupsComponent, CreateGroupComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    ButtonModule,
    GridModule,
    NgbModule,
    FormsModule,
    DialogAllModule,
    TabAllModule,
    NumericTextBoxAllModule,
    TreeGridModule,
    CheckBoxModule,
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
    PdfExportService,
   
  ],
})
export class GroupsModule {}
