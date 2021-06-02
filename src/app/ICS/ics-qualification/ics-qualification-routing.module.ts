import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcsQualificationComponent } from './ics-qualification.component';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Qualification',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ICS', url: '/icshome'  },
        { title: 'Qualification' }
      ]
    },
    component: IcsQualificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcsQualificationRoutingModule { }
