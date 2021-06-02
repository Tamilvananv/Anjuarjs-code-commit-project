import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImsHomeMasterComponent } from './ims-home-master.component';
import { ImsStockComponent } from './ims-stock/ims-stock.component';
import { ImsMaterialNearingExpiryComponent } from './ims-material-nearing-expiry/ims-material-nearing-expiry.component';
import { ImsReorderComponent } from './ims-reorder/ims-reorder.component';
import { ImsPendingApprovalComponent } from './ims-pending-approval/ims-pending-approval.component';
import { ImsCloseRequestComponent } from './ims-close-request/ims-close-request.component';


const routes: Routes = [
  {
  
    path: '',
    data: {
      // title: 'IMS Master',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS-Home' }
      ]
    },
    component: ImsHomeMasterComponent
  },
  {
    path: 'imsstock',
    component: ImsStockComponent,
    data: {
      // title: 'Stock',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'Stock' }
      ]
    }
  },
  
  {
    path: 'imsmaterialnearingexpiry',
    component: ImsMaterialNearingExpiryComponent,
    data: {
      // title: 'Material Nearing Expiry',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'Material Nearing Expiry' }
      ]
    }
  },
  {
    path: 'imsreorder',
    component: ImsReorderComponent,
    data: {
      // title: 'Rorder',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'Reorder' }
      ]
    }
  },
  {
    path: 'imspendingapproval',
    component: ImsPendingApprovalComponent,
    data: {
      // title: 'Pending Approval',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'Pending Approval' }
      ]
    }
  },
  {
    path: 'imscloserequest',
    component: ImsCloseRequestComponent,
    data: {
      // title: 'Pending Approval',
      urls: [
        { title: 'Home', url: '/landing' },
        { title: 'IMS', url: '/imshome'  },
        { title: 'Close Request' }
      ]
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImsHomeMasterRoutingModule { }
