import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElnHomeMasterComponent } from './eln-home-master.component';
import { ElnOpenExperimentsComponent } from './eln-open-experiments/eln-open-experiments.component';

const routes: Routes = [
  {

    path: '',
    data: {
      // title: 'ELN Master',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ELN', url: '/elnhome' },
        { title: 'Dashboard' }
      ]
    },
    component: ElnHomeMasterComponent
  },
  {                     
    path: 'listview/:statusid/:status',
    component: ElnOpenExperimentsComponent,
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ELN', url: '/elnhome' },
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
