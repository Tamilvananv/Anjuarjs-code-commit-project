import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { GridLine } from '@syncfusion/ej2-grids';
@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css']
})
export class ReportGenerationComponent implements OnInit {
  public dateValue: Date = new Date();
  public data: object[];
  public lines: GridLine;
  applicationUrl: string = environment.apiUrl;
  constructor( private modalService: NgbModal) { }
  public Category: Object[] = [
    { Id: 'Category1', Category: 'Critical' },
    { Id: 'Category2', Category: 'Major' },
    { Id: 'Category3', Category: 'Minor' }
  
  ];
  public fields: Object = { text: 'Category', value: 'Id' };
  public Action: Object[] = [
    { Id: 'Action1', Action: 'CAPA' },
    { Id: 'Action2', Action: 'Deviation' },
    { Id: 'Action3', Action: 'CC' },
    { Id: 'Action4', Action: 'None' },
  
  ];
  public fields1: Object = { text: 'Action', value: 'Id' };
  ngOnInit() {
    this.lines = 'Both';
    this.data=[
      {

      }
    ]
  }
  PrintReport(printMoodel) {
    
    this.modalService.open(printMoodel, {
      centered: true, size: 'lg', backdrop: 'static', keyboard: false
    }).result.then(result => {
    });
  }
  AddObservation(addObservation) {
    
    this.modalService.open(addObservation, {
      centered: true, size: 'lg', backdrop: 'static', keyboard: false
    }).result.then(result => {
    });
  }

  PrintPDF() {
    var file = new Blob([], { type: 'application/pdf;base64' });
    var fileURL = window.URL.createObjectURL(file);
    window.open(fileURL, '_blank', '');
  }
  OpenModal(addModal) {
    
    this.modalService.open(addModal, {
      centered: true, size: 'lg', backdrop: 'static', keyboard: false
    }).result.then(result => {
    });
  }

}
