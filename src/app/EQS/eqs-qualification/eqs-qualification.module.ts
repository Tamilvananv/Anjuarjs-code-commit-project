import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqsQualificationRoutingModule } from './eqs-qualification-routing.module';
import { EqsQualificationComponent } from './eqs-qualification.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { PageService, SortService, FilterService, GroupService, FreezeService, GridModule , ColumnMenuService,ExcelExportService,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { HttpModule, JsonpModule } from '@angular/http';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
@NgModule({
  declarations: [EqsQualificationComponent],
  imports: [
    CommonModule,
    EqsQualificationRoutingModule,
    DropDownButtonModule,
    GridModule,
    ButtonModule,
    DatePickerModule,
    UploaderModule,
    ComboBoxModule,
    FileManagerModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    MyCommonModule,
    DropDownListModule
  ],
  providers: [PageService, FreezeService,ExcelExportService,
    SortService,
    FilterService,
    GroupService,
    NavigationPaneService,
    ToolbarService, ColumnMenuService,
    DetailsViewService,PdfExportService]
})
export class EqsQualificationModule { }
