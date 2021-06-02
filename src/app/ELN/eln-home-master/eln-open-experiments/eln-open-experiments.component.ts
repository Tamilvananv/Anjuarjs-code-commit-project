import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GridLine, FilterService, FilterSettingsModel, GroupSettings, ColumnModel, EditSettingsModel,
  DetailRowService, ActionEventArgs, ToolbarService, CommandModel, CommandClickEventArgs, GroupService, GridComponent, ExcelExportProperties, IFilter, SearchSettingsModel
} from '@syncfusion/ej2-angular-grids';
import { ExperimentDashboardService } from '../service/eln-dashboard-service';
import { SearchEnt, gridActionEnum } from '../service/eln-dashboard-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
@Component({
  selector: 'app-eln-open-experiments',
  templateUrl: './eln-open-experiments.component.html',
  providers: [FilterService, DetailRowService, GroupService, ToolbarService],
  styleUrls: ['./eln-open-experiments.component.css'],
})
export class ElnOpenExperimentsComponent implements OnInit {
  @ViewChild('grid', { static: true }) public grid: GridComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _ExperimentDashboardService: ExperimentDashboardService,
  ) { }
  public lines: GridLine;
  public statusColumns: ColumnModel[];
  public searchSettings: SearchSettingsModel;
  public filterOptions: FilterSettingsModel;
  public toolbar: string[];
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  groupOptions: object;
  formatOptions: object;
  gridAction: gridActionEnum = gridActionEnum.paging;
  ExperimentList: any[];
  VersionList: any[];
  pageSettings: any;
  public filter: IFilter;
  searchObj: SearchEnt;
  public witnessColumns: ColumnModel[];
  public reviewerColumns: ColumnModel[];
  public approverColumns: ColumnModel[];
  ngOnInit(): void {
    this.editSettings = { allowEditing: false, allowAdding: true };
    this.groupOptions = {
      showDropArea: true, showUngroupButton: true, columns: ['UserExperimentNo']
    };
    this.filterOptions = { type: 'Menu' };
    this.formatOptions = { type: 'dateTime', skeleton: 'short' };
    this.toolbar = ['Expand', 'Collapse', 'Search', 'ExcelExport'];
    this.commands = [{ buttonOption: { iconCss: 'fa' } }];
    this.witnessColumns = [{ field: 'WitnessObj.FullName', headerText: 'Name', textAlign: 'Center', allowGrouping: true },
    { field: 'WitnessObj.SignatureOnDate', headerText: 'Approval Date', type: 'date', enableGroupByFormat: true, format: 'dd-MMM-yyyy', textAlign: 'Center', allowGrouping: true }];
    this.reviewerColumns = [{ field: 'ReviewerObj.FullName', headerText: 'Name', textAlign: 'Center', allowGrouping: true },
    { field: 'ReviewerObj.SignatureOnDate', headerText: 'Approval Date', type: 'date', enableGroupByFormat: true, format: 'dd-MMM-yyyy', textAlign: 'Center', allowGrouping: true }];
    this.approverColumns = [{ field: 'ApproverObj.FullName', headerText: 'Name', textAlign: 'Center', allowGrouping: true },
    { field: 'ApproverObj.SignatureOnDate', headerText: 'Approval Date', type: 'date', enableGroupByFormat: true, format: 'dd-MMM-yyyy', textAlign: 'Center', allowGrouping: true }];
    this.pageSettings = { pageSizes: true, pageSize: 5 };
    this.route.params.subscribe(params => {
      this.searchObj = {
        PageSize: this.pageSettings.pageSize, PageNumber: 1,
        StatusId: params['statusid']
      };
      this.route.data['value'].urls[2].title = params['status'] + ' Experiments';
    });
    this.getMasterList();
  }

  toolbarClick(args: ClickEventArgs): void {
    const target: HTMLElement = (args.originalEvent.target as HTMLElement).closest('button'); // find clicked button
    if (args.item.id === 'grid_Collapse') { // Grid_Collapse is control id + '_' + toolbar value.
      this.collapseAll();
    }
    else if (args.item.id === 'grid_Expand') {
      this.expandAll();
    }
    else if (args.item.id === 'grid_excelexport') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: "ELN_Experiments.xlsx",
      };
      this.grid.excelExport(excelExportProperties);
    }
  }

  commandClick(args: CommandClickEventArgs): void {
    this.router.navigate(['/elnexperiments/edit', args.rowData['VersionId']]);
  }

  collapseAll() {
    this.grid.groupModule.collapseAll();
    this.grid.toolbarModule.enableItems(['grid_Expand'], true);
    this.grid.toolbarModule.enableItems(['grid_Collapse'], false);
  }

  expandAll() {
    this.grid.groupModule.expandAll();
    this.grid.toolbarModule.enableItems(['grid_Collapse'], true);
    this.grid.toolbarModule.enableItems(['grid_Expand'], false);
  }

  actionBegin(args) {
    if (args.requestType == gridActionEnum[gridActionEnum.paging]) {
      this.searchObj.PageNumber = this.grid.pagerModule.pagerObj.currentPage;          //Fetch the current Page  
      this.getMasterList();
    }
  }

  rowDataBound(e) {
    if (e.data.IsApprovalPending || e.data.IsAllowEdit) {
      e.row.querySelector(".e-btn-icon").classList.add("fa-pencil-alt");
      e.row.querySelector(".e-icon-btn").title = "Edit";
    } else {
      e.row.querySelector(".e-btn-icon").classList.add("fa-eye");
      e.row.querySelector(".e-icon-btn").title = "View";
    }
  }

  getMasterList() {
    this._ExperimentDashboardService.getExperimentMasterList(this.searchObj).subscribe((data) => {
      this.ExperimentList = data['Object'];
      this.ExperimentList.forEach(function (item) {
        item.CreatedDate = new Date(item.CreatedDate);
        item.ExperimentDate = new Date(item.ExperimentDate);
        if (item.ApproverObj != null && item.ApproverObj.SignatureOnDate != null) {
          item.ApproverObj.SignatureOnDate = new Date(item.ApproverObj.SignatureOnDate);
        }
        if (item.ReviewerObj != null && item.ReviewerObj.SignatureOnDate != null) {
          item.ReviewerObj.SignatureOnDate = new Date(item.ReviewerObj.SignatureOnDate);
        }
        if (item.WitnessObj != null && item.WitnessObj.SignatureOnDate != null) {
          item.WitnessObj.SignatureOnDate = new Date(item.WitnessObj.SignatureOnDate);
        }
      });
      this.collapseAll();
    });
  }
}