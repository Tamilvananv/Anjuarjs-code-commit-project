import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IcsQualificationRoutingModule } from './ics-qualification-routing.module';
import { IcsQualificationComponent } from './ics-qualification.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import {
  GridModule, PageService, SortService, GroupService
  , ExcelExportService, FilterService, FreezeService,ColumnMenuService,PdfExportService
} from '@syncfusion/ej2-angular-grids';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { HttpModule, JsonpModule } from '@angular/http';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from './../../Shared Services etc/my-common/my-common.module';
@NgModule({
  declarations: [IcsQualificationComponent],
  imports: [
    CommonModule,
    IcsQualificationRoutingModule,
    DropDownButtonModule,
    GridModule,
    DatePickerModule,
    UploaderModule,
    FileManagerModule, HttpModule, JsonpModule, ComboBoxModule, ButtonModule, FormsModule
    , MyCommonModule, ReactiveFormsModule, DropDownListModule

  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    NavigationPaneService, ToolbarService, DetailsViewService, ExcelExportService, FreezeService,ColumnMenuService,PdfExportService
  ]
})

export class IcsQualificationModule { }
