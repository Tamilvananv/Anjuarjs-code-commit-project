import { Component, OnInit } from '@angular/core';
import { GridLine, FilterSettingsModel } from '@syncfusion/ej2-grids';
import { FilterService } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-ims-pending-approval',
  templateUrl: './ims-pending-approval.component.html',
  providers:[FilterService],
  styleUrls: ['./ims-pending-approval.component.css']
})
export class ImsPendingApprovalComponent implements OnInit {

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
     
    ];
    this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
   };
  
}

}

