import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElnUserSettingsComponent } from './eln-user-settings.component';

const routes: Routes = [
  {

    path: '',
    data: {
      // title: 'ELN User Settings',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'ELN', url: '/elnhome'  },
        { title: 'User Settings' }
      ]
    },
    component: ElnUserSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElnUserSettingsRoutingModule { }
