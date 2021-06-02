import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QCElnUserSettingsComponent } from './qceln-user-settings.component';

const routes: Routes = [
  {

    path: '',
    data: {
      // title: 'ELN User Settings',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'QC ELN', url: '/qcelnhome'  },
        { title: 'User Settings' }
      ]
    },
    component: QCElnUserSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QCElnUserSettingsRoutingModule { }
