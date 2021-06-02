import { Component, OnInit, ViewChild } from "@angular/core";

import {
  GridLine,
  GridComponent,
  ColumnModel,
} from "@syncfusion/ej2-angular-grids";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public lines: GridLine;
  public pageSettings: Object;
  constructor() { }

  ngOnInit() {
    this.lines = "Both";
    this.pageSettings = { pageSize: 10 };
  }

}
