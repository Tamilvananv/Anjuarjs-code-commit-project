import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ElnHomeMasterRoutingModule } from './qceln-home-master-routing.module';
import { QCElnHomeMasterComponent } from './qceln-home-master.component';
import { QCElnOpenExperimentsComponent } from './qceln-open-experiments/qceln-open-experiments.component';
import { GridModule, EditService, ToolbarService, CommandColumnService, SortService, PageService, ColumnMenuService, ExcelExportService } from '@syncfusion/ej2-angular-grids';
import { TreeGridModule, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';

@NgModule({
  declarations: [QCElnHomeMasterComponent, QCElnOpenExperimentsComponent],
  imports: [
    CommonModule,
    MyCommonModule,
    NgbModule,
    ElnHomeMasterRoutingModule,
    GridModule,
    TreeGridModule
  ],
  providers: [PageService,ColumnMenuService,
    SortService, EditService, ToolbarService, CommandColumnService,ExcelExportService,
    FilterService]
})
export class QCElnHomeMasterModule { }