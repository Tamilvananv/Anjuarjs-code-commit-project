import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditManagementRoutingModule } from './audit-management-routing.module';
import { AuditManagementComponent } from './audit-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RaiseNewRequestComponent } from './raise-new-request/raise-new-request.component';
import { AuditDetailsComponent } from './raise-new-request/audit-details/audit-details.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule, DateRangePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule , ReactiveFormsModule,} from '@angular/forms';
import { GridModule, FilterService , PageService,
  ToolbarService,
  SortService,
  ResizeService,
  GroupService,
  ColumnMenuService,
  ExcelExportService,
  PdfExportService} from '@syncfusion/ej2-angular-grids';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { AttachmentsComponent } from './raise-new-request/attachments/attachments.component';
import { UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { NotesComponent } from './raise-new-request/notes/notes.component';
import { ReportGenerationComponent } from './raise-new-request/report-generation/report-generation.component';
import { ResponseComponent } from './raise-new-request/response/response.component';
import { CertificateComponent } from './raise-new-request/certificate/certificate.component';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
@NgModule({
  declarations: [AuditManagementComponent, RaiseNewRequestComponent, AuditDetailsComponent, AttachmentsComponent, NotesComponent, ReportGenerationComponent, ResponseComponent, CertificateComponent],
  imports: [
    CommonModule,
    AuditManagementRoutingModule,
    NgbModule,
    ButtonModule,
    DropDownListModule,
    DatePickerModule,
    FormsModule,
    GridModule,
    DateRangePickerModule,
    TimePickerModule,
    AccordionModule,
    ReactiveFormsModule,
    NgbModule,
    ComboBoxModule,
    UploaderModule,
    DatePickerModule,
    TextBoxModule,
    FileManagerModule,
    ScheduleModule
    
  ],
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
export class AuditManagementModule { }
