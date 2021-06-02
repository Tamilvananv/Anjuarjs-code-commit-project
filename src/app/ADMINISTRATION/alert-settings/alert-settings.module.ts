import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertSettingsRoutingModule } from './alert-settings-routing.module';
import { AlertSettingsComponent } from './alert-settings.component';


@NgModule({
  declarations: [AlertSettingsComponent],
  imports: [
    CommonModule,
    AlertSettingsRoutingModule
  ]
})
export class AlertSettingsModule { }
