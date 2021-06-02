import { Component, OnInit } from '@angular/core';
import { CommandModel, GridLine } from '@syncfusion/ej2-grids';
import { CommandColumnService, PageService, EditService } from '@syncfusion/ej2-angular-grids';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  providers: [ EditService, PageService, CommandColumnService],
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  public data: Object[];
  public editSettings: Object;
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public editparams: Object;
  public pageSettings: Object;
  public commands: CommandModel[];
  public lines: GridLine;
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
  constructor( private modalService: NgbModal) { }

  ngOnInit() {
    this.lines = 'Both';
    this.data =[{
      AddedBy:'Shruti',
      Date:'2021/01/01',
      Notes:'India'
    }];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };
    this.orderidrules = { required: true };
    this.customeridrules = { required: true };
    this.freightrules =  { required: true };
    this.editparams = { params: { popupHeight: '300px' }};
    this.pageSettings = {pageCount: 5};
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
  }
  AddNotes(addnotes) {
    
    this.modalService.open(addnotes, {
      centered: true, size: 'lg', backdrop: 'static', keyboard: false
    }).result.then(result => {
    });
  }
  AttachNotes(attachnotes) {
    
    this.modalService.open(attachnotes, {
      centered: true, size: 'sm', backdrop: 'static', keyboard: false
    }).result.then(result => {
    });
  }

}
