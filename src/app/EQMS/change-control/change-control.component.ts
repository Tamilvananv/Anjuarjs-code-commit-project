import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnModel, FilterService, GroupService, ToolbarService, GridLine, CommandClickEventArgs, GridComponent, ResizeService, CommandModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ServiceService } from './service.service';
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-change-control',
  templateUrl: './change-control.component.html',
  providers: [FilterService, GroupService, ToolbarService, ResizeService],
  styleUrls: ['./change-control.component.css']
})
export class ChangeControlComponent implements OnInit {
  @ViewChild('grid', { static: true }) public grid: GridComponent;
  public toolbar: string[];
  public requisitionColumns: ColumnModel[];
  public impactassessmentColumns: ColumnModel[];
  public qaapprovalColumns: ColumnModel[];
  public closureColumns: ColumnModel[];
  public lines: GridLine;
  public ObjChangeControlList: object;
  public commands: CommandModel[];
  
  constructor( private _EqmsChangeControl: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.load();
    this.toolbar = ['ExcelExport', 'PdfExport', 'Search'];
    this.commands = [
      {
        type: "Edit",
        buttonOption: { iconCss: "fa fa-edit", cssClass: "e-flat" },
      },
    ];
    this.requisitionColumns = [
      { field: 'L1', headerText: 'Level 1', textAlign: 'Center',width: 130, },
      { field: 'L2', headerText: 'Level 2', textAlign: 'Center'  ,  width: 130,},
  ];
  this.qaapprovalColumns = [
    { field: 'Team', headerText: 'Team', textAlign: 'Center', allowGrouping: true ,     width: 130,},
    { field: 'Head', headerText: 'Head', textAlign: 'Center', allowGrouping: true,     width: 130, },
];
this.impactassessmentColumns = [
  { field: 'InitiatorHead', headerText: 'Initiator Head', textAlign: 'Center', allowGrouping: true,     width: 130, },
  { field: 'CrossFunctionalHead', headerText: 'Cross Functional Lead', textAlign: 'Center', allowGrouping: true,     width: 130, },
  { field: 'FunctionalHead', headerText: 'Functional Head', textAlign: 'Center', allowGrouping: true,     width: 130, }
];
this.closureColumns = [
  { field: 'FunctionalHead', headerText: 'Functional Head', textAlign: 'Center', allowGrouping: true,     width: 130, },
  { field: 'QAHead', headerText: 'QA Head', textAlign: 'Center', allowGrouping: true,     width: 130, },
];
  }
  ngAfterViewInit() { }
  load() {
    this.GetChangeControlList();
    
  }

  GetChangeControlList() {
    this._EqmsChangeControl.GetChangeControlList().subscribe((data) => {
      this.ObjChangeControlList = data['Object'];
      console.log(data['Object']);
    });
  }
  toolbarClick(args: ClickEventArgs): void {
   
    if (args.item.id === 'grid_excelexport') {
      this.grid.excelExport();
    }

    //Suvinay For Edit Request
  }
  commandClick(args: CommandClickEventArgs): void {
    debugger;
    this._EqmsChangeControl.setOptionEditRow(args.rowData["EqmsCcChangeControlNumberId"]);
    this.router.navigate(['/change-control/editrequest/',
    args.rowData["EqmsCcChangeControlNumberId"],
    
  ]);
    
    }
  }

