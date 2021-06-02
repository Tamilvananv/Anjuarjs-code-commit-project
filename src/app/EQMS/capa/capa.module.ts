import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapaRoutingModule } from './capa-routing.module';
import { CapaComponent } from './capa.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RaiseRequisitionComponent } from './raise-requisition/raise-requisition.component';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { CapaDetailsComponent } from './capa-details/capa-details.component';
import { CapaQualityAssuranceComponent } from './capa-quality-assurance/capa-quality-assurance.component';
import { CapaClosureComponent } from './capa-closure/capa-closure.component';
import { CapaExtensionComponent } from './capa-details/capa-extension/capa-extension.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {  PageService, ExcelExportService, SortService, FilterService ,  EditService,  ToolbarService} from '@syncfusion/ej2-angular-grids';
import { DeviationModule } from '../deviation/deviation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ CapaComponent, RaiseRequisitionComponent, CapaDetailsComponent, CapaQualityAssuranceComponent, CapaClosureComponent, CapaExtensionComponent],
  imports: [
    CommonModule,
    CapaRoutingModule,
    NgbModule,
    ButtonModule,
    AccordionModule,
    DropDownListModule,
    UploaderModule,
    GridModule,
    DatePickerModule,
    DeviationModule,
    FormsModule,
    ReactiveFormsModule ,
    CheckBoxModule,
    TextBoxModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService, 
    ToolbarService,
    ExcelExportService
  ],
  
})


export class CapaModule { }
