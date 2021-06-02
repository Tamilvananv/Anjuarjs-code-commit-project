import { Component, OnInit , ViewChild} from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-deviation-priliminary',
  templateUrl: './deviation-priliminary.component.html',
  styleUrls: ['./deviation-priliminary.component.css']
})
export class DeviationPriliminaryComponent implements OnInit {
  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };
  public onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {
      console.log('File uploaded successfully');
    }
  }
  public onUploadFailure(args: any): void {
    console.log('File failed to upload');
  }
  public dropEle: HTMLElement;
  constructor() { }
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public deptlist: IEditCell;
  public action: IEditCell;
  public lines: GridLine;
  ngOnInit(): void {
   
    this.data1 = [
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        EmpList: 'Sachin',
        ChooseAction: 'Approved',
        Comments: 'Change Occur in versions.',
      },
    ];
    
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.deptlist = { params: { value: 'Shruti' } };
    this.action = { params: { value: 'Rework' } };
    this.lines = 'Both';
  }

}


