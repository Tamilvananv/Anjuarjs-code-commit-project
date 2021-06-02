import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EqmsDashboardRoutingModule } from './eqms-dashboard-routing.module';
import { EqmsDashboardComponent } from './eqms-dashboard.component';


@NgModule({
  declarations: [EqmsDashboardComponent],
  imports: [
    CommonModule,
    EqmsDashboardRoutingModule
  ]
})
export class EqmsDashboardModule { }
