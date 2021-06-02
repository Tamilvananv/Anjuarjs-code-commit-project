import { Component, OnInit } from '@angular/core';
import { FilterSettingsModel, IFilter, GridLine, TextWrapSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  constructor() { }
  public lines: GridLine;
public Data : object[];
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

}
