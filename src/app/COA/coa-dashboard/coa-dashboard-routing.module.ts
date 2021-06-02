import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoaDashboardComponent } from './coa-dashboard.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },     
        { title: 'Dashboard' }
      ]
    },    
    component: CoaDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoaDashboardRoutingModule { }
