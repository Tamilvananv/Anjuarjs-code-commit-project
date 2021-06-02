import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportGenerationComponent } from './report-generation.component';

const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },   
        { title: 'Dashboard', url: '/coa-dashboard' },     
        { title: 'Report Generation' }
      ]
    },    
    component: ReportGenerationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportGenerationRoutingModule { }
