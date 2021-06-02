import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingsComponent } from './user-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import {  GridModule,  PageService,} from "@syncfusion/ej2-angular-grids";
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
@NgModule({
  declarations: [UserSettingsComponent],
  imports: [
    CommonModule,
    UserSettingsRoutingModule,
    NgbModule,
    AccordionModule,
    GridModule,
    ButtonModule
  ],
  providers: [
    PageService,
  ]
})
export class UserSettingsModule { }
