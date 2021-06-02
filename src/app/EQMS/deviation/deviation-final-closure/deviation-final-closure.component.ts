import { Component, OnInit, ViewChild } from '@angular/core';
import { GridLine, EditSettingsModel, ToolbarItems, IEditCell } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-deviation-final-closure',
  templateUrl: './deviation-final-closure.component.html',
  styleUrls: ['./deviation-final-closure.component.css']
})
export class DeviationFinalClosureComponent implements OnInit {
  public lines: GridLine;
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public deptlist: IEditCell;
  public action: IEditCell;
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  constructor() { }

  ngOnInit() :void {
    this.lines = 'Both';
    this.data1 = [
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        EmpList: 'Shruti',
        ChooseAction: 'Approved',
        Comments: 'Change Occur in versions.',
      },
    ];
    this.deptlist = { params: { value: 'Shruti' } };
    this.action = { params: { value: 'Rework' } };
    
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }

}
