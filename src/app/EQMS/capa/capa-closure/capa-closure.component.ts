import { Component, OnInit, ViewChild } from '@angular/core';
import { GridLine, IEditCell, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-capa-closure',
  templateUrl: './capa-closure.component.html',
  styleUrls: ['./capa-closure.component.css']
})
export class CapaClosureComponent implements OnInit {

 
 
  public Status1: Object[] = [
    { Id: 'Stat', Stat: 'Rejected' },
    { Id: 'Stat2', Stat: 'Approved' }
  ];
  public fields3: Object = { text: 'Stat', value: 'Id' };
  public lines: GridLine;
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public deptlist: IEditCell;
  public action: IEditCell;
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  constructor() { }
  
  ngOnInit():void {
    this.lines = 'Both';
    this.data1 = [
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        EmpList: 'Smritie',
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
