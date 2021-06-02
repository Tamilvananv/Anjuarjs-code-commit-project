import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImsReportsRoutingModule } from './ims-reports-routing.module';
import { ImsReportsComponent } from './ims-reports.component';


@NgModule({
  declarations: [ImsReportsComponent],
  imports: [
    CommonModule,
    ImsReportsRoutingModule
  ]
})
export class ImsReportsModule { }
