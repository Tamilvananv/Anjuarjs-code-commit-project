import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridLine, IEditCell, ToolbarItems, EditSettingsModel } from '@syncfusion/ej2-grids';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-raise-requisition',
  templateUrl: './raise-requisition.component.html',
  styleUrls: ['./raise-requisition.component.css']
})
export class RaiseRequisitionComponent implements OnInit {
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public dateValue: Date = new Date();
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public ddParams: IEditCell;
  public lines: GridLine;
  public data: object[];
  public visible: boolean = false;
  EqmsAuditDetailsForm: FormGroup;
  public ReasonData: Object[] = [
    { Id: 'reason6', Name: 'Internal Audits' },
    { Id: 'reason7', Name: 'External Audits' },
    { Id: 'reason8', Name: 'Others' }
];
public fields1: Object = { text: 'Name', value: 'Id' };
public DeptName: Object[] = [
  { Id: 'dept1', dept: 'HR' },
  { Id: 'dept2', dept: 'QA' },
  { Id: 'dept3', dept: 'QC' }
 
];
public fields: Object = { text: 'dept', value: 'Id' };
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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.data = [
      {
        ChooseAction:'Rework',
        Comment:'Change Occur in versions.'
      },
      {
        ChooseAction:'Rejected',
        Comment: ' Not in loop'
      },
      {
        ChooseAction:'Approved',
        Comment: ' Done'
      }
    ];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.ddParams = { params: { value: 'Rework' } };
    this.ddParams = { params: { value: 'Rejected' } };
    this.ddParams = { params: { value: 'Approved' } };
    this.lines = 'Both';
    this.SetAuditDetailsFormForm();
}
SetAuditDetailsFormForm() {
  this.EqmsAuditDetailsForm =  this.formBuilder.group({       
    AuditEnt:['']
    });
}
public onChange1(args: any): void {
  this.EqmsAuditDetailsForm.patchValue({ AuditEnt : null});
    this.visible = false;
  if (args.itemData.Name === "Others") {
    console.log(this.ReasonData)
     
    this.EqmsAuditDetailsForm.patchValue({
      AuditEnt:"reason1"
    }); 

  this.visible = true;
}
 
}

}
