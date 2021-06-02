import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoaDashboardRoutingModule } from './coa-dashboard-routing.module';
import { CoaDashboardComponent } from './coa-dashboard.component';
import {  GridModule,  PageService,} from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [CoaDashboardComponent],
  imports: [
    CommonModule,
    CoaDashboardRoutingModule,
    GridModule,
  ],
  providers: [
    PageService,
  ]
})
export class CoaDashboardModule { }
