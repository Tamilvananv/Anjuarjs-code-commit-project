import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IcsReportsRoutingModule } from './ics-reports-routing.module';
import { InstrumentListComponent } from './instrument-list/instrument-list.component';
import { InstrumentHistoryComponent } from './instrument-history/instrument-history.component';
import { CalibrationReportComponent } from './calibration-report/calibration-report.component';
import { UsageReportComponent } from './usage-report/usage-report.component';
import { GridModule,ExcelExportService,ToolbarService, PageService, SortService, GroupService,ColumnMenuService, FilterService ,PdfExportService} from '@syncfusion/ej2-angular-grids';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [InstrumentListComponent, InstrumentHistoryComponent, CalibrationReportComponent, UsageReportComponent],
  imports: [
    CommonModule,
    IcsReportsRoutingModule,
    GridModule,
  ],
  providers:[ExcelExportService,ToolbarService , PageService, ColumnMenuService , GroupService,PdfExportService]
})
export class IcsReportsModule { }
