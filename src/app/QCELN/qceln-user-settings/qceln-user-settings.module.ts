import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QCElnUserSettingsRoutingModule } from './qceln-user-settings-routing.module';
import { QCElnUserSettingsComponent } from './qceln-user-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PageService, SortService, FilterService, GroupService, GridModule, EditService, ColumnMenuService,ToolbarService, CommandColumnService, FreezeService ,ExcelExportService,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { FileManagerModule, NavigationPaneService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';

@NgModule({
  declarations: [QCElnUserSettingsComponent],
  imports: [
    CommonModule,
    QCElnUserSettingsRoutingModule,
    NgbModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
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
export class QCElnUserSettingsModule { }
