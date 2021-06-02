import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcsMaintenanceRoutingModule } from './ics-maintenance-routing.module';
import { IcsMaintenanceComponent } from './ics-maintenance.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule, PageService, SortService, FilterService, GroupService, ToolbarService, ColumnMenuService,ExcelExportService, FreezeService ,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
import { FileManagerModule  } from '@syncfusion/ej2-angular-filemanager';
@NgModule({
  declarations: [IcsMaintenanceComponent],
  imports: [
    CommonModule,
    IcsMaintenanceRoutingModule,
    DropDownButtonModule,
    GridModule,
    DatePickerModule,
    UploaderModule,
    ComboBoxModule,
    ButtonModule,
    FormsModule,
    MyCommonModule,
    DropDownListModule,
    ReactiveFormsModule,
    FileManagerModule 
  ],
  providers: [PageService,
    SortService,
    FilterService, ToolbarService, FreezeService,
    GroupService,ColumnMenuService, ExcelExportService,PdfExportService]
})
export class IcsMaintenanceModule { }
