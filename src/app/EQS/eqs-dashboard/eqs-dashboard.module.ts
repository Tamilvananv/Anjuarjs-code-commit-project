import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EqsDashboardRoutingModule } from './eqs-dashboard-routing.module';
import { EqsDashboardComponent } from './eqs-dashboard.component';

import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';



@NgModule({
  declarations: [EqsDashboardComponent],
  imports: [
    CommonModule,
    EqsDashboardRoutingModule,
    DropDownButtonModule
  ],
  providers: [  ]
})
export class EqsDashboardModule { }
