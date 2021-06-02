import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ICSRoutingModule } from './ics-instrument-master-routing.module';
import { IcsComponent } from './ics-instrument-master.component';
import { AddInstrumentComponent } from './add-instrument/add-instrument.component';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
// tslint:disable-next-line:max-line-length
import { GridModule, PageService, SortService, FilterService, ExcelExportService, GroupService, PdfExportService,FreezeService, EditService, ToolbarService, CommandColumnService, ColumnMenuService } from '@syncfusion/ej2-angular-grids';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ComboBoxModule,DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { FileManagerModule, NavigationPaneService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberDirective } from 'src/app/Shared Services etc/Directives/numberDIrective';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';

/* Changes apply */
@NgModule({
  declarations: [IcsComponent, AddInstrumentComponent],
  imports: [
    CommonModule,
    ICSRoutingModule,
    GridModule, ButtonModule,
    NgbModule,
    UploaderModule,
    ComboBoxModule,DropDownListModule,
    DropDownButtonModule,
    DatePickerModule,
    FileManagerModule,
    FormsModule,
    SwitchModule, MyCommonModule,ReactiveFormsModule, AutoCompleteModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,ColumnMenuService,
    EditService, ToolbarService,
    NavigationPaneService, DetailsViewService, CommandColumnService, ExcelExportService, FreezeService , PdfExportService
  ]
})
export class ICSModule { }
