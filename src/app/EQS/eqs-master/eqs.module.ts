import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EqsComponent } from './eqs.component';
import { EQSRoutingModule } from './eqs-routing.module';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { PageService, SortService, FilterService, GroupService, GridModule,ColumnMenuService, EditService, ToolbarService, CommandColumnService, PdfExportService, ExcelExportService, FreezeService ,PdfExportProperties,} from '@syncfusion/ej2-angular-grids';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ComboBoxModule,DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { FileManagerModule, NavigationPaneService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    EQSRoutingModule,
    GridModule,
    ButtonModule,
    NgbModule,
    UploaderModule,
    DropDownButtonModule,
    DatePickerModule,
    ComboBoxModule,
    FileManagerModule,
    SwitchModule,
    MyCommonModule,
    ReactiveFormsModule,
    DropDownListModule,AutoCompleteModule
  ],
  declarations: [
    EqsComponent,
    AddEquipmentComponent
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    GroupService,
    EditService,
    ToolbarService,
    NavigationPaneService,
    DetailsViewService,
    CommandColumnService,
    ExcelExportService,
    // FreezeService
    ColumnMenuService,
    PdfExportService]
})
export class EqsModule { }
