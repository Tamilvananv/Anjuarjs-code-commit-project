import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcsParameterComponent } from './ics-parameter.component';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Parameter',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ICS', url: '/icshome'  },
        { title: 'Add Parameter' }
      ]
    },
    component: IcsParameterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcsParameterRoutingModule { }
