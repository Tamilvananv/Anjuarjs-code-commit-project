import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IcsSettingsRoutingModule } from './ics-settings-routing.module';
import { IcsUsersettingComponent } from './ics-usersetting/ics-usersetting.component';
import { IcsCustomheaderfieldComponent } from './ics-customheaderfield/ics-customheaderfield.component';
import { IcsAlertsettingsComponent } from './ics-alertsettings/ics-alertsettings.component';
import { IcsInstrumentTypeComponent } from './ics-instrument-type/ics-instrument-type.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule, SortService , FilterService, PageService, ExcelExportService, ToolbarService,PdfExportService} from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from './../../Shared Services etc/my-common/my-common.module';
@NgModule({
  declarations: [IcsUsersettingComponent, IcsCustomheaderfieldComponent, IcsAlertsettingsComponent, IcsInstrumentTypeComponent],
  imports: [
    CommonModule,
    IcsSettingsRoutingModule,
    NgbModule,
    GridModule,
    ButtonModule,
    FormsModule,
    MyCommonModule,
    ReactiveFormsModule
  ],
  providers:[SortService, FilterService, PageService, ExcelExportService, ToolbarService,PdfExportService]
})
export class IcsSettingsModule { }
