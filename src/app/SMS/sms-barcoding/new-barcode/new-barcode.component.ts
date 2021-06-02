import { Component, OnInit } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { FilterSettingsModel, IFilter, GridLine, TextWrapSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-new-barcode',
  templateUrl: './new-barcode.component.html',
  styleUrls: ['./new-barcode.component.css']
})
export class NewBarcodeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  public lines: GridLine;
  public Data : object[];
  closeResult: string;
  public NewSeriesId=1;
  public new  ="SER-1";

  public data3: { [key: string]: Object; }[] = [
    { Name: 'Select', Code: 'S' }  
  ];
  
  // maps the appropriate column to fields property
  public fields: Object = { text: 'dept', value: 'Id' };  
  // set the height of the popup element
  public height: string = '220px';
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data3, query);
  }

  public DeptName: Object[] = [
    { Id: 'dept1', dept: 'Facility' },
    { Id: 'dept2', dept: 'Regulatory' },
    { Id: 'dept3', dept: 'Manufacturing Science and Technology' },
    { Id: 'dept4', dept: 'Information Technology' },
    { Id: 'dept5', dept: 'Environment and Safety' },
    { Id: 'dept6', dept: 'Research and Development' },
    { Id: 'dept7', dept: 'Quality Control' }
];
public ParentSampleId: Object[] = [
  { Id: '1', dept: 'Mfg-001' },
  { Id: '2', dept: 'Mfg-002' },
  { Id: '3', dept: 'Mfg-003' },
  { Id: '4', dept: 'Mfg-004' }  
];
public Barcodetype: Object[] = [
  { Id: '1', dept: 'Lineae/1-D Barcode' },
  { Id: '2', dept: '2-D Barcode' }
];
public BarcodeSeries: Object[] = [
  { Id: '1', dept: 'SER-001' },
  { Id: '2', dept: 'SER-002' },
  { Id: '3', dept: 'SER-003' },
  { Id: '4', dept: 'SER-004' }
];
public SampleId: Object[] = [
  { Id: '1', dept: 'MGF-001' },
  { Id: '2', dept: 'MGF-002' },
  { Id: '3', dept: 'MGF-003' },
  { Id: '4', dept: 'MGF-004' }
];
public SampleStorage: Object[] = [
  { Id: '1', dept: 'CR_001_101' },
  { Id: '2', dept: 'STOR_001_101'},
  { Id: '3', dept: 'HOLD_001_101' },

];

  
  ngOnInit() {
    this.lines = 'Both';

    let data: Object[] = [
      {
        ParentSampleId: 'Mfg-001', SampleId: 'Mfg-001-01', BarcodeId: 1234567890, BarcodeSeries:'SER001',
        BarcodeHeader: 'DEMO', BarcodeFooter: 'ProductABC-1', SampleStorage: 'CR_001_101',
        Department: 'Operations'
      },
      {
        ParentSampleId: 'Mfg-001', SampleId: 'Mfg-001-02', BarcodeId: 1234567890, BarcodeSeries:'SER001',
        BarcodeHeader: 'QCELN003', BarcodeFooter: 'ProductABC-2', SampleStorage: 'STOR_001_101',
        Department: 'Operations'
      },
      {
        ParentSampleId: 'Mfg-001', SampleId: 'Mfg-001-03', BarcodeId: 1234567890, BarcodeSeries:'SER001',
        BarcodeHeader: 'STOR010', BarcodeFooter: 'ProductABC-3', SampleStorage: 'HOLD_001_101',
        Department: 'Operations'
      }
    ]
    this.Data = data;
  }

  
  addnewSeriesModal(content) {   
    this.modalService
      .open(content, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  GenerateNewSeries()
  {
    this.NewSeriesId =this.NewSeriesId+1;
    this.new = "SER-" + this.NewSeriesId;
  }

  Barcode(e:any)
  {   
    this.new = e.itemData.dept; 
  }
}
