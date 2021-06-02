import { Component, OnInit } from '@angular/core';
import { ExperimentDashboardService } from './service/eln-dashboard-service';

@Component({
  selector: 'app-eln-home-master',
  templateUrl: './eln-home-master.component.html',
  styleUrls: ['./eln-home-master.component.css']
})
export class ElnHomeMasterComponent implements OnInit {
  public PageAccessRight:object={};
  ExperimentCardList: object[];
  HasWriteAccess:boolean;
  constructor(
    private _ExperimentDashboardService: ExperimentDashboardService
  ) { }

  ngOnInit() {
    this._ExperimentDashboardService.getExperimentCards().subscribe((data) => {
      this.ExperimentCardList = data['Object'];
      this.HasWriteAccess =data['ExtraObject'];
    });
    this._ExperimentDashboardService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = {}//data['Object'];
    });
  }
}
