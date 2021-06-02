import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridLine, TextWrapSettingsModel, FilterSettingsModel, EditSettingsModel,ToolbarItems, IEditCell } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-capa-details',
  templateUrl: './capa-details.component.html',
  styleUrls: ['./capa-details.component.css']
})
export class CapaDetailsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public deptlist: IEditCell;
  public action: IEditCell;
  public deptlist1: IEditCell;
  public action1: IEditCell;
  public lines: GridLine;
  public wrapSettings: TextWrapSettingsModel;
  public filterOptions: FilterSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public dateValue: Date = new Date();
  public toolbar: ToolbarItems[];
  public editSettings: EditSettingsModel;
  public data: object[];
  public data1: object[];
  public data2: object[];
  public data3: object[];
  public Tools: Object[] = [
    { Id: 'reason1', Name: '5W1H' },
    { Id: 'reason2', Name: 'Fish Done' },
    { Id: 'reason3', Name: 'FMECA' },
    { Id: 'reason4', Name: 'Others' }
  ];

  public visible: boolean = false;
  EqmsAuditDetailsForm: FormGroup;


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
  public fields: Object = { text: 'Name', value: 'Id' };
  public height: string = '220px';
  public waterMark: string = 'Select ';
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
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder) { }
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
    this.data=[
      {
        ProposedCapa:'hi',
        CAPA:'01',
        Dept:'Facility',
        CAPAOwner:'Shruti',
        TargetDate:'01/12/2021'
      }
    ];
    this.data1 =[
      {
        Reason:'What'
      },
      {
        Reason:'Who'
      },
      {
        Reason:'Where'
      },
      {
        Reason:'When'
      },
      {
        Reason:'Why'
      },
      {
        Reason:'How'
      }
    ];
     this.SetAuditDetailsFormForm();


    this.data2 = [
      {
        Impact: 'Product',
        ChooseAction: 'Yes',
        Comments: 'Change Occur in versions.',
      },
      {
        Impact: 'Facilities',
        ChooseAction: 'No',
        Comments: 'Change Occur in versions.',
      },
      {
        Impact: 'Equipment',
        ChooseAction: 'No',
        Comments: 'Change Occur in versions.',
      },
      {
        Impact: 'System',
        ChooseAction: 'Yes',
        Comments: 'Change Occur in versions.',
      },
      {
        Impact: 'Document',
        ChooseAction: 'No',
        Comments: 'Change Occur in versions.',
      },
      {
        Impact: 'Training Needs',
        ChooseAction: 'Yes',
        Comments: 'Change Occur in versions.',
      },
      {
        Impact: 'Others',
        ChooseAction: 'No',
        Comments: 'Change Occur in versions.',
      },
    ];
    this.data3 = [
      {
        EmpList:'Shruti',
      ChooseAction: 'Approved',
      Comments: 'Change Occur in versions.',
    },
    {
      EmpList:'Siddhi',
      ChooseAction: 'Rework',
      Comments: 'Change Occur in versions.',
    }
  ];
    this.deptlist = { params: { value: 'Others' } };
    this.action = { params: { value: 'No' } };
    this.deptlist1 = { params: { value: 'Shruti' } };
    this.action1 = { params: { value: 'Approved' } };
    
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }
  public text:any;
  SetAuditDetailsFormForm() {
    this.EqmsAuditDetailsForm =  this.formBuilder.group({       
      AuditEnt:['']
      });
  }
  public onChange1(args: any): void {
    this.EqmsAuditDetailsForm.patchValue({ AuditEnt : null});
      this.visible = false;
    if (args.itemData.Name === "5W1H") {
      console.log(this.Tools)
       
      this.EqmsAuditDetailsForm.patchValue({
        AuditEnt:"reason1"
      }); 
  
    this.visible = true;
  }
   
}
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        this.grid.excelExport();
        break;
    }
  }

}
