import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { AddUserComponent } from './add-user/add-user.component';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'User Management',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'User Management', url: '/usermanagement'  },
        // { title: 'User Management' }
      ]
    },
    component: UserManagementComponent
  },
  {
    path: "adduser",
    component: AddUserComponent,
    data: {
      // title: 'Add User',
      urls: [
        { title: "Home", url: "/landing" },
        { title: 'User Management', url: '/usermanagement'  },
        { title: "Add User" },
      ],
    },
  },
  {
    path: 'edituser/:id',
    component: AddUserComponent,
    data: {
      urls: [
        { title: "Home", url: "/landing" },
        { title: 'User Management', url: '/usermanagement'  },
        { title: "Edit User" },
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
