import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EqsQualificationComponent } from './eqs-qualification.component';

const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'EQS Qualification',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'EQS', url: '/eqs-home' },
        { title: 'Qualification' }
      ]
    },
    component: EqsQualificationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EqsQualificationRoutingModule { }
