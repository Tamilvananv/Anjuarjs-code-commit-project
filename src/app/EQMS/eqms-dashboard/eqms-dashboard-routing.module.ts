import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EqmsDashboardComponent } from './eqms-dashboard.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        // { title: 'EQMS', url: '/eqms-dashboard'  },
        { title: 'Dashboard' }
      ]
    },    
    component: EqmsDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EqmsDashboardRoutingModule {
  
 }
