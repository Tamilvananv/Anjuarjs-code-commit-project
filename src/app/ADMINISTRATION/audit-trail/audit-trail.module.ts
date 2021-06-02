import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuditTrailRoutingModule } from "./audit-trail-routing.module";
import { AuditTrailComponent } from "./audit-trail.component";
import {
  GridModule,
  FilterService,
  PageService,
  ToolbarService,
  ExcelExportService,
  SortService,
  ResizeService,
  GroupService,
  ColumnMenuService,
  PdfExportService,
  PdfExportProperties 
} from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [AuditTrailComponent],
  imports: [CommonModule, AuditTrailRoutingModule, GridModule],
  providers: [
    FilterService,
    PageService,
    ToolbarService,
    SortService,
    ResizeService,
    GroupService,
    ColumnMenuService,
    ExcelExportService,
    PdfExportService,
  ],
})
export class AuditTrailModule {}
