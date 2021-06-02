import { Component, OnInit, ViewChild } from '@angular/core';
import { GridLine, TextWrapSettingsModel, FilterSettingsModel, ToolbarItems, GridModel } from '@syncfusion/ej2-grids';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Router, ActivatedRoute } from '@angular/router';
// import { data, employeeData } from './datasource';
@Component({
  selector: 'app-deviation-details',
  templateUrl: './deviation-details.component.html',
  styleUrls: ['./deviation-details.component.css']
})
export class DeviationDetailsComponent implements OnInit {
  public pData: object[];
  @ViewChild('tabset', { static: false }) private tabset: NgbTabset;
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public lines: GridLine;
  public wrapSettings: TextWrapSettingsModel;
  public filterOptions: FilterSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public dateValue: Date = new Date();
  public data: object[];
  public Tools: Object[] = [
    { Id: 'reason1', tools: '5W1H' },
  ];
  public fields: Object = { text: 'tools', value: 'Id' };
  public DeptName: Object[] = [
    { Id: 'dept1', dept: 'Facility' },
    { Id: 'dept2', dept: 'Regulatory' },
    { Id: 'dept3', dept: 'Manufacturing Science and Technology' },
    { Id: 'dept4', dept: 'Information Technology' },
    { Id: 'dept5', dept: 'Environment and Safety' },
    { Id: 'dept6', dept: 'Research and Development' },
    { Id: 'dept7', dept: 'Quality Control' }
  ];
  public fields1: Object = { text: 'dept', value: 'Id' };
  public height: string = '220px';
  public waterMark: string = '5W1H ';
  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };
  public onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {
      console.log('File uploaded successfully');
    }
  }
  public onUploadFailure(args: any): void {
    console.log('File failed to upload');
  }
  public dropEle: HTMLElement;
  closeResult: string;
  constructor(private modalService: NgbModal, private routes: Router,
    private route: ActivatedRoute
  ) { }
  OpenModal(content) {
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static',
      keyboard: false
    }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  // OpenExtensionModal(content) {
  //   this.modalService.open(content, {
  //     centered: true, size: 'lg', backdrop: 'static',
  //     keyboard: false
  //   }).result.then(
  //     result => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     reason => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     }
  //   );
  // }
  closeModal() {
    this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit() {

    this.lines = 'Both';
    this.wrapSettings = { wrapMode: 'Content' };
    this.filterOptions = {
      type: 'Menu'
    };
    this.toolbarOptions = ['ExcelExport'];
    this.data = [
      {
        ProposedCapa: 'hi',
        CAPA: '01',
        Dept: 'Facility',
        CAPAOwner: 'Shruti',
        TargetDate: '01/12/2021'
      }
    ]

  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        this.grid.excelExport();
        break;
    }
  }
  gotoCAPA() {
    debugger
    //this.router.navigate(['/qcelnexperiments/edit', args.rowData['VersionId']]);
    this.routes.navigate(['eqmscapa/capa', 'tab2']);

  }

}
