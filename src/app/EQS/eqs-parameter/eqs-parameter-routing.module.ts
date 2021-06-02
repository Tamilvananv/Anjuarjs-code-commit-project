import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EqsParameterComponent } from './eqs-parameter.component';
import { EqsParameterKeyboardEntryComponent } from './eqs-parameter-keyboard-entry/eqs-parameter-keyboard-entry.component';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Eqs Parameter',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'EQS', url: '/eqs-home' },
        { title: 'Add Parameter' }
      ]
    },
    component: EqsParameterComponent

  },
  // {
  //   path: 'keyboardentry',
  
  //   data: {
  //     urls: [
  //       { title: 'Home', url: '/landing' },
  //       { title: 'EQS', url: '/eqs-home'  },
  //       { title: 'Keyboard Entry' }
  //     ]
  //   },
  //   component: EqsParameterKeyboardEntryComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EqsParameterRoutingModule { }
