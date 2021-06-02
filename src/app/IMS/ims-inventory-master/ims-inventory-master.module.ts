import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImsInventoryMasterRoutingModule } from './ims-inventory-master-routing.module';
import { ImsInventoryMasterComponent } from './ims-inventory-master.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { GridModule, PageService, SortService } from '@syncfusion/ej2-angular-grids';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterService, CommandColumnService, EditService, ExcelExportService, PdfExportService, GroupService } from '@syncfusion/ej2-angular-grids';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
@NgModule({
  declarations: [ImsInventoryMasterComponent, AddInventoryComponent],
  imports: [
    CommonModule,
    ImsInventoryMasterRoutingModule,
    GridModule,
    ComboBoxModule,
    UploaderModule,
    ButtonModule,
    FormsModule,
    DropDownListModule,
    ReactiveFormsModule,
    MyCommonModule,
    CheckBoxModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    EditService, ,
       , CommandColumnService,
       ExcelExportService, PdfExportService
  ]
})
export class ImsInventoryMasterModule { }
