import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImsSettingsComponent } from './ims-settings.component';


const routes: Routes = [
  {
  
    path: '',
    data: {
      // title: 'IMS Master',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'IMS-Settings' }
       
      
       
        
      ]
    },
    component: ImsSettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImsSettingsRoutingModule { }
