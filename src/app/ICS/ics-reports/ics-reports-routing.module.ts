import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstrumentListComponent } from './instrument-list/instrument-list.component';
import { InstrumentHistoryComponent } from './instrument-history/instrument-history.component';
import { CalibrationReportComponent } from './calibration-report/calibration-report.component';
import { UsageReportComponent } from './usage-report/usage-report.component';
// import { IcsReportsComponent } from './ics-reports/ics-reports.component';



const routes: Routes = [


  {
    path: '',
    children: [
      {
        path: 'instrumentsList',
        data: {
          // title: 'Instrument List',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'ICS', url: '/icshome'  },
            { title: ' List' }
          ]
        },
        component: InstrumentListComponent
      },
      {
        path: 'instrument-Usage',
        component: InstrumentHistoryComponent,
        data: {
          // title: 'instrumentsHistory',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'ICS', url: '/icshome'  },
            { title: ' Usage' }
          ]
        }
      },
      {
        path: 'calibrationReport',
        component: CalibrationReportComponent,
        data: {
          // title: 'calibrationReport',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'ICS', url: '/icshome'  },
            { title: 'Calibration ' }
          ]
        }
      },
    /*   {
        path: 'usagereport',
        component: UsageReportComponent,
        data: {
          // title: 'Usage Report',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'ICS', url: '/icshome'  },
            { title: 'Usage ' }
          ]
        }
      }, */
    ],
  },
];
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcsReportsRoutingModule { }
