import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EqsMaintenanceComponent } from './eqs-maintenance.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          // title: 'EQS Maintenance',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'EQS', url: '/eqs-home'  },
            { title: ' Maintenance' }
          ]
        },
        component: EqsMaintenanceComponent
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EqsMaintenanceRoutingModule { }
