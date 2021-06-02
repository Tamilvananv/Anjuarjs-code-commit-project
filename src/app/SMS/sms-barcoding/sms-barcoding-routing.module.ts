import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsBarcodingComponent } from './sms-barcoding.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },   
        { title: 'Dashboard', url: '/sms-dashboard' },    
        { title: 'Barcode' }
      ]
    },    
    component: SmsBarcodingComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsBarcodingRoutingModule { }
