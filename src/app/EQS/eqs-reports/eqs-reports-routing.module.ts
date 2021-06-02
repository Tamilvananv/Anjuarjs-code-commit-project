import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentHistoryComponent } from './equipment-history/equipment-history.component';
import { EqsCalibrationReportComponent } from './eqs-calibration-report/eqs-calibration-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'equipment-List',
        data: {
          // title: 'Equipment List',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'EQS', url: '/eqs-home'  },
            { title: ' List' }
          ]
        },
        component: EquipmentListComponent
      },
      {
        path: 'equipment-Usage',
       component: EquipmentHistoryComponent,
        data: {
          // title: 'Equipment Usage',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'EQS', url: '/eqs-home'  },
            { title: ' Usage' }
          ]
        }
      },
      {
        path: 'calibration-Report',
       component: EqsCalibrationReportComponent,
        data: {
          // title: 'Calibration Report',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'EQS', url: '/eqs-home'  },
            { title: 'Calibration ' }
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
export class EqsReportsRoutingModule { }
