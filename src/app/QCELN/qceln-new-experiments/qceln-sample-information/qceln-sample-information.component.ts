import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { EditService, SortService, GridLine } from '@syncfusion/ej2-angular-grids';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonListService } from 'src/app/Shared Services etc/Services/IcsCommonService/CommonList.service';
import { elnDataService } from "../service/qcelnexperiment.data.service";
import { QCExperimentService } from "../service/qcelnexperiment.service";
import { FormBuilder } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qceln-sample-information',
  templateUrl: './qceln-sample-information.component.html',
  providers: [EditService, SortService],
  styleUrls: ['./qceln-sample-information.component.css']
})
export class QCElnSampleInformationComponent implements OnInit {
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();;
  readonly _restApi = environment.apiUrl + '/api/qcexperiment/';

  constructor(
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService,
    private data: elnDataService,
    private _commonListService: CommonListService,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private _elnExperimentService: QCExperimentService,
  ) { }

  ngOnInit(): void {
  }

  moveToTab(tabToMove) {
    this.parentTabMove.emit(tabToMove);
  }
}