import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings.component';

const routes: Routes = [
  {
  path: '',
  data: {
    urls: [
      { title: 'Home', url: '/landing' },   
      { title: 'Dashboard', url: '/coa-dashboard' },     
      { title: 'User Settings' }
    ]
  },    
  component: UserSettingsComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule { }
