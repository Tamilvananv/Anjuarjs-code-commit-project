import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditManagementComponent } from './audit-management.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
         { title: 'EQMS', url: '/eqms-dashboard'  },
        { title: 'Audit Management' }
      ]
    },    
    component: AuditManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditManagementRoutingModule { }
