import { Component, OnInit, ViewChild } from '@angular/core';
import { TextWrapSettingsModel, GridLine, FilterSettingsModel, ToolbarItems, EditSettingsModel, IEditCell } from '@syncfusion/ej2-grids';
import { GridComponent, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-dev-extension',
  templateUrl: './dev-extension.component.html',
  providers:[ToolbarService],
  styleUrls: ['./dev-extension.component.css']
})
export class DevExtensionComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild('sample', {static:true})
  public listObj: DropDownListComponent;
 
  public data1: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public ddParams: IEditCell;
  public deptlist: IEditCell;
  public action: IEditCell;
  public lines: GridLine;
  public wrapSettings: TextWrapSettingsModel;
  public filterOptions: FilterSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public data:object[];
  closeResult: string;
  constructor(private modalService: NgbModal) { }
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

  ngOnInit() :void{
    this.lines = 'Both';
    this.wrapSettings = { wrapMode: 'Content' };
    this.filterOptions = {
      type: 'Menu'
    };
    this.toolbarOptions = ['ExcelExport'];
    this.data=[
      {

      }
    ];
    this.data1=[
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
        EmpList: 'Shruti',
        ChooseAction: 'Rejected',
        Comments: 'Change Occur in versions.',
      },
    ];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.deptlist = { params: { value: 'Shruti' } };
    this.action = { params: { value: 'Rework' } };
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        this.grid.excelExport();
        break;
    }
  }

}
