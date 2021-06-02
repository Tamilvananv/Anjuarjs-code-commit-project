import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, FilterSettingsModel, GridLine, CommandModel, GroupSettingsModel, TextWrapSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ims-dashboard',
  templateUrl: './ims-dashboard.component.html',
  styleUrls: ['./ims-dashboard.component.css']
})
export class ImsDashboardComponent implements OnInit {
  @ViewChild('grid', { static: false }) public grid: GridComponent;
  closeResult: string;
  public filterOptions: FilterSettingsModel;
  public data: object[];
  public lines: GridLine;
  public initialPage: Object;
  public commands: CommandModel[];
  ImsRecordForm: FormGroup;
  public dateValue: Date = new Date();
  constructor(private modalService: NgbModal
    , private _toastr: ToastrService, private formBuilder: FormBuilder
   ) { }
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  public PageAccessRight: object = {};
  public pageSettings: Object;

  ngOnInit() {
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
    };
    this.wrapSettings = { wrapMode: 'Content' };
    this.pageSettings = { pageSize: 10 };
    this.groupOptions = { showGroupedColumn: true };
  }
  addimsrecord(content) {
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
