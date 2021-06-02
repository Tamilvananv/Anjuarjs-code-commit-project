import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { UnauthorizeComponent } from './login/unauthorize/unauthorize.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { MsalGuard } from '@azure/msal-angular';
import { UserProfileComponent } from './user-profile/user-profile.component';
export const Approutes: Routes = [
  {
    path: 'UserProfile',
    component: UserProfileComponent,
    data: {
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'Profile' }
      ]
    }
  },
  {
    path: '',  // --------------------------EQS Routes-----------------------------------
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'landing', redirectTo: '/landing', pathMatch: 'full' },
      {
        path: 'eqs-home',
        loadChildren: './EQS/eqs-master/eqs.module#EqsModule'
      },
      {
        path: 'dashboard',
        loadChildren: './EQS/eqs-dashboard/eqs-dashboard.module#EqsDashboardModule'
        // loadChildren: () => import('./EQS/eqs-dashboard/eqs-dashboard.module').then(m => m.EqsDashboardModule)
      },
      {
        path: 'eqs-qualification',
        loadChildren: './EQS/eqs-qualification/eqs-qualification.module#EqsQualificationModule'
      },
      {
        path: 'eqs-parameter',
        loadChildren: './EQS/eqs-parameter/eqs-parameter.module#EqsParameterModule'
      },
      {
        path: 'eqs-calibration',
        loadChildren: './EQS/eqs-calibration-record-master/eqs-calibration-record-master.module#EqsCalibrationRecordMasterModule'
      },
      {
        path: 'eqs-maintenance',
        loadChildren: './EQS/eqs-maintenance/eqs-maintenance.module#EqsMaintenanceModule'
      },
      {
        path: 'eqs-reports',
        loadChildren: './EQS/eqs-reports/eqs-reports.module#EqsReportsModule'
      },
      // {
      //   path: 'component',
      //   loadChildren: './component/component.module#ComponentsModule'
      // }

      {
        path: 'eqs-settings',
        loadChildren: './EQS/eqs-settings/eqs-settings.module#EqsSettingsModule'
      },

    ]
  },
  // ---------------------------------ICS Routes--------------------
  {
    path: '',
    component: FullComponent, //  IcsfullComponent
    canActivate: [AuthGuard],
    children: [
      {
        path: 'icshome',
        loadChildren: './ICS/ics-instrument-master/ics-instrument-master.module#ICSModule'
      },
      {
        path: 'ics-calibration',
        loadChildren: './ICS/ics-calibrationmaster/ics-calibrationmaster.module#IcsCalibrationmasterModule'
      },
      {
        path: 'ics-parameter',
        loadChildren: './ICS/ics-parameter/ics-parameter.module#IcsParameterModule'
      },
      {
        path: 'ics-qualification',
        loadChildren: './ICS/ics-qualification/ics-qualification.module#IcsQualificationModule'
      },
      {
        path: 'ics-maintenance',
        loadChildren: './ICS/ics-maintenance/ics-maintenance.module#IcsMaintenanceModule'
      },
      {
        path: 'ics-reports',
        loadChildren: './ICS/ics-reports/ics-reports.module#IcsReportsModule'
      },
      {
        path: 'ics-settings',
        loadChildren: './ICS/ics-settings/ics-settings.module#IcsSettingsModule'
      },

    ]
  },

  // ***********************ELN Routes**************************

  {
    path: '',
    component: FullComponent, // FullComponent ElnfullComponent
    canActivate: [AuthGuard],
    children: [
      {
        path: 'elnhome',
        loadChildren: './ELN/eln-home-master/eln-home-master.module#ElnHomeMasterModule'
      },
      {
        path: 'elnexperiments',
        loadChildren: './ELN/eln-new-experiments/eln-new-experiments.module#ElnNewExperimentsModule'
      },
      {
        path: 'elnnusersettings',
        loadChildren: './ELN/eln-user-settings/eln-user-settings.module#ElnUserSettingsModule'
      },
      {
        path: 'elnexperimentreport',
        loadChildren: './ELN/eln-reports/eln-reports.module#ElnReportsModule'
      },
    ]
  },
  // ***********************QC ELN Routes**************************

  {
    path: '',
    component: FullComponent, // FullComponent ElnfullComponent
    canActivate: [AuthGuard],
    children: [
      {
        path: 'qcelnhome',
        loadChildren: './QCELN/qceln-home-master/qceln-home-master.module#QCElnHomeMasterModule'
      },
      {
        path: 'qcelnexperiments',
        loadChildren: './QCELN/qceln-new-experiments/qceln-new-experiments.module#QCElnNewExperimentsModule'
      },
      {
        path: 'qcelnnusersettings',
        loadChildren: './QCELN/qceln-user-settings/qceln-user-settings.module#QCElnUserSettingsModule'
      },
    ]
  },
  // ***********************IMS Routes**************************
  {
    path: '',
    component: FullComponent, //  ImsfullComponent
    canActivate: [AuthGuard],
    children: [
      {
        path: 'imshome',
        loadChildren: './IMS/ims-home-master/ims-home-master.module#ImsHomeMasterModule'
      },
      {
        path: 'imsinventorymaster',
        loadChildren: './IMS/ims-inventory-master/ims-inventory-master.module#ImsInventoryMasterModule'
      },
      {
        path: 'imsinward',
        loadChildren: './IMS/ims-inward/ims-inward.module#ImsInwardModule'
      },
      {
        path: 'imsoutward',
        loadChildren: './IMS/ims-outward/ims-outward.module#ImsOutwardModule'
      },
      {
        path: 'imsreports',
        loadChildren: './IMS/ims-reports/ims-reports.module#ImsReportsModule'
      },
      {
        path: 'imssettings',
        loadChildren: './IMS/ims-settings/ims-settings.module#ImsSettingsModule'
      }
    ]
  },
  // ***********************ADMINISTRATION Routes**************************

  {
    path: '',
    component: FullComponent, //  AdministrationfullComponent
    canActivate: [AuthGuard],
    children: [
      {
        path: 'usermanagement',
        loadChildren: './ADMINISTRATION/user-management/user-management.module#UserManagementModule'
      },
      {
        path: 'Permission-group',
        loadChildren: './ADMINISTRATION/groups/groups.module#GroupsModule'
      },
      {
        path: 'departments',
        loadChildren: './ADMINISTRATION/departments/departments.module#DepartmentsModule'
      },
      {
        path: 'alertsettings',
        loadChildren: './ADMINISTRATION/alert-settings/alert-settings.module#AlertSettingsModule'
      },
      {
        path: 'audittrail',
        loadChildren: './ADMINISTRATION/audit-trail/audit-trail.module#AuditTrailModule'
      },
      {
        path: 'incidentrecords',
        loadChildren: './ADMINISTRATION/incident-records/incident-records.module#IncidentRecordsModule'
      }

    ]
  },
  // ***********************COA Routes**************************
  {
    path: '',
    component: FullComponent, //  COA Full Component
    canActivate: [AuthGuard],
    children: [
      {
        path: 'coa-dashboard',
        loadChildren: './COA/coa-dashboard/coa-dashboard.module#CoaDashboardModule'
      },
      {
        path: 'report-generation',
        loadChildren: './COA/report-generation/report-generation.module#ReportGenerationModule'
      },
      {
        path: 'print-report',
        loadChildren: './COA/print-report/print-report.module#PrintReportModule'
      },
      {
        path: 'user-settings',
        loadChildren: './COA/user-settings/user-settings.module#UserSettingsModule'
      }

    ]
  },

  {
    path: '',
    component: FullComponent, //  EQMS Full Component
    canActivate: [AuthGuard],
    children: [
      {
        path: 'eqms-dashboard',
        loadChildren: './EQMS/eqms-dashboard/eqms-dashboard.module#EqmsDashboardModule'
      },
      {
        path: 'change-control',
        loadChildren: './EQMS/change-control/change-control.module#ChangeControlModule'
      },
      {
        path: 'deviation',
        loadChildren: './EQMS/deviation/deviation.module#DeviationModule'
      },
      {
        path: 'eqmscapa',
        loadChildren: './EQMS/capa/capa.module#CapaModule'
      },
      {
        path: 'audit',
        loadChildren: './EQMS/audit-management/audit-management.module#AuditManagementModule'
      },
      {
        path: 'eqms-settings',
        loadChildren: './EQMS/eqms-settings/eqms-settings.module#EqmsSettingsModule'
      },
      {
        path: 'eqms-admin-settings',
        loadChildren: './EQMS/eqms-admin-settings/eqms-admin-settings.module#EqmsAdminSettingsModule'
      },


    ]
  },
  {
    path: 'changelog',
    component: ChangelogComponent,
  },
  {
    path: 'unauthorize',
    component: UnauthorizeComponent,
  },
  // ***********************SMS Routes**************************
  {
    path: '',
    component: FullComponent, //  SMS Full Component
    canActivate: [AuthGuard],
    children: [
      {
        path: 'sms-dashboard',
        loadChildren: './SMS/sms-dashboard/sms-dashboard.module#SmsDashboardModule'
      },
      {
        path: 'sms-barcoding',
        loadChildren: './SMS/sms-barcoding/sms-barcoding.module#SmsBarcodingModule'
      },

    ]
  },
  // ***********************IMSPRODUCT Routes**************************
  {
    path: '',
    component: FullComponent, //  IMS Full Component
    canActivate: [AuthGuard],
    children: [
      {
        path: 'ims-dashboard',
        loadChildren: './IMSPRODUCT/ims-dashboard/ims-dashboard.module#ImsDashboardModule'
      },


    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  } 
];
