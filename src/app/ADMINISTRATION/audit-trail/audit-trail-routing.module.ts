import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditTrailComponent } from './audit-trail.component';


const routes: Routes = [ 
  {
  path: '',
data: {
  // title: 'Audit Trail ',
  urls: [
    { title: 'Home', url: '/landing' },
    { title: 'Audit Trail', url: '/audittrail'  },
  ]
},
component: AuditTrailComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditTrailRoutingModule { }
