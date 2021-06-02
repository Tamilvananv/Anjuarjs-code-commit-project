import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsComponent } from './departments.component';


const routes: Routes = [
  {
    path: '',
  data: {
    // title: 'Departments',
    urls: [
      { title: 'Home', url: '/landing' },
      { title: 'User Management', url: '/usermanagement'  },
      { title: 'Departments', url: '/departments'  },
    ]
  },
  component: DepartmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
