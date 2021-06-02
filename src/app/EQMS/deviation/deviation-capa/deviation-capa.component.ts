import { Component, OnInit, ViewChild } from '@angular/core';
import { GridLine, ToolbarItems, EditSettingsModel, IEditCell } from '@syncfusion/ej2-grids';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-deviation-capa',
  templateUrl: './deviation-capa.component.html',
  styleUrls: ['./deviation-capa.component.css']
})
export class DeviationCapaComponent implements OnInit {
  public dateValue: Date = new Date();
  public lines: GridLine;
  public data: object[];
  public Status: Object[] = [
    { Id: 'dept1', Status: 'Completed ' },
    { Id: 'dept2', Status: 'Non-Completed' }
  ];
  public fields1: Object = { text: 'Status', value: 'Id' };
  public Status1: Object[] = [
    { Id: 'Stat1', Stat: 'Rework' },
    { Id: 'Stat2', Stat: 'Approved' }
  ];
  public fields3: Object = { text: 'Stat', value: 'Id' };
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
  constructor(private modalService: NgbModal) { }
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
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
  public deptlist: IEditCell;
  public action: IEditCell;
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  ngOnInit():void {
    this.data = [
      {
        ProposedCAPA:'Auto Populate'
      }
    ];
    this.lines = 'Both';
    this.data1 = [
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        EmpList: 'Siddhi',
        ChooseAction: 'Approved',
        Comments: 'Change Occur in versions.',
      },
    ];
    
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.deptlist = { params: { value: 'Shruti' } };
    this.action = { params: { value: 'Rework' } };
  }

}
