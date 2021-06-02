import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PageService, SortService, FilterService, GroupService, GridModule, EditService, ColumnMenuService, ToolbarService, CommandColumnService, FreezeService, ExcelExportService, PdfExportService } from '@syncfusion/ej2-angular-grids';
import { NavigationPaneService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
import { ElnExperimentReportComponent } from './eln-experiment-report/eln-experiment-report.component';
import { ElnReportsRoutingModule } from './eln-reports-routing.module';

@NgModule({
  declarations: [ElnExperimentReportComponent],
  imports: [
    CommonModule,
    ElnReportsRoutingModule,
    NgbModule,
    GridModule,
    ButtonModule,
    MyCommonModule
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
    ColumnMenuService,
    ExcelExportService,
    PdfExportService
  ]
})
export class ElnReportsModule { }
