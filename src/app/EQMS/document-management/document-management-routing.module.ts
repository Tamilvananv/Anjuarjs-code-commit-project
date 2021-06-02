import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentManagementComponent } from './document-management.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
         { title: 'EQMS', url: '/eqms-dashboard'  },
        { title: 'Document Management' }
      ]
    },    
    component: DocumentManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentManagementRoutingModule { }
