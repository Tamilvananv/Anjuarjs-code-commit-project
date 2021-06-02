import { Component, OnInit, ViewChild } from '@angular/core';
import { GridLine, ToolbarItems, PdfExportProperties, ExcelExportProperties,EditSettingsModel, GroupSettingsModel, TextWrapSettingsModel, FilterSettingsModel, IFilter, IEditCell} from '@syncfusion/ej2-grids';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { AuditTrailService } from './service/audit-trail.service';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css'],
  providers:[NavigationPaneService, ToolbarService, DetailsViewService]
})
export class AttachmentsComponent implements OnInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;


  

  public ObjAuditTrailList: object[];
  public filterOptions: FilterSettingsModel;

  public lines: GridLine;
  public wrapSettings: TextWrapSettingsModel;
  public toolbar: ToolbarItems[];
  public groupOptions: GroupSettingsModel;
  public editSettings: EditSettingsModel;
  public deptlist: IEditCell;
  public action: IEditCell;


  closeResult: string;
  public visible: boolean = false;
  public visible1: boolean = false;
  EqmsAuditDetailsForm: FormGroup;
  constructor( private formBuilder: FormBuilder , private modalService: NgbModal, private _auditTrailService: AuditTrailService) { }
  public CheckListType: Object[] = [
    { Id: 'CheckListType1', CheckListType: 'New' },
    { Id: 'CheckListType2', CheckListType: 'Existing' },
    { Id: 'CheckListType3', CheckListType: 'Attach' },
  
  ];
  public fields: Object = { text: 'CheckListType', value: 'Id' };
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

  public listObj: DropDownListComponent;
  public data1: object[];
  public ajaxSettings: object;
    public view: string;
    public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    
  ngOnInit() {
    this.lines = 'Both';
    this.visible = false;
    this.visible1 = false;
    this.SetAuditDetailsFormForm();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Bottom' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.deptlist = { params: { value: 'Shruti' } };
    this.action = { params: { value: 'Rework' } };
    this.data1 = [
      {
        
        ChooseAction: 'Rework',
        Comments: 'Change Occur in versions.',
      },
      {
       
        ChooseAction: 'Rejected',
        Comments: 'Change Occur in versions.',
      },
    ];

    this.GetAuditTrailList();
    this.wrapSettings = { wrapMode: "Content" };
    this.filterOptions = {
      type: "CheckBox",
    };
    /* this.filter = {
      type: 'CheckBox'
    }; */
    // this.toolbar = ["ExcelExport", "Search"];//"PdfExport"
    this.groupOptions = { showGroupedColumn: true };
    this.ajaxSettings = {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
  };
 this.view = "Details";
  }
  public text:any;
  SetAuditDetailsFormForm() {
    this.EqmsAuditDetailsForm =  this.formBuilder.group({       
      CheckListType:[''],
      AuditNumber:['']
      });
  }
  public onChange1(args: any): void {
     this.EqmsAuditDetailsForm.patchValue({ CheckListType : null});
      this.visible = false;
    if (args.itemData.CheckListType === "New") {
       console.log(this.CheckListType)
       
     this.EqmsAuditDetailsForm.patchValue(
       {
      CheckListType:"CheckListType1"
      }
      ); 
      
  
    this.visible = true;
   }else if (args.itemData.CheckListType === "Attach") {
    console.log(this.CheckListType)
    
  this.EqmsAuditDetailsForm.patchValue(
    {
   CheckListType:"CheckListType3"
   }
   ); 
   

 this.visible1 = true;
}
   
}
CreateTeplateModal(content) {
   
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
AddPointModal(AddCheckPointModal) {
   
  this.modalService.open(AddCheckPointModal, {
    centered: true, size: 'sm', backdrop: 'static',
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
// AddReportModal(AddModal) {
   
//   this.modalService.open(AddModal, {
//     centered: true, size: 'lg', backdrop: 'static',
//     keyboard: false
//   }).result.then(
//     result => {
//       this.closeResult = `Closed with: ${result}`;
//     },
//     reason => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//     }
//   );
// }
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


GetAuditTrailList() {
  this._auditTrailService.GetAuditTrailList().subscribe((data) => {
    this.ObjAuditTrailList = data["Object"];
  });
}

toolbarClick(args: ClickEventArgs): void {
  switch (args.item.id) {
    case "grid_500096259_0_excelexport":
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Audit_Trail.xlsx'
    };
      this.grid.excelExport(excelExportProperties);
      break;
    case "grid_500096259_0_pdfexport":
      const pdfExportProperties: PdfExportProperties = {
        fileName: "Audit_Trail.pdf",
      };
      this.grid.pdfExport(pdfExportProperties);
      break;
  }
}

pdfHeaderQueryCellInfo(args: any): void {   
  args.cell.row.pdfGrid.repeatHeader = true;
}

}
