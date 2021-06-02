import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintReportComponent } from './print-report.component';

const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },   
        { title: 'Dashboard', url: '/coa-dashboard' },     
        { title: 'Print Report' }
      ]
    },    
    component: PrintReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintReportRoutingModule { }
