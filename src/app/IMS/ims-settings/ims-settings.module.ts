import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImsSettingsRoutingModule } from './ims-settings-routing.module';
import { ImsSettingsComponent } from './ims-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule, EditService, CommandColumnService, ColumnMenuService } from '@syncfusion/ej2-angular-grids';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {  FilterService , PageService, SortService,ExcelExportService, ToolbarService,PdfExportService} from '@syncfusion/ej2-angular-treegrid';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import {  ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from './../../Shared Services etc/my-common/my-common.module';



@NgModule({
  declarations: [ImsSettingsComponent],
  imports: [
    CommonModule,
    ImsSettingsRoutingModule,
    NgbModule,
    GridModule,
    TreeGridModule,
    ButtonModule,
    ComboBoxModule,
    ReactiveFormsModule,
    MyCommonModule,
    
  ],
  providers: [PageService,
    SortService,EditService, ,
    , CommandColumnService,
    FilterService ,ExcelExportService, ToolbarService,PdfExportService, ColumnMenuService]
})
export class ImsSettingsModule { }
