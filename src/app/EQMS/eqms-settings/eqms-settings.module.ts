import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EqmsSettingsRoutingModule } from './eqms-settings-routing.module';
import { EqmsSettingsComponent } from './eqms-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuditSettingsComponent } from './audit-settings/audit-settings.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EqmsSettingsComponent, AuditSettingsComponent],
  imports: [
    CommonModule,
    EqmsSettingsRoutingModule,
    NgbModule,
    GridModule,
    ButtonModule,
    FormsModule
  ]
})
export class EqmsSettingsModule { }
