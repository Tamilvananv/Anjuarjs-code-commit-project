import { Component, OnInit } from '@angular/core';
import { QCExperimentDashboardService } from './service/qceln-dashboard-service';

@Component({
  selector: 'app-qceln-home-master',
  templateUrl: './qceln-home-master.component.html',
  styleUrls: ['./qceln-home-master.component.css']
})
export class QCElnHomeMasterComponent implements OnInit {
  public PageAccessRight:object={};
  ExperimentCardList: object[];
  constructor(
    private _ExperimentDashboardService: QCExperimentDashboardService
  ) { }

  ngOnInit() {
    this._ExperimentDashboardService.getExperimentCards().subscribe((data) => {
      this.ExperimentCardList = data['Object'];
    });
    this._ExperimentDashboardService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = {}//data['Object'];
    });
  }
}
