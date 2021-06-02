import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviationRoutingModule } from './deviation-routing.module';
import { DeviationComponent } from './deviation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RaiseRequestComponent } from './raise-request/raise-request.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { DeviationDetailsComponent } from './deviation-details/deviation-details.component';
import { UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DeviationPriliminaryComponent } from './deviation-priliminary/deviation-priliminary.component';
import { DeviationQualityAssuranceComponent } from './deviation-quality-assurance/deviation-quality-assurance.component';
import { DeviationCapaComponent } from './deviation-capa/deviation-capa.component';
import { DeviationFinalClosureComponent } from './deviation-final-closure/deviation-final-closure.component';
import { DevExtensionComponent } from './deviation-details/dev-extension/dev-extension.component';
import {  PageService, ExcelExportService, SortService, FilterService ,  EditService,  ToolbarService} from '@syncfusion/ej2-angular-grids';
import { QaAssessmentComponent } from './qa-assessment/qa-assessment.component';


@NgModule({
  declarations: [DeviationComponent, RaiseRequestComponent,DevExtensionComponent, DeviationDetailsComponent, DeviationPriliminaryComponent, DeviationQualityAssuranceComponent, DeviationCapaComponent, DeviationFinalClosureComponent, QaAssessmentComponent],
  imports: [
    CommonModule,
    DeviationRoutingModule,
    NgbModule,
    DropDownListModule,
    DatePickerModule,
    ButtonModule,
    GridModule,
    AccordionModule,
    UploaderModule,
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
  exports:[DeviationCapaComponent]
})

export class DeviationModule { }
