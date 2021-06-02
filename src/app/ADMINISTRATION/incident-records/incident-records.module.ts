import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentRecordsRoutingModule } from './incident-records-routing.module';
import { IncidentRecordsComponent } from './incident-records.component';


@NgModule({
  declarations: [IncidentRecordsComponent],
  imports: [
    CommonModule,
    IncidentRecordsRoutingModule
  ]
})
export class IncidentRecordsModule { }
