import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ElnHomeMasterRoutingModule } from './eln-home-master-routing.module';
import { ElnHomeMasterComponent } from './eln-home-master.component';
import { ElnOpenExperimentsComponent } from './eln-open-experiments/eln-open-experiments.component';
import { GridModule, EditService, ToolbarService, CommandColumnService, SortService, PageService, ExcelExportService, ColumnMenuService } from '@syncfusion/ej2-angular-grids';
import { TreeGridModule, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';

@NgModule({
  declarations: [ElnHomeMasterComponent, ElnOpenExperimentsComponent],
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
export class ElnHomeMasterModule { }