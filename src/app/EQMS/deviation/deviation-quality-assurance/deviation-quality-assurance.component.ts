import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EditSettingsModel, ToolbarItems, IEditCell, GridLine } from '@syncfusion/ej2-grids';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deviation-quality-assurance',
  templateUrl: './deviation-quality-assurance.component.html',
  styleUrls: ['./deviation-quality-assurance.component.css']
})
export class DeviationQualityAssuranceComponent implements OnInit {
  public EmpName: Object[] = [
    { Id: 'emp11', emp: 'Shruti' },
  ];
  public fields: Object = { text: 'emp', value: 'Id' };
  
  public Critical: Object[] = [
    { Id: 'Crit', crit: 'Critical' },
  ];
  public fields2: Object = { text: 'crit', value: 'Id' };
  public Status: Object[] = [
    { Id: 'Stat1', Stat: 'Rework' },
    { Id: 'Stat2', Stat: 'Approved' }
  ];
  public fields3: Object = { text: 'Stat', value: 'Id' };
  constructor(private route: ActivatedRoute, private routes: Router,) { }
  @ViewChild('sample', {static:true})
  @ViewChild('tabset', { static: false }) private tabset: NgbTabset;
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
 
  ngOnInit() {
    
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


