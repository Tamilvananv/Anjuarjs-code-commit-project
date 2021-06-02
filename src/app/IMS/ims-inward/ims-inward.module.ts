import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImsInwardRoutingModule } from './ims-inward-routing.module';
import { ImsInwardComponent } from './ims-inward.component';
import { AddInwardComponent } from './add-inward/add-inward.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';

@NgModule({
  declarations: [ImsInwardComponent, AddInwardComponent],
  imports: [
    CommonModule,
    ImsInwardRoutingModule,
    GridModule,
    ComboBoxModule,
    DatePickerModule,
    UploaderModule,
    DateRangePickerModule ,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MyCommonModule
  ]
})
export class ImsInwardModule { }
