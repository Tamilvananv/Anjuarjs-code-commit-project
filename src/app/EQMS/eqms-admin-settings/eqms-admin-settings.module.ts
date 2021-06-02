import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EqmsAdminSettingsRoutingModule } from './eqms-admin-settings-routing.module';
import { EqmsAdminSettingsComponent } from './eqms-admin-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [EqmsAdminSettingsComponent],
  imports: [
    CommonModule,
    EqmsAdminSettingsRoutingModule,
    NgbModule,
    GridModule,
    ButtonModule,
    ListViewModule,
    ListBoxModule,
  ]
})
export class EqmsAdminSettingsModule { }
