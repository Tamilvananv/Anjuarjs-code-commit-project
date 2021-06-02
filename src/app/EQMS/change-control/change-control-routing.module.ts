import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { data } from 'jquery';
import { title } from 'process';
import { ChangeControlComponent } from './change-control.component';
import { RaiseNewRequestComponent } from './raise-new-request/raise-new-request.component';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
         { title: 'EQMS', url: '/eqms-dashboard'  },
        { title: 'Change Control' }
      ]
    },    
    component: ChangeControlComponent,
  },
  {
    path: "raiserequest",
    component: RaiseNewRequestComponent,
    data: {
      urls: [
        { title: "Home", url: "/landing" },
        { title: 'EQMS', url: '/eqms-dashboard'  },
        { title: 'Change Control', url: '/change-control'  },
        { title: "Raise Request" },
      ],
    },
  },
  {
    path: "editrequest/:id",
    component: RaiseNewRequestComponent,
    data: {
      urls: [
        { title: "Home", url: "/landing" },
        { title: 'EQMS', url: '/eqms-dashboard'  },
        { title: 'Change Control', url: '/change-control'  },
        { title: "Edit Request" },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeControlRoutingModule { }
