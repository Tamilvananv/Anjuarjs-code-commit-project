import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImsReportsComponent } from './ims-reports.component';


const routes: Routes = [
  {
  
    path: '',
    data: {
      // title: 'IMS Master',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'IMS-Reports' }
      ]
    },
    component: ImsReportsComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImsReportsRoutingModule { }
