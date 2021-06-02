import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImsOutwardComponent } from './ims-outward.component';
import { AddOutwardComponent } from './add-outward/add-outward.component';


const routes: Routes = [
  {
  
    path: '',
    data: {
      // title: 'IMS Master',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'IMS-Outward' }
      ]
    },
    component: ImsOutwardComponent
  },
 
  {
    path: 'addoutward',
    component: AddOutwardComponent,
    data: {
      // title: 'Add Outward',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'IMS-Outward', url: '/imsoutward'  },
        { title: 'Raised Outward' }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImsOutwardRoutingModule { }
