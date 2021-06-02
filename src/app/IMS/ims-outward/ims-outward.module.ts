import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImsOutwardRoutingModule } from './ims-outward-routing.module';
import { ImsOutwardComponent } from './ims-outward.component';
import { AddOutwardComponent } from './add-outward/add-outward.component';
import { DateRangePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ImsOutwardComponent, AddOutwardComponent],
  imports: [
    CommonModule,
    ImsOutwardRoutingModule,
    DatePickerModule,
    GridModule,
    ComboBoxModule,
    UploaderModule,
    DropDownButtonModule,
    DateRangePickerModule,
    ButtonModule,
    NgbModule,
    DropDownListModule 
  ]
})
export class ImsOutwardModule { }
