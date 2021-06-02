import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintReportRoutingModule } from './print-report-routing.module';
import { PrintReportComponent } from './print-report.component';


@NgModule({
  declarations: [PrintReportComponent],
  imports: [
    CommonModule,
    PrintReportRoutingModule
  ]
})
export class PrintReportModule { }
