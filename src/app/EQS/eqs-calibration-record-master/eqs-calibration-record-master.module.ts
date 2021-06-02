import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EqsCalibrationRecordMasterRoutingModule } from './eqs-calibration-record-master-routing.module';
import { EqsCalibrationRecordMasterComponent } from './eqs-calibration-record-master.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule, PageService, SortService, CommandColumnService, EditService,ExcelExportService, GroupService, FilterService, FreezeService, ColumnMenuService,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { HttpModule, JsonpModule } from '@angular/http';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
@NgModule({
  declarations: [EqsCalibrationRecordMasterComponent],
  imports: [
    CommonModule,
    EqsCalibrationRecordMasterRoutingModule,
    GridModule,
    DropDownButtonModule,
    DatePickerModule,
    UploaderModule,
    ComboBoxModule,
    ButtonModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    DropDownListModule,
    ReactiveFormsModule,
    MyCommonModule,
    FileManagerModule
  ],
  providers: [PageService,ExcelExportService,
    SortService,
    GroupService,
    ColumnMenuService,
    FilterService,
    FreezeService,
    NavigationPaneService,
    ToolbarService,
    DetailsViewService,
    CommandColumnService,
    EditService,
    ToolbarService,
    PdfExportService]
})
export class EqsCalibrationRecordMasterModule { }
