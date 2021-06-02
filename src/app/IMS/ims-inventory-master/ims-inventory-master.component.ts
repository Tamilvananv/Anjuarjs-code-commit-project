import { LoginComponent } from './../../login/login.component';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GridLine, FilterSettingsModel, EditSettingsModel,ToolbarItems, CommandModel, CommandClickEventArgs, GroupSettingsModel, PdfExportProperties, ExcelExportProperties } from '@syncfusion/ej2-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ImsInventoryService } from './Service/ims-inventory.service';
import { Router } from '@angular/router';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-ims-inventory-master',
  templateUrl: './ims-inventory-master.component.html',
  providers:[ImsInventoryService],
  styleUrls: ['./ims-inventory-master.component.css']
})
export class ImsInventoryMasterComponent implements AfterViewInit {
 
  @ViewChild('grid', {static: false}) public grid: GridComponent;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public data: object[];
  public lines: GridLine;
  public filterOptions: FilterSettingsModel;
   public objImsList: object[];
   public toolbarOptions: ToolbarItems[];
   public pageSettings: Object;
   public groupOptions: GroupSettingsModel;
  //  public toolbar: String[];
constructor(private routes: Router,private toastr: ToastrService,private imsService: ImsInventoryService) { }

 ngOnInit(): void {
  
  // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
       this.lines = 'Both';
       this.filterOptions = {
        type: 'Menu'
     };
     this.toolbarOptions = [ 'ExcelExport', 'Search','PdfExport'];
     this.pageSettings = { pageSizes: 10 };
     this.groupOptions = { showGroupedColumn: true };
      this.GetInventoryMasterList();
      this.editSettings = { allowEditing: true, allowDeleting: true };
      this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
 }


 toolbarClick(args: ClickEventArgs): void {
  switch (args.item.id){
    case 'Grid_excelexport':
        this.grid.excelExport();
        break;
         case 'Grid_pdfexport':
        this.grid.pdfExport();
        break;
   }
}
 ngAfterViewInit() { }

 commandClick(args: CommandClickEventArgs): void {
  this.routes.navigate([
    "imsinventorymaster/editinventory",
    args.rowData["ImsInventoryMasterId"],
  ]);

  
}


GetInventoryMasterList() {
  this.imsService.GetImsList().subscribe((data) => {
   this.objImsList = data['Object']['InventoryMasterList'];
 });
 }
  
}

