import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcsComponent } from './ics-instrument-master.component';
import { AddInstrumentComponent } from './add-instrument/add-instrument.component';
// import {IcsComponent} from './ics-instrument-master.component';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Instrument Master',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ICS', url: '/icshome'  },
        { title: 'Instrument Master' }
      ]
    },
    component: IcsComponent
  },
  {
    path: 'addinstrument',
    component: AddInstrumentComponent,
    data: {
      // title: 'Add Instrument',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ICS', url: '/icshome'  },
        { title: 'Add Instrument' }
      ]
    }
  },
  {
    path: 'editinstrument/:id',
    component: AddInstrumentComponent,
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ICS', url: '/icshome'  },
        { title: 'Edit Instrument' }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ICSRoutingModule { }
