import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QCElnHomeMasterComponent } from './qceln-home-master.component';
import { QCElnOpenExperimentsComponent } from './qceln-open-experiments/qceln-open-experiments.component';

const routes: Routes = [
  {

    path: '',
    data: {
      // title: 'ELN Master',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'QC ELN', url: '/qcelnhome' },
        { title: 'Dashboard' }
      ]
    },
    component: QCElnHomeMasterComponent
  },
  {                     
    path: 'listview/:statusid/:status',
    component: QCElnOpenExperimentsComponent,
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'QC ELN', url: '/qcelnhome' },
        { title: 'Listing Experiment' }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElnHomeMasterRoutingModule { }
