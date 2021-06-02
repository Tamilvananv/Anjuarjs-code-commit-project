import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QCElnNewExperimentsComponent } from './qceln-new-experiments.component';
const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'ELN New Experiments',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'QC ELN', url: '/qcelnhome'  },
        { title: 'New Experiment' }
      ]
    },    
    component: QCElnNewExperimentsComponent,
  },
  {
    path: 'new',
    data: {
      // title: 'ELN 2 Experiments',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'QC ELN', url: '/qcelnhome'  },
        { title: 'New Experiment' }
      ]
    },
    component: QCElnNewExperimentsComponent
  },
  {
    path: 'edit/:Id',
    data: {
      // title: 'ELN New Experiments',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'QC ELN', url: '/qcelnhome'  },
        { title: 'Edit Experiment' }
      ]
    },
    component: QCElnNewExperimentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QCElnNewExperimentsRoutingModule { }
