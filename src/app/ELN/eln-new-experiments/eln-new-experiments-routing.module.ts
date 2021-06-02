import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElnNewExperimentsComponent } from './eln-new-experiments.component';
const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'ELN New Experiments',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ELN', url: '/elnhome'  },
        { title: 'New Experiment' }
      ]
    },    
    component: ElnNewExperimentsComponent,
  },
  {
    path: 'new',
    data: {
      // title: 'ELN 2 Experiments',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ELN', url: '/elnhome'  },
        { title: 'New Experiment' }
      ]
    },
    component: ElnNewExperimentsComponent
  },
  {
    path: 'edit/:Id',
    data: {
      // title: 'ELN New Experiments',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ELN', url: '/elnhome'  },
        { title: 'Edit Experiment' }
      ]
    },
    component: ElnNewExperimentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElnNewExperimentsRoutingModule { }
