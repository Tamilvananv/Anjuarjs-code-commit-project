import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentManagementRoutingModule } from './document-management-routing.module';
import { DocumentManagementComponent } from './document-management.component';


@NgModule({
  declarations: [DocumentManagementComponent],
  imports: [
    CommonModule,
    DocumentManagementRoutingModule
  ]
})
export class DocumentManagementModule { }
