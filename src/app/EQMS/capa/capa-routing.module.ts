import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapaComponent } from './capa.component';
import { CapaExtensionComponent } from './capa-details/capa-extension/capa-extension.component';
import { RaiseRequisitionComponent } from './raise-requisition/raise-requisition.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'EQMS', url: '/eqms-dashboard' },
        { title: 'CAPA' }
      ]
    },
    component: CapaComponent,
  },
  {
    path: 'capa/:tabid',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'EQMS', url: '/eqms-dashboard' },
        { title: 'CAPA' }
      ]
    },
    component: CapaComponent
  },
  {
    path: 'raisecapaextension',

    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'CAPA', url: '/capa' },
        { title: 'Raise Extension' }
      ]
    },
    component: CapaExtensionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapaRoutingModule { }
