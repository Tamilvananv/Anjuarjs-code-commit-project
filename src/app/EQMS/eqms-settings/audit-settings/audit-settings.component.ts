import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GridLine } from '@syncfusion/ej2-grids';

@Component({
  selector: 'app-audit-settings',
  templateUrl: './audit-settings.component.html',
  styleUrls: ['./audit-settings.component.css']
})
export class AuditSettingsComponent implements OnInit {
  closeResult: string;
  public lines: GridLine;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.lines = 'Both';
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
