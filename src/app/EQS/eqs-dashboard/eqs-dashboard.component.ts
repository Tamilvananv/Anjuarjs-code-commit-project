import { Component, OnInit } from '@angular/core';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
@Component({
  selector: 'app-eqs-dashboard',
  templateUrl: './eqs-dashboard.component.html',
  styleUrls: ['./eqs-dashboard.component.css']
})
export class EqsDashboardComponent  {
  public items: ItemModel[] = [
    {
        text: 'Eqp1'
    },
    {
        text: 'Eqp2'
    },
    {
        text: 'Eqp3'
    }];
    public items1: ItemModel[] = [
      {
          text: 'Parameter1'
      },
      {
          text: 'Parameter2'
      },
      {
          text: 'Parameter3'
      }];

    // chart data

}
  // constructor() { }

  // ngOnInit() {
  // }


