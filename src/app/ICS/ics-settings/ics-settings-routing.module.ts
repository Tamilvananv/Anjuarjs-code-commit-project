import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcsUsersettingComponent } from './ics-usersetting/ics-usersetting.component';
import { IcsCustomheaderfieldComponent } from './ics-customheaderfield/ics-customheaderfield.component';
import { IcsAlertsettingsComponent } from './ics-alertsettings/ics-alertsettings.component';
import { IcsInstrumentTypeComponent } from './ics-instrument-type/ics-instrument-type.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usersetting',
        data: {
          // title: 'User Setting',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'User Setting' }
          ]
        },
        component: IcsUsersettingComponent
      },
      {
        path: 'customheaderfield',
        component: IcsCustomheaderfieldComponent,
        data: {
          // title: 'Custom Header Fields',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'ICS', url: '/icshome'  },
            { title: 'Custom Header Fields' }
          ]
        }
      },
      {
        path: 'alertsetting',
        component: IcsAlertsettingsComponent,
        data: {
          // title: 'Alert Setting',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'ICS', url: '/icshome'  },
            { title: 'Alert Setting' }
          ]
        }
      },
      {
        path: 'instrumenttype',
        component: IcsInstrumentTypeComponent,
        data: {
          // title: 'Instrument Type',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'ICS', url: '/icshome'  },
            { title: 'Instrument Type' }
          ]
        }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcsSettingsRoutingModule { }
