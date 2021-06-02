import { Component, OnInit } from '@angular/core';
import { GridLine } from '@syncfusion/ej2-grids';
import { ColumnModel, ResizeService } from '@syncfusion/ej2-angular-grids';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  providers: [ResizeService],
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  public visible: boolean = false;
  EqmsAuditDetailsForm: FormGroup;
  public data: object[];
  public lines: GridLine;
  public orderColumns: ColumnModel[];
  closeResult: string;
  public Action: Object[] = [
    { Id: 'Action1', Name: 'Justify' },
    { Id: 'Action2', Name: 'Raise Request' },
    { Id: 'Action3', Name: 'Revisit' }
  
  
  ];
  public fields: Object = { text: 'Name', value: 'Id' };
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.SetAuditDetailsFormForm();
    this.lines = 'Both';
    this.data = [
      {
        // ProposedCAPA:'Auto Populate'
      }
    ];
   

  }
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
  public text:any;
  SetAuditDetailsFormForm() {
    this.EqmsAuditDetailsForm =  this.formBuilder.group({       
      AuditEnt:['']
      });
  }
  public onChange1(args: any): void {
    this.EqmsAuditDetailsForm.patchValue({ AuditEnt : null});
      this.visible = false;
    if (args.itemData.Name === "Raise Request") {
      console.log(this.Action)
       
      this.EqmsAuditDetailsForm.patchValue({
        AuditEnt:"reason1"
      }); 
  
    this.visible = true;
  }
   
}
}
