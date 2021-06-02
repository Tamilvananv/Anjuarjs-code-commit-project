import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsDashboardRoutingModule } from './sms-dashboard-routing.module';
import { SmsDashboardComponent } from './sms-dashboard.component';


@NgModule({
  declarations: [SmsDashboardComponent],
  imports: [
    CommonModule,
    SmsDashboardRoutingModule
  ]
})
export class SmsDashboardModule { }
