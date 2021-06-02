import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviationComponent } from './deviation.component';
import { DevExtensionComponent } from './deviation-details/dev-extension/dev-extension.component';
import { RaiseRequisitionComponent } from '../capa/raise-requisition/raise-requisition.component';
import { DeviationQualityAssuranceComponent } from './deviation-quality-assurance/deviation-quality-assurance.component';
import { RaiseRequestComponent } from './raise-request/raise-request.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
         { title: 'EQMS', url: '/eqms-dashboard'  },
        { title: 'Deviation' }
      ]
    },    
    component: DeviationComponent,
  },
 
  {
    path: 'dev/:tabid',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'EQMS', url: '/eqms-dashboard' },
        { title: 'Dev' }
      ]
    },
    component: RaiseRequestComponent
  },
  {
    path: 'raisedevextension',
   
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'Deviation', url: '/deviation'  },
        { title: 'Raise Extension' }
      ]
    },
    component: DevExtensionComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviationRoutingModule { }
