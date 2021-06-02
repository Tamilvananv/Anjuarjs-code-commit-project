import { Component, OnInit } from '@angular/core';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { ImsInwardService } from '../ims-inward.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImsInward, Inward } from '../ims-inward.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { EditSettingsModel } from '@syncfusion/ej2-grids';
@Component({
  selector: 'app-add-inward',
  templateUrl: './add-inward.component.html',
  styleUrls: ['./add-inward.component.css']
})
export class AddInwardComponent {

  public dateValue: Date = new Date();
  public objMaterialIdList: object[];
  public objMaterialName: object[];
  public objMaterialNameVal: object[];
  public objVendorName: object[];
  public objStorageLocation: object[];
  public objManufacturer: object[];
  public objManufacturerName: object[];
  public objData: Inward;
  ImsAddInwardForm: FormGroup;

  public ImsInventoryMaterialName: string;
  public ImsVendorName: string;
  public ImsStorageLocationName: string;
  public ImsManufacturerName: string;
  public ImsInwardStorageTemperature: number;
  public editSettings: EditSettingsModel;
  isInwardEdit = false;

  constructor(private route: ActivatedRoute, private _inwardService: ImsInwardService, private routes: Router,
    private formErrorDisplay: FormErrorDisplayService, private formBuilder: FormBuilder, private _toastr: ToastrService) { }

  public fields: Object = { text: 'Name', value: 'Id' };
  public height: string = '220px';
  public watermark: string = 'Select';
  public watermark1: string = 'Select Type';
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();

  }
  ngOnInit(): void {
    this.SetForm();
    this.GetMaterialIdList();
    this.route.params.subscribe(params => {
      if (!isNaN(Number(params['id']))) {
        this.ImsAddInwardForm.patchValue({
          ImsInwardRecordId: Number(params['id'])
        });
        this.isInwardEdit = true;
        this.GetInwardDetail();

      }
    });
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  }

  resetForm() {
    this.ImsAddInwardForm.reset();
    this.ImsInventoryMaterialName = null,
    this.ImsVendorName = null,
    this.ImsStorageLocationName =null,
    this.ImsManufacturerName =null,
    this.ImsInwardStorageTemperature = null
  }
  SetForm() {
    this.ImsAddInwardForm = this.formBuilder.group({
      ImsInwardRecordId: null,
      ImsInventoryMasterId: null,
      ImsMaterialId: ['',  Validators.required],
      ImsInventoryCategoryMaterialId: null,
      ImsInventoryMaterialName: [''],
      ImsVendorMasterId: null,
      ImsVendorName: [''],
      ImsLotNumber: [''],
      ImsInwardRecievedBy: null,
      ImsInwardManufacturingDate: null,
      ImsInwardDeliveryDate: null,
      ImsInwardExpiryDate: null,
      ImsInwardStorageTemperature: null,
      ImsStorageLocationId: null,
      ImsStorageLocationName: [''],
      VendorName: [''],
      ImsGrnAttachmentId: null,
      ImsCoaAttachmentId: null,
      ImsQuantityId: null,
      ImsOrderQuantity: null,
      ImsManufacturerId: null,
      ImsManufacturerName: ['']

    });
  }
  gotoInwardMaster() {
    this.routes.navigate(['/imsinward']);
  }
  GetMaterialIdList() {
    this._inwardService.GetMaterialIdList().subscribe((data) => {
      this.objMaterialIdList = data['Object']['ImsCategoryIdList'];
      console.log(this.objMaterialIdList);
    }
    );
  }

  Check(InventoryMasterId) {
    this._inwardService.GetDetails(InventoryMasterId.value).subscribe((data) => {
      this.objData = data['Object'];
      console.log("ObjectData : ", this.objData);

      this.ImsInventoryMaterialName = this.objData.ImsInventoryMaterialName;
      this.ImsVendorName = this.objData.ImsVendorName;
      this.ImsStorageLocationName = this.objData.ImsStorageLocationName;
      this.ImsManufacturerName = this.objData.ImsManufacturerName;
      this.ImsInwardStorageTemperature = this.objData.ImsInwardStorageTemperature;

    });
  }

  addInwardMaster() {
    if (this.ImsAddInwardForm.valid) {
    if (this.ImsAddInwardForm.value.ImsInwardRecordId > 0) {
      this.UpdateInwardMaster();
    } else {
    this.ImsAddInwardForm.patchValue({
     
      ImsManufacturerId: this.objData.ImsManufacturerId,
      ImsVendorMasterId: this.objData.ImsVendorMasterId,
      ImsInventoryCategoryMaterialId: this.objData.ImsInventoryCategoryMaterialId,
      ImsStorageLocationId: this.objData.ImsStorageLocationId,
      ImsInwardStorageTemperature: this.objData.ImsInwardStorageTemperature
    });
    this._inwardService.SaveInwardMaster(this.ImsAddInwardForm.value).subscribe(res => {
      this._toastr.success(res['ResultMessage']);
      this.resetForm();
    });
  }
}else{
  this.formErrorDisplay.showErrors(this.ImsAddInwardForm);
}
  }

  GetInwardDetail() {
    this._inwardService.GetImsInwardRecordEditList(this.ImsAddInwardForm.get('ImsInwardRecordId').value).subscribe((data) => {
      let ObjInwardDetail = data['Object'] as ImsInward;
      console.log("first", ObjInwardDetail)
      this.ImsAddInwardForm.patchValue({
        ImsInwardRecordId: ObjInwardDetail.ImsInwardRecordId,
        ImsInventoryMasterId: ObjInwardDetail.ImsInventoryMasterId,
        ImsMaterialId: ObjInwardDetail.ImsMaterialId,
        ImsInventoryCategoryMaterialId: ObjInwardDetail.ImsInventoryCategoryMaterialId,
        ImsVendorMasterId: ObjInwardDetail.ImsVendorMasterId,
        ImsStorageLocationId: ObjInwardDetail.ImsStorageLocationId,
        ImsManufacturerId: ObjInwardDetail.ImsManufacturerId,
        ImsLotNumber: ObjInwardDetail.ImsLotNumber,
        ImsQuantityId:ObjInwardDetail.ImsQuantityId,
        ImsOrderQuantity: ObjInwardDetail.ImsOrderQuantity,
        ImsInwardManufacturingDate:ObjInwardDetail.ImsInwardManufacturingDate,
        ImsInwardExpiryDate:ObjInwardDetail.ImsInwardExpiryDate
      });
      this.ImsInventoryMaterialName = ObjInwardDetail.ImsInventoryMaterialName;
      this.ImsVendorName = ObjInwardDetail.ImsVendorName;
      this.ImsStorageLocationName = ObjInwardDetail.ImsStorageLocationName;
     
      this.ImsManufacturerName = ObjInwardDetail.ImsManufacturerName;
      this.ImsInwardStorageTemperature = ObjInwardDetail.ImsInwardStorageTemperature;
      console.log(this.ImsAddInwardForm)
    });
  }

  UpdateInwardMaster() {
    if (this.ImsAddInwardForm.valid){
           this._inwardService.UpdateInwardMaster(this.ImsAddInwardForm.value).subscribe(res => {
            if (res['Result']) {
              this._toastr.success(res['ResultMessage']);
              this.resetForm();
            } else {
              this._toastr.error(res['ResultMessage']);
            }
          });
    }
  
  }
  /* loadMaterialName(args) {
    debugger;
    console.log(args.value);
    let ImsMaterialId = args.value;
    // this.catid=CategoryId;
    this._inwardService.GetMaterialNameList(ImsMaterialId).subscribe((data) => {
      this.objMaterialName = data['Object']['ImsInwardMaterialName'];
    });
  } */

  /* loadMaterialName(args) {
    console.log(args.value);
    let ImsMaterialId = args.value;
    this._inwardService.GetMaterialNameList(ImsMaterialId).subscribe((data) => {
      this.objMaterialName = data['Object']['InwardMaterialName'];
    });

    this._inwardService.GetVendorNameList(ImsMaterialId).subscribe((data) => {
      this.objVendorName = data['Object']['InwardVendorName'];
      console.log("Vane", this.objVendorName)

    });
    this._inwardService.GetStorageLocationList(ImsMaterialId).subscribe((data) => {
      this.objStorageLocation = data['Object']['InwardStorageLocation'];
      console.log("Sname", this.objStorageLocation)

    });
    this._inwardService.GetManufacturerList(ImsMaterialId).subscribe((data) => {
      this.objManufacturer = data['Object']['InwardManufacturer'];
      console.log("Mname", this.objManufacturer)

    });
  } */


  /*  public path: Object = {
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
   public dropEle: HTMLElement; */

}