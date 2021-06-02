import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqsReportsRoutingModule } from './eqs-reports-routing.module';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentHistoryComponent } from './equipment-history/equipment-history.component';
import { EqsCalibrationReportComponent } from './eqs-calibration-report/eqs-calibration-report.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule, PageService, SortService, GroupService, FilterService, ToolbarService,ExcelExportService ,  ColumnMenuService,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { HttpModule, JsonpModule } from '@angular/http';


@NgModule({
  declarations: [EquipmentListComponent, EquipmentHistoryComponent, EqsCalibrationReportComponent],
  imports: [
    CommonModule,
    EqsReportsRoutingModule,
    DropDownButtonModule,
    GridModule,
    ComboBoxModule,
    DropDownListModule,
    HttpModule,
    JsonpModule,
  ],
  providers: [PageService, SortService, GroupService, FilterService, ToolbarService,ExcelExportService,  ColumnMenuService,PdfExportService]
})
export class EqsReportsModule { }
