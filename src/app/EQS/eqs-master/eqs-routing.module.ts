import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EqsComponent } from "./eqs.component";
import { AddEquipmentComponent } from "./add-equipment/add-equipment.component";
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        data: {
          // title: 'EQS Main Page',
          urls: [
            { title: "Home", url: "/landing" },
            { title: 'EQS', url: '/eqs-home' },
            { title: "Equipment Master " },
          ],
        },
        component: EqsComponent,
      },
      {
        path: "addequipment",
        component: AddEquipmentComponent,
        data: {
          // title: 'AddEquipment',
          urls: [
            { title: "Home", url: "/landing" },
            { title: "EQS", url: "/eqs-home" },
            { title: "Add Equipment" },
          ],
        },
      },
      {
        path: "editequipment/:id",
        component: AddEquipmentComponent,
        data: {
          urls: [
            { title: "Home", url: "/landing" },
            { title: "EQS", url: "/eqs-home" },
            { title: "Edit Equipment" },
          ],
        },
      },
    ],

    // path: 'eqsdashboard',
    // component: EqsDashboardComponent,
    // data: {
    //   title: 'dashboard',
    //   urls: [
    //     { title: 'Dashboard', url: '/landing' },
    //     { title: 'EQS', url: '/eqshome'  },
    //     { title: 'dashboard' }
    //   ]
    // }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EQSRoutingModule { }
