import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImsHomeMasterRoutingModule } from './ims-home-master-routing.module';
import { ImsHomeMasterComponent } from './ims-home-master.component';
import { ImsStockComponent } from './ims-stock/ims-stock.component';
import { ImsReorderComponent } from './ims-reorder/ims-reorder.component';
import { ImsPendingApprovalComponent } from './ims-pending-approval/ims-pending-approval.component';
import { ImsMaterialNearingExpiryComponent } from './ims-material-nearing-expiry/ims-material-nearing-expiry.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImsCloseRequestComponent } from './ims-close-request/ims-close-request.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [ImsHomeMasterComponent, ImsStockComponent, ImsReorderComponent, ImsPendingApprovalComponent, ImsMaterialNearingExpiryComponent, ImsCloseRequestComponent],
  imports: [
    CommonModule,
    ImsHomeMasterRoutingModule,
    GridModule,
    ButtonModule,
    NgbModule,
    DropDownButtonModule,
    DatePickerModule
  ]
})
export class ImsHomeMasterModule { }
