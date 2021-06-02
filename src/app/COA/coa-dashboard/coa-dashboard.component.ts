import { Component, OnInit,ViewChild } from '@angular/core';
import {  GridLine,  GridComponent, } from "@syncfusion/ej2-angular-grids";
@Component({
  selector: 'app-coa-dashboard',
  templateUrl: './coa-dashboard.component.html',
  styleUrls: ['./coa-dashboard.component.css']
})
export class CoaDashboardComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public lines: GridLine;
  public pageSettings: Object;
  constructor() { }

  ngOnInit() {
    this.lines = "Both";
    this.pageSettings = { pageSize: 10 };
  }

}
