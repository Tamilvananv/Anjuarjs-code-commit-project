import { Component, OnInit, ViewChild } from "@angular/core";
import {
  GridLine,
  GridComponent,
  ColumnModel,
} from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-report-generation",
  templateUrl: "./report-generation.component.html",
  styleUrls: ["./report-generation.component.css"],
})
export class ReportGenerationComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  public lines: GridLine;
  public pageSettings: Object;
  public SpecificationColumns: ColumnModel[];
  public AppearanceColumns: ColumnModel[];
  public CellsNumberColumns: ColumnModel[];
  public CAR19Columns: ColumnModel[];
  public CD3Columns: ColumnModel[];
  public ViabilityColumns: ColumnModel[];
  public SterilityColumns: ColumnModel[];
  public EndotoxinsColumns: ColumnModel[];
  public VectorColumns: ColumnModel[];
  public RCLColumns: ColumnModel[];
  public ReportColumns: ColumnModel[];
  public Data : object[];
  constructor() {}

  ngOnInit() {


    let data: Object[] = [
      {
       SrNo:1, PatientId: 'P001', BatchId: 'B001', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
       CAR19Cells: '16.00%', CD3Cells: '90.00%', Viability: '52.00%',
       Sterility: 'Sterile', Endotoxins: '0.01', VectorCopyNumber: '0.01',RCL: 'Negative'
      },
      {
        SrNo:2, PatientId: 'P002', BatchId: 'B002', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '26.00%', CD3Cells: '96.5%', Viability: '57.00%',
        Sterility: 'Sterile', Endotoxins: '0.02', VectorCopyNumber: '0.02',RCL: 'Negative'
      },
      {
        SrNo:3, PatientId: 'P003', BatchId: 'B003', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '19.00%', CD3Cells: '97.90%', Viability: '69.00%',
        Sterility: 'Sterile', Endotoxins: '0.03', VectorCopyNumber: '0.03',RCL: 'Negative'
      },
      {
        SrNo:4, PatientId: 'P004', BatchId: 'B004', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '20.00%', CD3Cells: '98.10%', Viability: '95.00%',
        Sterility: 'Sterile', Endotoxins: '0.04', VectorCopyNumber: '0.04',RCL: 'Negative'
      },
      {
        SrNo:5, PatientId: 'P005', BatchId: 'B005', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '24.00%', CD3Cells: '98.40%', Viability: '58.00%',
        Sterility: 'Sterile', Endotoxins: '0.05', VectorCopyNumber: '0.05',RCL: 'Negative'
      },
      {
        SrNo:6, PatientId: 'P006', BatchId: 'B006', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '26.00%', CD3Cells: '87.10%', Viability: '88.00%',
        Sterility: 'Sterile', Endotoxins: '0.06', VectorCopyNumber: '0.06',RCL: 'Negative'
      },
      {
        SrNo:7, PatientId: 'P007', BatchId: 'B007', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '40.00%', CD3Cells: '97.30%', Viability: '66.00%',
        Sterility: 'Sterile', Endotoxins: '0.07', VectorCopyNumber: '0.07',RCL: 'Negative'
      },
      {
        SrNo:8, PatientId: 'P008', BatchId: 'B008', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '35.00%', CD3Cells: '98.70%', Viability: '88.00%',
        Sterility: 'Sterile', Endotoxins: '0.08', VectorCopyNumber: '0.08',RCL: 'Negative'
      },
      {
        SrNo:9, PatientId: 'P009', BatchId: 'B009', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '30.00%', CD3Cells: '69.10%', Viability: '93.00%',
        Sterility: 'Sterile', Endotoxins: '0.09', VectorCopyNumber: '0.09',RCL: 'Negative'
      },
      {
        SrNo:10, PatientId: 'P010', BatchId: 'B010', Appearance: 'Clear without clumps', CellsNumber:'123*10^6',
        CAR19Cells: '28.00%', CD3Cells: '99.70%', Viability: '76.00%',
        Sterility: 'Sterile', Endotoxins: '0.10', VectorCopyNumber: '0.10',RCL: 'Negative'
      }
    ]
    

    this.Data = data;






    this.lines = "Both";
    this.pageSettings = { pageSize: 10 };
    this.SpecificationColumns = [
      { field: "BatchId", headerText: "Batch ID", textAlign: "Center", width: 150 },
    ];

    this.AppearanceColumns = [
      { field: "Appearance", headerText: "Appearance", textAlign: "Center", width: 300 },
    ];

    this.CellsNumberColumns = [
      {
        field: 'CellsNumber',
        headerText: "Cells Number",
        textAlign: "Center",
        width: 280,
      },
    ];

    this.CAR19Columns = [
      {
        field: "CAR19Cells",
        headerText: "% CAR19+ cells",
        textAlign: "Center",
        width: 120,
      },
    ];

    this.CD3Columns = [
      {
        field: "CD3Cells",
        headerText: "% CD3+ cells",
        textAlign: "Center",
        width: 120,
      },
    ];

    this.ViabilityColumns = [
      {
        field: "Viability",
        headerText: "Viability",
        textAlign: "Center",
        width: 120,
      },
    ];

    this.SterilityColumns = [
      {
        field: "Sterility",
        headerText: "Sterility",
        textAlign: "Center",
        width: 120,
      },
    ];

    this.EndotoxinsColumns = [
      {
        field: "Endotoxins",
        headerText: "Endotoxins",
        textAlign: "Center",
        width: 120,
      },
    ];

    this.VectorColumns = [
      {
        field: "VectorCopyNumber",
        headerText: "Vector Copy Number",
        textAlign: "Center",
        width: 180,
      },
    ];

    this.RCLColumns = [
      {
        field: "RCL",
        headerText: "RCL (Replication Competent Lentivirus)",
        textAlign: "Center",
        width: 290,
      },
    ];

    this.ReportColumns = [
      {
        
        headerText: "COA  report",
        textAlign: "Center",
        width: 180,
      },
    ];
    
    
  }

  queryCellInfo(args: any): void {
    if (args.column.field === 'CAR19Cells') {
      let digit = args.data[args.column.field].slice(0, -1)    
        if (digit <= 20.00 ) {
            args.cell.bgColor = '#FF6347';
        } 
    }else if(args.column.field === 'CD3Cells')
    {
      let digit = args.data[args.column.field].slice(0, -1)    
        if (digit <= 70.00 ) {
            args.cell.bgColor = '#FF6347';
        } 
    }
    else if(args.column.field === 'Viability')
    {
      let digit = args.data[args.column.field].slice(0, -1)    
        if (digit <= 70.00 ) {
            args.cell.bgColor = '#FF6347';
        } 
    }
}

}
