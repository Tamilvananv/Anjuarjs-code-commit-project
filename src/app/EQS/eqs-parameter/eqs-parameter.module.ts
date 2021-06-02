import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqsParameterRoutingModule } from './eqs-parameter-routing.module';
import { EqsParameterComponent } from '../eqs-parameter/eqs-parameter.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule, FilterService, FreezeService, GroupService,  SortService,PageService,ColumnMenuService, CommandColumnService, EditService, ToolbarService, ExcelExportService ,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { FileManagerModule, NavigationPaneService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
import { EqsParameterKeyboardEntryComponent } from './eqs-parameter-keyboard-entry/eqs-parameter-keyboard-entry.component';
@NgModule({
  declarations: [EqsParameterComponent, EqsParameterKeyboardEntryComponent],
  imports: [
    CommonModule,
    EqsParameterRoutingModule,
    DropDownButtonModule,
    GridModule,
    ButtonModule,
    DatePickerModule,
    FormsModule,
    DropDownListModule,
    FileManagerModule,
    ReactiveFormsModule,
    MyCommonModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    FreezeService,
    CommandColumnService,
    EditService,
    ToolbarService,
    NavigationPaneService,
    DetailsViewService, ExcelExportService,
    ToolbarService,
    ColumnMenuService,
    PdfExportService
  ]
})
export class EqsParameterModule { }
