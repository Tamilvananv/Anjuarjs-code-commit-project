import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertSettingsComponent } from './alert-settings.component';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Alert Settings',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'Alert Settings', url: '/alertsettings'  },
      ]
    },
    component: AlertSettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertSettingsRoutingModule { }
