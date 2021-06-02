import { Component, OnInit, ViewChild } from '@angular/core';
import { GridLine, IEditCell, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-capa-quality-assurance',
  templateUrl: './capa-quality-assurance.component.html',
  styleUrls: ['./capa-quality-assurance.component.css']
})
export class CapaQualityAssuranceComponent implements OnInit {
  public lines: GridLine;
  constructor(private route: ActivatedRoute, private routes: Router,) { }
  @ViewChild('tabset', { static: false }) private tabset: NgbTabset;
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public deptlist: IEditCell;
  public action: IEditCell;
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public ProposedCAPAt: Object[] = [
    { Id: '1', ProposedCAPAt: 'Satisfactory' },
    { Id: '2', ProposedCAPAt: 'Non-Satisfactory' },
    
  ];
  public fields: Object = { text: 'ProposedCAPAt', value: 'Id' };
  public height: string = '220px';
  public waterMark: string = 'Satisfactory ';

  ngOnInit() {
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
  gotoDev() {
    debugger
    this.routes.navigate(['deviation/dev', 'tab5']);

  }
}
