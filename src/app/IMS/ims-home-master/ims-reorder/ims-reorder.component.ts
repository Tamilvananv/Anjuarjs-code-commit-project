import { Component, OnInit } from '@angular/core';
import { GridLine, FilterSettingsModel } from '@syncfusion/ej2-grids';
import { FilterService } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-ims-reorder',
  templateUrl: './ims-reorder.component.html',
  providers:[FilterService],
  styleUrls: ['./ims-reorder.component.css']
})
export class ImsReorderComponent implements OnInit {

  constructor() { }
  public data: object[];
  public lines: GridLine;
  public filterOptions: FilterSettingsModel;
  ngOnInit(): void {
    this.data =
    [
       {
      sSrNo: '01',
         Parameter: 'Column temperature',
         NominalValue: '15°C' ,
         UpperRange: '20°C',
        LowerRange: '10°C'
       },
      // {
      //      OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
      //  ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
      //     ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
      //  }
    ];
    this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
   };
  
}

}

