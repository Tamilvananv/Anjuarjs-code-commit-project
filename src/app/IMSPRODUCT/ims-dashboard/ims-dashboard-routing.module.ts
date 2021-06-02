import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImsDashboardComponent } from './ims-dashboard.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },   
        { title: 'Dashboard', url: '/ims-dashboard' },    
        { title: 'Dashboard' }
      ]
    },    
    component: ImsDashboardComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImsDashboardRoutingModule { }
