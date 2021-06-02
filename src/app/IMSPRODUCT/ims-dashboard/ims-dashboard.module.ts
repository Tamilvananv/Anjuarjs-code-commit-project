import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImsDashboardRoutingModule } from './ims-dashboard-routing.module';
import { ImsDashboardComponent } from './ims-dashboard.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule, PageService, SortService, GroupService, FilterService,ColumnMenuService, FreezeService, CommandColumnService, EditService } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [ImsDashboardComponent],
  imports: [
    CommonModule,
    ImsDashboardRoutingModule,
    GridModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DatePickerModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    FreezeService,
    CommandColumnService,
    EditService,
   
    ColumnMenuService
  ]
})
export class ImsDashboardModule { }
