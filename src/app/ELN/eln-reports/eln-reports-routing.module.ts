import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElnExperimentReportComponent } from './eln-experiment-report/eln-experiment-report.component';

const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'ELN User Settings',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ELN', url: '/elnhome'  },
        { title: 'Experiment Reports' }
      ]
    },
    component: ElnExperimentReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElnReportsRoutingModule { }