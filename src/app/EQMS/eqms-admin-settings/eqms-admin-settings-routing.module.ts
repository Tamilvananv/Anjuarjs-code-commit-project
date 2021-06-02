import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EqmsAdminSettingsComponent } from './eqms-admin-settings.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
         { title: 'EQMS', url: '/eqms-admin-settings'  },
        { title: 'Admin Settings' }
      ]
    },    
    component: EqmsAdminSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EqmsAdminSettingsRoutingModule { }
