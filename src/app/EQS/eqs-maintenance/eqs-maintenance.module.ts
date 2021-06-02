import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqsMaintenanceRoutingModule } from './eqs-maintenance-routing.module';
import { EqsMaintenanceComponent } from '../eqs-maintenance/eqs-maintenance.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule, PageService, SortService, CommandColumnService, EditService, GroupService, FilterService,ExcelExportService, FreezeService, ColumnMenuService ,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { HttpModule, JsonpModule } from '@angular/http';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {  ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';

@NgModule({
  declarations: [EqsMaintenanceComponent],
  imports: [
    CommonModule,
    EqsMaintenanceRoutingModule,
    DropDownButtonModule,
    GridModule,
    DatePickerModule,
    UploaderModule,
    ComboBoxModule,
    ButtonModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    MyCommonModule,
    DropDownListModule,
    FileManagerModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    ColumnMenuService,
    FreezeService,
    NavigationPaneService,
    ToolbarService,
    DetailsViewService,
    CommandColumnService,
    EditService,ExcelExportService,
    ToolbarService,
    PdfExportService]
})
export class EqsMaintenanceModule { }
