import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridLine, FilterSettingsModel } from '@syncfusion/ej2-grids';
import { ToastrService } from 'ngx-toastr';
import { ToolbarService, FilterService } from '@syncfusion/ej2-angular-grids';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
@Component({
  selector: 'app-ims-outward',
  templateUrl: './ims-outward.component.html',
  providers:[ToolbarService, FilterService],
  styleUrls: ['./ims-outward.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImsOutwardComponent implements OnInit {

  public RequestData: { [key: string]: Object }[] = [
    {  Category: 'Show All Request ' },
    {  Category: 'Pending Against Me' }
];    
// map the groupBy field with Category column
public groupFields: Object = { groupBy: 'Category' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public groupWaterMark: string = 'Select';

  // public dateValue: Date = new Date();
  public data: object[];
  public lines: GridLine;
  public toolbar: string[];
  public editSettings: Object;
  public pageSettings: Object;
  public filterOptions: FilterSettingsModel;
  
constructor( private toastr: ToastrService) {}
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
 // tslint:disable-next-line:use-life-cycle-interface
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



//  addcloseoutwardrequest(addcloseoutwardrequestModal) {
//    this.modalService.open(addcloseoutwardrequestModal, { centered: true, size: 'lg', backdrop  : 'static',
//      keyboard  : false }).result.then(
//        result => {
//          this.closeResult = `Closed with: ${result}`;
//        },
//        reason => {
//         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//        }
//      );
//    }
//  private getDismissReason(reason: any): string {
//    if (reason === ModalDismissReasons.ESC) {
//      return 'by pressing ESC';
//    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//      return 'by clicking on a backdrop';
//    } else {
//      return `with: ${reason}`;
//    }
//  }
 ngAfterViewInit() {}

 editInward() {
  // alert('hi edit');
   this.toastr.success('Hi edit Toaster'); // msg,title,override previousToastMessage
   // console.log(this.toastr.success('Hi edit Toaster', 'dsadsadas'));
  this.toastr.warning('Deleted successfully');
  this.toastr.error('Deleted successfully');

 }
}

