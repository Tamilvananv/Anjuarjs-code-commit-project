import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportGenerationRoutingModule } from './report-generation-routing.module';
import { ReportGenerationComponent } from './report-generation.component';
import {  GridModule,  PageService,} from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [ReportGenerationComponent],
  imports: [
    CommonModule,
    ReportGenerationRoutingModule,   
    GridModule,
  ],
  providers: [
    PageService,
  ]
})
export class ReportGenerationModule { }
