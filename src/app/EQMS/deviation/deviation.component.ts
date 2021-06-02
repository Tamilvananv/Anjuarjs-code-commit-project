import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnModel, FilterService, GroupService, ToolbarService, GridLine, GridComponent, ResizeService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-deviation',
  templateUrl: './deviation.component.html',
  providers: [FilterService, GroupService, ToolbarService, ResizeService],
  styleUrls: ['./deviation.component.css']
})
export class DeviationComponent implements OnInit {

  @ViewChild('grid', { static: true }) public grid: GridComponent;
  public toolbar: string[];
  public requisitionColumns: ColumnModel[];
  public primilinaryassessmentColumns: ColumnModel[];
  public qaapprovalColumns: ColumnModel[];
  public closureColumns: ColumnModel[];
  public lines: GridLine;
  constructor() { }

  ngOnInit(): void {
    this.toolbar = ['ExcelExport', 'PdfExport', 'Search'];
    this.requisitionColumns = [
      { field: 'L1', headerText: 'Level 1', textAlign: 'Center',width: 130, },
      { field: 'L2', headerText: 'Level 2', textAlign: 'Center'  ,  width: 130,},
  ];
  this.qaapprovalColumns = [
    { field: 'Team', headerText: 'Team', textAlign: 'Center', allowGrouping: true ,     width: 130,},
    { field: 'Head', headerText: 'Head', textAlign: 'Center', allowGrouping: true,     width: 130, },
];
this.primilinaryassessmentColumns = [
  { field: 'InitiatorHead', headerText: 'Initiator Head', textAlign: 'Center', allowGrouping: true,     width: 130, },
  { field: 'CrossFunctionalHead', headerText: 'Cross Functional Lead', textAlign: 'Center', allowGrouping: true,     width: 130, },
  { field: 'QADesignee', headerText: 'QA Designee', textAlign: 'Center', allowGrouping: true,     width: 130, }
];
this.closureColumns = [
  { field: 'InitiatorHead', headerText: 'Initiator Head', textAlign: 'Center', allowGrouping: true,     width: 130, },
  { field: 'QAHead', headerText: 'QA Head', textAlign: 'Center', allowGrouping: true,     width: 130, },
  { field: 'DeviationClosed', headerText: 'Deviation Closed', textAlign: 'Center', allowGrouping: true,     width: 130, },
  { field: 'CAPAClosed', headerText: 'CAPA Closed', textAlign: 'Center', allowGrouping: true,     width: 130, }
];
  }
  toolbarClick(args: ClickEventArgs): void {
   
    if (args.item.id === 'grid_excelexport') {
      this.grid.excelExport();
    }
  }
  

}
