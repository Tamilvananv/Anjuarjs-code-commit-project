import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnModel, FilterService, GroupService, ToolbarService, GridLine, GridComponent, ResizeService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-capa',
  templateUrl: './capa.component.html',
  providers: [FilterService, GroupService, ToolbarService, ResizeService],
  styleUrls: ['./capa.component.css']
})
export class CapaComponent implements OnInit {
  @ViewChild('tabset', { static: false }) private tabset: NgbTabset;
  private tabToMove: string = '';
  @ViewChild('grid', { static: true }) public grid: GridComponent;
  public toolbar: string[];
  public requisitionColumns: ColumnModel[];
  public extensionapprovalColumns: ColumnModel[];
  public qaapprovalColumns: ColumnModel[];
  public capaapprovalColumns: ColumnModel[];
  public closureColumns: ColumnModel[];
  public lines: GridLine;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params['tabid'] != undefined && params['tabid'] != null) {
        setTimeout(() => {
          this.tabset.select(params['tabid']);
        });
      }
    });
    this.toolbar = ['ExcelExport', 'PdfExport', 'Search'];
    this.requisitionColumns = [
      { field: 'L1', headerText: 'First Level Approval', textAlign: 'Center', width: 130 },
      { field: 'L2', headerText: 'Seocnd Level Approval', textAlign: 'Center', width: 130, },
    ];
    this.capaapprovalColumns = [
      { field: 'DeptHead', headerText: 'Department Head', textAlign: 'Center', allowGrouping: true, width: 130 }
    ];
    this.extensionapprovalColumns = [
      { field: 'Extension1', headerText: 'Extension 1', textAlign: 'Center', allowGrouping: true, width: 130 },
      { field: 'Extension2', headerText: 'Extension 2', textAlign: 'Center', allowGrouping: true, width: 130 }
    ];
    this.qaapprovalColumns = [
      { field: 'Team', headerText: 'Team', textAlign: 'Center', allowGrouping: true, width: 130 },
      { field: 'Head', headerText: 'Head', textAlign: 'Center', allowGrouping: true, width: 130, },
    ];
    this.closureColumns = [
      { field: 'InitiatorHead', headerText: 'Initiator Head', textAlign: 'Center', allowGrouping: true, width: 130 },
      { field: 'QAHead', headerText: 'QA Head', textAlign: 'Center', allowGrouping: true, width: 130 },
      { field: 'QADesignee', headerText: 'QA Designee', textAlign: 'Center', allowGrouping: true, width: 130 },
    ];

    // this.tabset.select("tab-selectbyid2");





  }
  toolbarClick(args: ClickEventArgs): void {

    if (args.item.id === 'grid_excelexport') {
      this.grid.excelExport();
    }
  }

}
