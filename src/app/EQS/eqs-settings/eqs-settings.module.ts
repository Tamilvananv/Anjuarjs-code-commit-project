import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EqsSettingsRoutingModule } from './eqs-settings-routing.module';
import { EqsCustomheaderfieldsComponent } from './eqs-customheaderfields/eqs-customheaderfields.component';
import { EqsUsersettingsComponent } from './eqs-usersettings/eqs-usersettings.component';
import { EqsAlertsettingsComponent } from './eqs-alertsettings/eqs-alertsettings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PageService, SortService, FilterService, GroupService, GridModule, EditService, ColumnMenuService,ToolbarService, CommandColumnService, FreezeService ,ExcelExportService,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { FileManagerModule, NavigationPaneService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
@NgModule({
  declarations: [EqsCustomheaderfieldsComponent, EqsUsersettingsComponent, EqsAlertsettingsComponent, AdminSettingsComponent],
  imports: [
    CommonModule,
    EqsSettingsRoutingModule,
    NgbModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MyCommonModule,
    FileManagerModule
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
export class EqsSettingsModule { }
