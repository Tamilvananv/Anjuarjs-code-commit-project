import { Component, OnInit } from '@angular/core';
import { FilterSettingsModel, IFilter, GridLine, TextWrapSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() { }
  public lines: GridLine;
public Data : object[];
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
