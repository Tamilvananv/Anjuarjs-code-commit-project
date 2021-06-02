import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImsInwardComponent } from './ims-inward.component';
import { AddInwardComponent } from './add-inward/add-inward.component';


const routes: Routes = [
  {
  path: '',
  data: {
    // title: 'IMS Master',
    urls: [
      { title: 'Home', url: '/landing' },
      { title: 'IMS', url: '/imshome'  },
      { title: 'IMS-Inward' }
    ]
  },
  component: ImsInwardComponent
},
{
  path: 'addinward',
  component: AddInwardComponent,
  data: {
    // title: 'Add Inward',
    urls: [
      { title: 'Home', url: '/landing' },
      { title: 'IMS', url: '/imshome'  },
      { title: 'IMS-Inward', url: '/imsinward'  },
      
      { title: 'Add Inward' }
    ]
  }
},
{
  path: 'editinward/:id',
  component: AddInwardComponent,
  data: {
    urls: [
      { title: 'Home', url: '/landing' },
      { title: 'IMS', url: '/imshome'  },
      { title: 'IMS-Inward', url: '/imsinward'  },
      { title: 'Edit Inward' }
    ]
  }
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImsInwardRoutingModule { }
