import { Component, OnInit, ViewChild } from '@angular/core';
import { GridLine, FilterSettingsModel, CommandModel, EditSettingsModel, CommandClickEventArgs, ToolbarItems, GroupSettingsModel } from '@syncfusion/ej2-grids';
import { ToastrService } from 'ngx-toastr';
import { ToolbarService, FilterService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ImsInwardService } from './ims-inward.service';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ims-inward',
  templateUrl: './ims-inward.component.html',
  providers: [ToolbarService, FilterService],
  styleUrls: ['./ims-inward.component.css']
})
export class ImsInwardComponent implements OnInit {
  @ViewChild('grid', { static: false }) public grid: GridComponent;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public dateValue: Date = new Date();
  public data: object[];
  public lines: GridLine;
  public toolbar: string[];
  public pageSettings: Object;
  public toolbarOptions: ToolbarItems[];
  public groupOptions: GroupSettingsModel;
  public filterOptions: FilterSettingsModel;
  public objInwardRecord: object[];
  public Dateformat: any;
  constructor(private routes: Router, private toastr: ToastrService, private _inwardService: ImsInwardService, ) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.Dateformat = { type: 'date', format: 'dd-MMM-yyyy' }
    this.GetInwardRecordList();
    this.lines = 'Both';
    this.toolbarOptions = ['ExcelExport', 'Search', 'PdfExport'];
    this.pageSettings = { pageSizes: 10 };
    this.groupOptions = { showGroupedColumn: true };
    this.editSettings = { allowEditing: true, allowDeleting: true };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
  }


  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        this.grid.excelExport();
        break;
      case 'Grid_pdfexport':
        this.grid.pdfExport();
        break;
    }
  }
  ngAfterViewInit() { }

  commandClick(args: CommandClickEventArgs): void {
    this.routes.navigate([
      "imsinward/editinward",
      args.rowData["ImsInwardRecordId"],
    ]);

    // this.editInventoryMatser(args.rowData['ImsInventoryMasterId']);
  }
  GetInwardRecordList() {
    this._inwardService.GetImsInwardRecordList().subscribe((data) => {
      this.objInwardRecord = data['Object'];
      console.log(this.objInwardRecord)
      for (var i = 0; i < this.objInwardRecord.length; i++) {
        if (this.objInwardRecord[i]["ImsInwardExpiryDate"] != null) {

          this.objInwardRecord[i]["ImsInwardExpiryDate"] = new Date(this.objInwardRecord[i]["ImsInwardExpiryDate"]);
        }
        if (this.objInwardRecord[i]["ImsInwardManufacturingDate"] != null) {
          this.objInwardRecord[i]["ImsInwardManufacturingDate"] = new Date(this.objInwardRecord[i]["ImsInwardManufacturingDate"]);
        }
      }

    });
  }

}

