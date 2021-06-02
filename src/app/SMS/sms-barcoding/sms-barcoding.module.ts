import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsBarcodingRoutingModule } from './sms-barcoding-routing.module';
import { SmsBarcodingComponent } from './sms-barcoding.component';
import { NewBarcodeComponent } from './new-barcode/new-barcode.component';
import { ListComponent } from './list/list.component';
import { IssueComponent } from './issue/issue.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule,FilterService, PageService } from '@syncfusion/ej2-angular-grids';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@NgModule({
  declarations: [SmsBarcodingComponent, NewBarcodeComponent, ListComponent, IssueComponent, HistoryComponent, SettingsComponent],
  imports: [
    CommonModule,
    NgbModule,
    SmsBarcodingRoutingModule,
    GridModule,
    ComboBoxModule,
    ButtonModule,
  ]
})
export class SmsBarcodingModule { }
