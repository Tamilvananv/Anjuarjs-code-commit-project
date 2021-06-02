import { Component, OnInit } from '@angular/core';
import { GridLine, EditSettingsModel, ToolbarItems, IEditCell } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isUndefined, isNullOrUndefined } from "util";
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  styleUrls: ['./audit-details.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class AuditDetailsComponent implements OnInit {
  public selectedDate: Date = new Date(2019, 0, 10);
  // public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
  public dateValue: Date = new Date();
  public date: Object = new Date()
  public lines: GridLine;
  public visible: boolean = false;
  public visible1: boolean = false;
  public visible2: boolean = false;
  public disableAuditdropdown: boolean = true;
  public deptname : string;
  EqmsAuditDetailsForm: FormGroup;
  public value: Date[] = [new Date('1/1/2020'), new Date('2/1/2023')];


  public DeptName: Object[] = [
    { Id: 'dept1', Name: 'Research and Development' },
    { Id: 'dept2', Name: 'Human Resource' },
    { Id: 'dept3', Name: 'Operation' },
    { Id: 'dept4', Name: 'Clinical Reseach' },
    { Id: 'dept5', Name: 'Quality Assurance' },
    { Id: 'dept6', Name: 'Quality Control' },
    { Id: 'dept7', Name: 'Finance and Admin' },
    { Id: 'dept8', Name: 'Organization Wide' },  
  ];
  public fields: Object = { text: 'Name', value: 'Id' };

  public AuditType: Object[] = [
    { Id: 'AuditType1', Name: 'One-Time' },
    { Id: 'AuditType2', Name: 'Scheduled' },
    { Id: 'AuditType3', Name: 'UnSchedule' },  
  ];
  

  public FrequencyAuditType: Object[] = [
    { Id: 'FAuditType1', FAuditType: 'Yearly' },
    { Id: 'FAuditType2', FAuditType: 'Half-Yearly' },
    { Id: 'FAuditType3', FAuditType: 'Monthly' },
  
  ];
  public fields2: Object = { text: 'FAuditType', value: 'Id' };

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }
  public listObj: DropDownListComponent;
  public data1: object[];
  public data2: object[];
  public data3: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public deptlist: IEditCell;
  public action: IEditCell;
  closeResult: string;
  ngOnInit() {
this.visible = false;
this.visible1 = false;
this.visible2 = false;

this.data3=[
  {
    ChooseAction: 'Rework',
    Comments: 'Change Occur in versions.',
  },
  {
    ChooseAction: 'Rejected',
    Comments: 'Change Occur in versions.',
  },
]
    this.data1 = [
      {
        DeptList: 'HR',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        DeptList:'Organization Wide',
        ChooseAction: 'Rejected',
        Comments: 'Change Occur in versions.',
      },
      {
        DeptList: 'Department Name',
       
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        DeptList: 'Department Name',
       
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        DeptList: 'Department Name',
       
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        DeptList: 'Department Name',
       
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        DeptList: 'Department Name',
       
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        DeptList: 'Department Name',
       
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      }
     
     
     
     
     
     
    ];
    this.data2 = [
      {
        DeptList: 'Department Name',
       
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      }
     
    ];
    
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.deptlist = { params: { value: 'Shruti' } };
    this.action = { params: { value: 'Rework' } };
    this.lines = 'Both';
    this.SetAuditDetailsFormForm();
  }
 
    public text:any;
    SetAuditDetailsFormForm() {
      this.EqmsAuditDetailsForm =  this.formBuilder.group({       
        AuditEnt:['']
        });
    }
    public onChange(args: any): void {
        // this.text=args.itemData.dept; 
        this.EqmsAuditDetailsForm.patchValue({ AuditEnt : null});
        this.visible = false;
        this.visible1 = false;
        this.disableAuditdropdown = true
        this.deptname = args.itemData.Name;
        if (args.itemData.Name === "Organization Wide") {
           console.log(this.AuditType)
          this.EqmsAuditDetailsForm.patchValue({
            AuditEnt:"AuditType2"
          }); 
 
  this.disableAuditdropdown = false
    
        this.visible = true;
       this.visible1 = true;
       this.visible2 = false;
      }

    }

   public TypeOfAuditChange(args: any): void {    
   
/* if(this.deptname === "Organization Wide")
{
  this.visible = true
}
else
{
  this.visible = false
} */


     if (args.itemData.Name === "Scheduled" && ( this.deptname  !== "Organization Wide" || isNullOrUndefined(this.deptname) )  ) {     
       this.visible1 = false;
       this.visible = true
       this.visible2 = true;
     }
     else if(args.itemData.Name === "Scheduled" && this.deptname  === "Organization Wide")
     {
      this.visible1 = true;
      this.visible = true
     this.visible2 = false;
     }
     else
     {
      this.visible1 = false;
      this.visible = false
     this.visible2 = false;
     }
     
   }
  OpenModal(content1) {
    this.modalService.open(content1, {
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
  OpenModalPreviewList(content2) {
    this.modalService.open(content2, {
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
  OpenModalPreviewList1(content3) {
    this.modalService.open(content3, {
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
