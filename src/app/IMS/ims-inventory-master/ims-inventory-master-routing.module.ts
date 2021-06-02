import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImsInventoryMasterComponent } from './ims-inventory-master.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';


const routes: Routes = [
  {
  path: '',
  data: {
    // title: 'IMS Master',
    urls: [
      { title: 'Home', url: '/landing' },
      { title: 'IMS', url: '/imshome'  },
      { title: 'IMS-Inventory-Master' }
    ]
  },
  component: ImsInventoryMasterComponent
},
 {
  path: 'addinventory',
   component: AddInventoryComponent,
   data: {
   
    urls: [
      { title: 'Home', url: '/landing' },
     { title: 'IMS', url: '/imshome'  },
      { title: 'IMS-Inventory-Master', url: '/imsinventorymaster'  },
      { title: 'Add Inventory' }
   ]
   }
 },
 {
  path: 'editinventory/:id',
  component: AddInventoryComponent,
  data: {
    urls: [
      { title: 'Home', url: '/landing' },
     { title: 'IMS', url: '/imshome'  },
       { title: 'IMS-Inventory-Master', url: '/imsinventorymaster'  },
      { title: 'Edit Inventory' }
    ]
  }
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImsInventoryMasterRoutingModule { }
