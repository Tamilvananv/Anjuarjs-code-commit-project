import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeControlRoutingModule } from './change-control-routing.module';
import { ChangeControlComponent } from './change-control.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RaiseNewRequestComponent } from './raise-new-request/raise-new-request.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { ChangeDetailsComponent } from './change-details/change-details.component';
import { GridModule, PageService, ExcelExportService, SortService, FilterService ,  EditService,  ToolbarService, CommandColumnService} from '@syncfusion/ej2-angular-grids';
import { PrimaryAssessmentComponent } from './primary-assessment/primary-assessment.component';
import { QualityAssuaranceComponent } from './quality-assuarance/quality-assuarance.component';
import { ClosureComponent } from './closure/closure.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FileManagerModule, NavigationPaneService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
@NgModule({
  declarations: [ChangeControlComponent, RaiseNewRequestComponent, ChangeDetailsComponent, PrimaryAssessmentComponent, QualityAssuaranceComponent, ClosureComponent],
  imports: [
    CommonModule,
    ChangeControlRoutingModule,
    NgbModule,
    ButtonModule,
    DropDownListModule,
    AccordionModule,
    GridModule,
    DatePickerModule,
    UploaderModule,
    TextBoxModule,
    TreeGridModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule ,
    FileManagerModule ,
    MyCommonModule

  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService, 
    ToolbarService,
    ExcelExportService,
    CommandColumnService,
    NavigationPaneService, 
    DetailsViewService
  ]
})
export class ChangeControlModule { }
