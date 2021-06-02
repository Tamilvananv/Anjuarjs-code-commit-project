import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentRecordsComponent } from './incident-records.component';


const routes: Routes = [{
  path: '',
  data: {
    // title: 'Incident Records',
    urls: [
      { title: 'Home', url: '/landing' },
      { title: 'Incident Records', url: '/incidentrecords'  },
    ]
  },
  component: IncidentRecordsComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRecordsRoutingModule { }
