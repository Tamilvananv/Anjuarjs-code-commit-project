import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  ColumnModel, FilterService, GroupService, ToolbarService,
  EditService,
  PageService,
  CommandColumnService,
  GridComponent, ResizeService, CommandModel, GridLine
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
@Component({
  selector: 'app-audit-management',
  templateUrl: './audit-management.component.html',
  providers: [FilterService, GroupService, ToolbarService, ResizeService,
    EditService, PageService, CommandColumnService],
  styleUrls: ['./audit-management.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AuditManagementComponent implements OnInit {

  public data: Object[];
  public editSettings: Object;
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public editparams: Object;
  public pageSettings: Object;
  public commands: CommandModel[];

  public ngOnInit(): void {
    this.data = [

      {
        "OrderID": 10254,
        "CustomerID": "CHOPS",
        "OrderDate": "1996-07-11T00:00:00.000Z",
        "ShippedDate": "1996-07-23T00:00:00.000Z",
        "Freight": 22.98,
        "ShipName": "Chop-suey Chinese",
        "ShipAddress": "Hauptstr. 31",
        "ShipCity": "Bern",
        "ShipRegion": null,
        "ShipCountry": "Switzerland"
      },
      {
        "OrderID": 10264,
        "CustomerID": "CHOPS",
        "OrderDate": "1996-07-11T00:00:00.000Z",
        "ShippedDate": "1996-07-23T00:00:00.000Z",
        "Freight": 22.98,
        "ShipName": "Chop-suey Chinese",
        "ShipAddress": "Hauptstr. 31",
        "ShipCity": "Bern",
        "ShipRegion": null,
        "ShipCountry": "Switzerland"
      },

    ];
   
  
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Normal",
      allowEditOnDblClick: false
    };
    this.orderidrules = { required: true };
    this.customeridrules = { required: true };
    this.freightrules = { required: true };
    this.editparams = { params: { popupHeight: "300px" } };
    this.pageSettings = { pageCount: 5 };
    this.commands = [
      {
        type: "Edit",
        buttonOption: { iconCss: "e-icons e-edit", cssClass: "e-flat" }
      },
      {
        type: "Save",
        buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" }
      }
    ];
  }
  show: boolean = true;
  hide() {
    this.show = false;
  }
  Show() {
    this.show = true;
  }
  rowDataBound(args) {
    debugger;
    if (args.data.OrderID % 2 === 0) {
      var x = args.row.querySelector(
        ".e-rowcell.e-unboundcell .e-editbutton .e-edit"
      );
      if (x != null) {
        x.classList.add("deactivate");
      }
    }
  }








  //  @ViewChild('grid', { static: true }) public grid: GridComponent;
  //  public toolbar: string[];
  //  public lines: GridLine;
  //  constructor() { }

  //  ngOnInit(): void {
  //    this.toolbar = ['ExcelExport', 'PdfExport', 'Search'];
  //  }
  //  toolbarClick(args: ClickEventArgs): void {
  //   if (args.item.id === 'grid_excelexport') {
  //     this.grid.excelExport();
  //    }
  // }

}
