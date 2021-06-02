import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EqsDashboardComponent } from './eqs-dashboard.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          // title: 'EQS Dashboard',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'EQS Master ' }
          ]
        },
        component: EqsDashboardComponent
      },
      // {
      //   path: 'addequipment',
      //   component: AddEquipmentComponent,
      //   data: {
      //     title: 'AddEquipment',
      //     urls: [
      //       { title: 'Dashboard', url: '/landing' },
      //       { title: 'EQS', url: '/eqshome'  },
      //       { title: 'AddEquipment' }
      //     ]
      //   }
      // },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EqsDashboardRoutingModule { }
