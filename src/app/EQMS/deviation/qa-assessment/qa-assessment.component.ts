import { Component, OnInit , ViewChild} from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-qa-assessment',
  templateUrl: './qa-assessment.component.html',
  styleUrls: ['./qa-assessment.component.css']
})
export class QaAssessmentComponent implements OnInit {

  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public ddParams: IEditCell;
  public ddParams1: IEditCell;
  public deptlist: IEditCell;
  public action: IEditCell;
  public lines: GridLine;
  public fields0: Object = { text: 'dept', value: 'Id' };
  public ReasonData: Object[] = [
    { Id: 'Non-Satisfactory', reason: 'Non-Satisfactory' },
    { Id: 'Satisfactory', reason: 'Satisfactory' }
];
public fields1: Object = { text: 'reason', value: 'Id' };
  constructor() { }

  ngOnInit(): void {
   
    this.data1 = [
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        EmpList: 'Siddhi',
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
