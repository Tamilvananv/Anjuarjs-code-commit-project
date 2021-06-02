import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Groups',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'User Management', url: '/usermanagement' },
        { title: 'Permissions Group ', url: '/Permission-group' },
      ]
    },
    component: GroupsComponent
  },
  {
    path: "CreatePermission",
    component: CreateGroupComponent,
    data: {
      // title: 'Create Group',
      urls: [
        { title: "Home", url: "/landing" },
        { title: "Permission", url: "/Permission-group" },
        { title: "Create Permissions" },
      ],
    },
  },
  {
    path: "EditPermission/:id",
    component: CreateGroupComponent,
    data: {
      urls: [
        { title: "Home", url: "/landing" },
        { title: "Permission", url: "/Permission-group" },
        { title: "Edit Permissions" },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
