import { Component, OnInit , ViewChild } from '@angular/core';
import { GridLine, IEditCell, ToolbarItems, EditSettingsModel } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-raise-request',
  templateUrl: './raise-request.component.html',
  styleUrls: ['./raise-request.component.css']
})
export class RaiseRequestComponent implements OnInit {
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public dateValue: Date = new Date();
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public ddParams: IEditCell;
  public lines: GridLine;
  public data: object[];
  public ReasonData: Object[] = [
    { Id: 'reason1', reason: 'Facility' },
    { Id: 'reason2', reason: 'Equipment' },
    { Id: 'reason3', reason: 'Instrument' },
    { Id: 'reason4', reason: 'Document' },
    { Id: 'reason5', reason: 'System' },
    { Id: 'reason6', reason: 'Internal Audits' },
    { Id: 'reason7', reason: 'External Audits' },
    { Id: 'reason8', reason: 'Others' }
];
public fields1: Object = { text: 'reason', value: 'Id' };
public DeptName: Object[] = [
  { Id: 'dept1', dept: 'Facility' },
  { Id: 'dept2', dept: 'Regulatory' },
  { Id: 'dept3', dept: 'Manufacturing Science and Technology' },
  { Id: 'dept4', dept: 'Information Technology' },
  { Id: 'dept5', dept: 'Environment and Safety' },
  { Id: 'dept6', dept: 'Research and Development' },
  { Id: 'dept7', dept: 'Quality Control' }
];
public fields: Object = { text: 'dept', value: 'Id' };
public EmpList: Object[] = [
  { Id: 'Emp1', EmpList: 'Shruti' },
  { Id: 'Emp2', EmpList: 'Sachin' },
];
public fields2: Object = { text: 'EmpList', value: 'Id' };
public Classification: Object[] = [
  { Id: 'C1', Classification: 'Major' },
  { Id: 'C2', Classification: 'Minor' },
  { Id: 'C3', Classification: 'Critical' }
];
public fields3: Object = { text: 'Classification', value: 'Id' };
  public height: string = '220px';
  public waterMark: string = 'Select ';
  constructor(private route: ActivatedRoute, private routes: Router,) { }
  @ViewChild('tabset', { static: false }) private tabset: NgbTabset;

  ngOnInit(): void {
    this.data = [
      {
        ChooseAction:'Rework',
        Comment:'Change Occur in versions.'
      },
      {
        ChooseAction:'Rejected',
        Comment: ' Not in loop'
      },
      {
        ChooseAction:'Approved',
        Comment: ' Done'
      }
    ];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.ddParams = { params: { value: 'Rework' } };
    this.ddParams = { params: { value: 'Rejected' } };
    this.ddParams = { params: { value: 'Approved' } };
    this.lines = 'Both';
    this.route.params.subscribe(params => {
      if (params['tabid'] != undefined && params['tabid'] != null) {
        setTimeout(() => {
          this.tabset.select(params['tabid']);
        });
      }
    });
}

}
