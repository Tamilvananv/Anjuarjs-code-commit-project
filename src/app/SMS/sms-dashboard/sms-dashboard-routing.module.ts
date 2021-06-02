import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsDashboardComponent } from './sms-dashboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },     
        { title: 'Dashboard' }
      ]
    },    
    component: SmsDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsDashboardRoutingModule { }
