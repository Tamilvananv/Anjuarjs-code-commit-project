import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EqsCalibrationRecordMasterComponent } from './eqs-calibration-record-master.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          // title: 'EQS Calibration Record Master',
          urls: [
            { title: 'Home', url: '/landing' },
            { title: 'EQS', url: '/eqs-home'  },
            { title: ' Calibration' }
          ]
        },
        component: EqsCalibrationRecordMasterComponent
      },
      // {
      //   path: 'addequipment',
      //   component: AddEquipmentComponent,
      //   data: {
      //     title: 'AddEquipment',
      //     urls: [
      //       { title: 'Dashboard', url: '/landing' },
      //       { title: 'EQS', url: '/eqshome'  },
      //       { title: 'AddEquipment' }
      //     ]
      //   }
      // },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EqsCalibrationRecordMasterRoutingModule { }
