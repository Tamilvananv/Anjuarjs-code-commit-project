import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, ToolbarItems, EditService, SortService, GridLine, FilterService, FilterSettingsModel, PageSettingsModel, PageService, CommandModel, CommandClickEventArgs, GroupSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { ImsSettingsService } from './service/ims-settings.service';
import { ImsStorageLocation } from './service/ims-storage-location.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImsVendor } from './service/ims-vendor-master.model';
import { ImsManufacturer } from './service/ims-manufacturer.model';
import { ImsInventoryCategory } from './service/ims-inventory-category.model';
import { ImsInventorySubCategory } from './service/ims-inventory-sub-category.model';
import { ImsCategoryMaterial } from './service/ims-category-material.model';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
@Component({
  selector: 'app-ims-settings',
  templateUrl: './ims-settings.component.html',
  providers: [EditService, SortService, FilterService, PageService],
  styleUrls: ['./ims-settings.component.css'],

})
export class ImsSettingsComponent implements OnInit {
  constructor(private modalService: NgbModal, private settingService: ImsSettingsService, private _toastr: ToastrService,
    private formErrorDisplay: FormErrorDisplayService, private formBuilder: FormBuilder) { }
  public lines: GridLine;
  public filterOptions: FilterSettingsModel;
  public pageSettings: PageSettingsModel;
  closeResult: string;
  public objStorageLocList: object[];
  ImsStorageLocationForm: FormGroup;
  ImsVendorForm: FormGroup;
  public objVendorList: object[];
  ImsManufacturerForm: FormGroup;
  public objManufacturerList: object[];
  ImsInventoryCategoryForm: FormGroup;
  public objInventoryCategoryType: Object[];
  InventorySubCategoryTabForm: FormGroup;
  public objInventorySubCategoryType: Object[];
  ImsCategoryMaterialForm: FormGroup;
  public objImsCategoryMaterial: Object[];
  public ObjInvMatList: Object;
  public commands: CommandModel[];
  public groupOptions: GroupSettingsModel;
  @ViewChild('addstoragelocationModal', { static: false }) StorageLocationModal;
  @ViewChild('addmfgmasterModal', { static: false }) ManufacturerModal;
  @ViewChild('addvendormasterModal', { static: false }) VendorModal;
  StorageLocationEdit = false;
  ManufacturerEdit = false;
  VendorEdit = false;

 
  public fields: Object = { text: 'Name', value: 'Id' };
  public height: string = '220px';
  public watermark: string = 'Select';
  public watermark1: string = 'Select Type';
  
  ngOnInit(): void {
    this.SetForm();
    this.GetStorageLocationList();
    this.GetManufacturerList();
    this.GetVendorMaterList();
    this.GetInventoryCategoryList();
    this.GetInvMaterialList();
    this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
    };
    this.pageSettings = { pageSize: 6 };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.groupOptions = {
       showGroupedColumn: true,
      showDropArea: true,
       showUngroupButton: true,
      columns: ["ImsInventoryCategoryName"],
    };

  }
 

  GetInvMaterialList() {
    this.settingService.GetInvMatList().subscribe((data) => {
      this.ObjInvMatList = data['Object'];
      console.log("List :", this.ObjInvMatList)
    });
  }
  SetForm() {
    this.ImsStorageLocationForm = this.formBuilder.group({
      ImsStorageLocationId: null,
      ImsStorageLocationName: [''],
      ImsStorageLocationDescription: [''],
      ImsStorageTemperatureMinValue: [''],
      ImsStorageTemperatureMaxValue: [''],
      ImsStorageTemperatureUnit: ['']

    });

    this.ImsVendorForm = this.formBuilder.group({
      ImsVendorMasterId: null,
      ImsVendorName: [''],
      ImsVendorAddress: [''],
      ImsVendorContactNumber: ['']
    });
    this.ImsManufacturerForm = this.formBuilder.group({
      ImsManufacturerId: null,
      ImsManufacturerName: [''],
      ImsManufacturerAddress: [''],
      ImsManufacturerContact: [''],
    });
    this.ImsInventoryCategoryForm = this.formBuilder.group({
      ImsInventorycategoryId: null,
      ImsInventoryCategoryName: [''],
    });
    this.InventorySubCategoryTabForm = this.formBuilder.group({
      ImsInventorySubcategoryId: null,
      ImsInventoryCategoryId: null,
      ImsInventorySubcategoryName: [''],
    });

    this.ImsCategoryMaterialForm = this.formBuilder.group({
      ImsInventoryCategoryMaterialId: null,
      ImsInventoryCategoryId: null,
      ImsInventorySubcategoryId: null,
      ImsInventoryMaterialName: [''],
      ImsInventoryMaterialDescription: [''],


    });
  }

 
  resetForm() {
    this.ImsStorageLocationForm.reset();
    this.ImsVendorForm.reset();
    this.ImsManufacturerForm.reset();
    this.ImsVendorForm.reset();
    this.InventorySubCategoryTabForm.reset();
  }
  CloseModal() {
    this.modalService.dismissAll();
  }
 
  GetStorageLocationList() {
    this.settingService.GetImsStorageLocationList().subscribe((data) => {
      this.objStorageLocList = data['Object'];
      
    });
  }
  addStorageLocation() {
    if (this.ImsStorageLocationForm.valid) {
      const ValidateRes = this.settingService.ValidateRange(this.ImsStorageLocationForm.value);
      if (ValidateRes) {
        this.settingService.addStorageLocation(this.ImsStorageLocationForm.value).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetStorageLocationList();
            this.CloseModal();
            this.resetForm();
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      } else {
        return false;
      }
    }
    else {
      this.formErrorDisplay.showErrors(this.ImsStorageLocationForm);
    }


  }


  GetVendorMaterList() {
    this.settingService.GetVendorList().subscribe((data) => {
      this.objVendorList = data['Object']['ImsVendorMasterList'];
    });
  }
  SaveVendor() {
    if (this.ImsVendorForm.valid) {
      this.settingService.SaveVendor(this.ImsVendorForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetVendorMaterList();
          this.CloseModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.ImsVendorForm);
    }
  
  }

  GetManufacturerList() {
    this.settingService.GetManufacturerList().subscribe((data) => {
      this.objManufacturerList = data['Object']['ImsManufacturerList'];
    });
  }

  SaveManufacturer() {
    if (this.ImsManufacturerForm.valid) {
      this.settingService.SaveManufacturer(this.ImsManufacturerForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetManufacturerList();
          this.CloseModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.ImsManufacturerForm);
    }
  
  }
  addInventoryCategory() {
    {
      this.settingService.SaveInventoryCategory(this.ImsInventoryCategoryForm.value).subscribe(res => {
        this._toastr.success(res['ResultMessage']);
        this.GetInventoryCategoryList();
      });
    }

  }

  GetInventoryCategoryList() {
    this.settingService.GetCategoryNameList().subscribe((data) => {
      this.objInventoryCategoryType = data['Object']['ImsCategoryNameList'];
    });
  }

  loadSubCategory(args) {

    let ImsInventorycategoryId = args.value;
    this.settingService.GetSubCategoryNameList1(ImsInventorycategoryId).subscribe((data) => {
      this.objInventorySubCategoryType = data['Object']['ImsSubCategoryNameList'];
    });
  }

  loadMaterial(args) {
    debugger;
    console.log(args.value);
    let ImsInventorySubcategoryId = args.value;
    this.settingService.GetCategoryMaterialList(ImsInventorySubcategoryId).subscribe((data) => {
      this.objImsCategoryMaterial = data['Object']['ImsCategoryMaterialNameList'];
    });
  }


  addInventorySubCategory() {
    {
      // console.log(this.InventorySubCategoryTabForm.value);
       this.settingService.SaveInventorySubCategory(this.InventorySubCategoryTabForm.value).subscribe(res => {
        this._toastr.success(res['ResultMessage']);
        this.resetForm(); 
      });
    }

  }


  addImsCategoryMaterial() {
    {
      this.settingService.SaveImsCategoryMaterial(this.ImsCategoryMaterialForm.value).subscribe(res => {
        this._toastr.success(res['ResultMessage']);
        this.resetForm();

      });
    }

  }

 
  addcategory(content) {
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
 
  addsubcategory(content) {
    
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
  addmfgmaster(content1) {
    this.ManufacturerEdit = false;
    this.resetForm();
    this.modalService.open(content1, {
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
  addvendormaster(content) {
    this.VendorEdit = false;
    this.resetForm();
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
  addlocation(content) {
    // this.modalService.open(content, { centered: true, size: 'lg' });
    this.StorageLocationEdit = false;
    this.resetForm();
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
  addmaterial(content) {
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


  actionStorageLocation(args: CommandClickEventArgs): void {
    switch (args['commandColumn']['type']) {
      case 'Edit': this.addlocation(this.StorageLocationModal);
        this.editStorageLocation(args['rowData']['ImsStorageLocationId']);
        break;
      default:
        break;
    }
  }

  
  editStorageLocation(Id): void {
    this.settingService.GetStorageLocationDetail(Id).subscribe((data) => {
      const StorageLocationDetail = data['Object'] as ImsStorageLocation;
      this.ImsStorageLocationForm.patchValue({
        ImsStorageLocationId: StorageLocationDetail.ImsStorageLocationId,

        ImsStorageLocationName: StorageLocationDetail.ImsStorageLocationName,
        ImsStorageTemperatureMinValue: StorageLocationDetail.ImsStorageTemperatureMinValue,
        ImsStorageTemperatureMaxValue: StorageLocationDetail.ImsStorageTemperatureMaxValue,
        ImsStorageTemperatureUnit: StorageLocationDetail.ImsStorageTemperatureUnit,
        ImsStorageLocationDescription: StorageLocationDetail.ImsStorageLocationDescription

      });
      this.StorageLocationEdit = true;

    });
  }

  updateStorageLocation() {
    if (this.ImsStorageLocationForm.valid) {
      const ValidateRes = this.settingService.ValidateRange(this.ImsStorageLocationForm.value);
      if (ValidateRes) {
        this.settingService.UpdateStorageLocation(this.ImsStorageLocationForm.value).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetStorageLocationList();
            this.CloseModal();
            this.resetForm();
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      } else {
        return false;
      }
    }
    else {
      this.formErrorDisplay.showErrors(this.ImsStorageLocationForm);
    }


  }
  
  actionManufacturer(args: CommandClickEventArgs): void {
    switch (args['commandColumn']['type']) {
      case 'Edit': this.addmfgmaster(this.ManufacturerModal);
        this.editManufacturer(args['rowData']['ImsManufacturerId']);
        break;
      default:
        break;
    }
  }
  editManufacturer(Id): void {
    this.settingService.GetManufacturerDetail(Id).subscribe((data) => {
      const ManufacturerDetail = data['Object'] as ImsManufacturer;
      this.ImsManufacturerForm.patchValue({
        ImsManufacturerId:ManufacturerDetail.ImsManufacturerId,

        ImsManufacturerName:ManufacturerDetail.ImsManufacturerName,
        ImsManufacturerAddress:ManufacturerDetail.ImsManufacturerAddress,
        ImsManufacturerContact:ManufacturerDetail.ImsManufacturerContact
      });
      this.ManufacturerEdit = true;

    });
  } 

   updateManufacturer() {
    if (this.ImsManufacturerForm.valid) {
      this.settingService.UpdateManufacturer1(this.ImsManufacturerForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetManufacturerList();
          this.CloseModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.ImsManufacturerForm);
    }
  /*   this.settingService.UpdateManufacturer1(this.ImsManufacturerForm.value).subscribe(res => {
      this._toastr.success(res['ResultMessage']);
      this.GetManufacturerList();
      this.CloseModal();
      this.resetForm();
    }); */
  } 


  actionVendor(args: CommandClickEventArgs): void {
    switch (args['commandColumn']['type']) {
      case 'Edit': this.addvendormaster(this.VendorModal);
        this.editVendor(args['rowData']['ImsVendorMasterId']);
        break;
      default:
        break;
    }
  }
  editVendor(Id): void {
    this.settingService.GetVendorDetail(Id).subscribe((data) => {
      const VendorDetail = data['Object'] as ImsVendor;
      this.ImsVendorForm.patchValue({
        ImsVendorMasterId:VendorDetail.ImsVendorMasterId,

        ImsVendorName:VendorDetail.ImsVendorName,
        ImsVendorAddress:VendorDetail.ImsVendorAddress,
        ImsVendorContactNumber:VendorDetail.ImsVendorContactNumber
      });
      this.VendorEdit = true;

    });
  } 

   updateVendor() {
    if (this.ImsVendorForm.valid) {
      this.settingService.UpdateVendor(this.ImsVendorForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetVendorMaterList();
          this.CloseModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    }
    else{
        this.formErrorDisplay.showErrors(this.ImsVendorForm);
    }
 
  } 
}



















