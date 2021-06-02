import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcsMaintenanceComponent } from './ics-maintenance.component';


const routes: Routes = [
  {
  path: '',
  data: {
    // title: 'Maintenance',
    urls: [
      { title: 'Home', url: '/landing' },
      { title: 'ICS', url: '/icshome'  },
      { title: 'Maintenance' }
    ]
  },
  component: IcsMaintenanceComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcsMaintenanceRoutingModule { }
