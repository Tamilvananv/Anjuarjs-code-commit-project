import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcsCalibrationmasterRoutingModule } from './ics-calibrationmaster-routing.module';
import { IcsCalibrationmasterComponent } from './ics-calibrationmaster.component';
import { GridModule, PageService, SortService, FilterService, GroupService ,FreezeService,ToolbarService, ExcelExportService, ColumnMenuService,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from './../../Shared Services etc/my-common/my-common.module';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FileManagerModule  } from '@syncfusion/ej2-angular-filemanager';

@NgModule({
  declarations: [IcsCalibrationmasterComponent],
  imports: [
    CommonModule,
    IcsCalibrationmasterRoutingModule,
    DropDownButtonModule,
    GridModule,
    DatePickerModule,
    UploaderModule,
    ComboBoxModule,
    ButtonModule,FormsModule,
    MyCommonModule, ReactiveFormsModule, DropDownListModule,FileManagerModule
  ],
  providers: [PageService,
    SortService,
    FilterService, ExcelExportService,ToolbarService,
    // FreezeService,
    ColumnMenuService,
    GroupService,PdfExportService]
})
export class IcsCalibrationmasterModule { }
