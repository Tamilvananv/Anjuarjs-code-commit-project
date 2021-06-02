import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EqmsSettingsComponent } from './eqms-settings.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
         { title: 'EQMS', url: '/eqms-settings'  },
        { title: 'Settings' }
      ]
    },    
    component: EqmsSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EqmsSettingsRoutingModule { }
