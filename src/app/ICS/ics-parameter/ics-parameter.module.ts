import { MyCommonModule } from './../../Shared Services etc/my-common/my-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcsParameterRoutingModule } from './ics-parameter-routing.module';
import { IcsParameterComponent } from './ics-parameter.component';
import {
  GridModule, PageService, SortService, GroupService, FilterService
  , FreezeService, ToolbarService, ExcelExportService,ColumnMenuService,PdfExportService
} from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [IcsParameterComponent],
  imports: [
    CommonModule,
    IcsParameterRoutingModule,
    DropDownListModule,
    GridModule,
    ButtonModule,
    FormsModule,
    MyCommonModule,
    ReactiveFormsModule
  ],
  providers: [PageService,
    SortService,
    FilterService, ToolbarService, ExcelExportService, FreezeService,ColumnMenuService,
    GroupService,PdfExportService]
})
export class IcsParameterModule { }
