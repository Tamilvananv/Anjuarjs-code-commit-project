import { Component, OnInit } from '@angular/core';
import { GridLine, FilterSettingsModel } from '@syncfusion/ej2-grids';
import { ToolbarService, FilterService } from '@syncfusion/ej2-angular-grids';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
@Component({
  selector: 'app-ims-close-request',
  templateUrl: './ims-close-request.component.html',
  providers:[ToolbarService, FilterService],
  styleUrls: ['./ims-close-request.component.css']
})
export class ImsCloseRequestComponent implements OnInit {
  public data: object[];
  public lines: GridLine;
  public toolbar: string[];
  public editSettings: Object;
  public pageSettings: Object;
  public filterOptions: FilterSettingsModel;
  closeResult: string;
constructor(private modalService: NgbModal ) {}
public items: ItemModel[] = [
  {
      text: 'User 1'
  },
  {
      text: 'User 2'
  },
  {
      text: 'User 3'
  }];
  ngOnInit(): void {
    this.data =
    [
        {
       //   SrNo: '01',
       //  InstrumentId: 'Gx121345678',
       //   InstrumentName: 'HPLC',
       //  Make: 'Thermofisher',
       //  Model: 'Ultimate 3000',
        //  Qualification:,
         // Availability: 'Yes/No',
        //  URSNoLink:,
        //  PONoLink:,
       //  DeliveryDate: '28/02/2020',
       //  ManufacturersSrNo: '6784538'

        },
        {
          
        }
     
    ];
      this.lines = 'Both';
      this.toolbar = ['Search'];
      this.pageSettings = { pageCount: 5 };
      this.filterOptions = {
       type: 'Menu'
    };
   
}
addcloseoutwardrequest(addcloseoutwardrequestModal) {
  this.modalService.open(addcloseoutwardrequestModal, { centered: true, size: 'lg', backdrop  : 'static',
    keyboard  : false }).result.then(
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
