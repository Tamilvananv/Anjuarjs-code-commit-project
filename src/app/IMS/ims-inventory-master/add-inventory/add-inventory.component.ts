import { Component, OnInit } from '@angular/core';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { ImsInventoryService } from '../Service/ims-inventory.service';
import { ImsSettingsService } from '../../ims-settings/service/ims-settings.service';
import { ImsInventoryCategory } from '../../ims-settings/service/ims-inventory-category.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImsMaster } from '../Service/ims-inventory.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ExperimentService } from 'src/app/ELN/eln-new-experiments/service/experiment.service';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
// import { ImsSettingsService } from '../../ims-settings/service/ims-settings.service';
@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  providers: [FilterService],
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _inventoryMasterService: ImsInventoryService, private routes: Router, private _toastr: ToastrService, private _settingService: ImsSettingsService,
    private _elnExperimentService: ExperimentService, private formErrorDisplay: FormErrorDisplayService, private formBuilder: FormBuilder) { }
  public objStorageLocList: Object[];
  public objVendorList: Object[];
  public objManufacturerList: Object[];
  public objInventoryCategoryType: Object[];
  public objInventorySubCategoryType: Object[];
  public objImsCategoryMaterial: Object[];
  public objNewStorageLocList: Object[];
  ImsAddInventoryForm: FormGroup;
  isInventoryEdit = false;
  public editSettings: EditSettingsModel;

public MinTemparature : number;
public MaxTemparature :number;
public   TemparatureFlag = false;

  public data3: { [key: string]: Object; }[] = [
    { Name: 'Select', Id: 'S' }

  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Name', value: 'Id' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to ComboBox input element
  public watermark: string = 'Select';
  public watermark1: string = 'Select Type';
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data3, query);
  }
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

  ngOnInit(): void {
    this.SetForm();
    this.GetImsStorageLocationList();
    this.GetImsVendorList();
    this.GetImsManufacturerList();
    this.GetInventoryCategoryList();
     this.route.params.subscribe(params => {
      if (!isNaN(Number(params['id']))) {
        this.ImsAddInventoryForm.patchValue({
          ImsInventoryMasterId: Number(params['id'])
        });
        this.isInventoryEdit = true;
        this.GetImsMasterDetail1();

      }
    });
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  }

  resetForm() {
    this.ImsAddInventoryForm.reset();
  }

  SetForm() {
    this.ImsAddInventoryForm = this.formBuilder.group({
      ImsInventoryMasterId: null,
      ImsMaterialId: ['',  Validators.required],
      ImsInventoryMasterCatalogueNumber: [''],
      ImsInventoryStorageTemperature: ['', Validators.required],
      ImsInventoryMasterReorderLevel: null,
      ImsInventoryCategoryId: null,
      ImsInventorySubCategoryId: null,
      ImsInventoryCategoryMaterialId: null,
      ImsVendorMasterId: null,
      ImsManufacturerId: null,
      ImsStorageLocationId: ['', Validators.required],
      ImsQCId: null,
      ImsInveventoryMaterialName: [''],
      ImsSubCategoryName: [''],
      ImsInventoryMasterApprover: [''],
      ImsInventoryMasterAuthRequird: null,
      ImsInventoryMasterAllowInward: null,
      ImsInventoryAllowGmP: null,
      ImsInventoryAllowNonGmP: null,

    });
  }
  gotoImsMaster() {
    this.routes.navigate(['/imsinventorymaster']);
  }
  GetImsStorageLocationList() {
    this._inventoryMasterService.GetStorageLocationList().subscribe((data) => {
      this.objStorageLocList = data['Object'];
      console.log(this.objStorageLocList)
    });
  }
  LoadTemp(id) {
    this.GetImsStorageLocationList();
   console.log(this.objStorageLocList);
    this.objStorageLocList = this.objStorageLocList.filter(id.value);
    console.log(id.value);
  }
  
  GetImsVendorList() {
    this._inventoryMasterService.GetVendorMasterList().subscribe((data) => {
      this.objVendorList = data['Object']['ImsVendorMasterList'];
    });
  }
  GetImsManufacturerList() {
    this._inventoryMasterService.GetManufacturerList().subscribe((data) => {
      this.objManufacturerList = data['Object']['ImsManufacturerList'];
    });
  }
  GetInventoryCategoryList() {
    this._settingService.GetCategoryNameList().subscribe((data) => {
      this.objInventoryCategoryType = data['Object']['ImsCategoryNameList'];
    });
  }
  loadSubCategory(args) {
    console.log(args.value);
    let ImsInventorycategoryId = args.value;
    this._settingService.GetSubCategoryNameList1(ImsInventorycategoryId).subscribe((data) => {
      this.objInventorySubCategoryType = data['Object']['ImsSubCategoryNameList'];
    });
  }
  loadMaterial(args) {
    debugger;
    console.log(args.value);
    let ImsInventorySubcategoryId = args.value;
    this._settingService.GetCategoryMaterialList(ImsInventorySubcategoryId).subscribe((data) => {
      this.objImsCategoryMaterial = data['Object']['ImsCategoryMaterialNameList'];
    });
  }

  addImsMaster() {
    if (this.ImsAddInventoryForm.valid) {
    if (this.ImsAddInventoryForm.value.ImsInventoryMasterId > 0) {
      this.UpdateIImsMaster();
    } else {
      this._inventoryMasterService.SaveImsMaster(this.ImsAddInventoryForm.value).subscribe(res => {
        this._toastr.success(res['ResultMessage']);
        this.resetForm();
      });
    }
  }else{
    this.formErrorDisplay.showErrors(this.ImsAddInventoryForm);
  }
  }
  /*  GetInventoryMasterDetails() {
     this._inventoryMasterService.GetInventoryMasterDetails(this.ImsAddInventoryForm.value).subscribe((data) => {
       this.ImsAddInventoryForm = data['Object']['InventoryMasterDetailsList'][0];
       console.log(this.ImsAddInventoryForm);
     });
   }  */
  /*  UpdateIImsMaster(imsMasterTabFrom: NgForm) {

     this._inventoryMasterService.UpdateImsMaster(imsMasterTabFrom.value).subscribe(res => {

       if (res['Result']) {
         this._toastr.success(res['ResultMessage']);

       } else {
         this._toastr.error(res['ResultMessage']);
     }
   });
   } */


  LoadStorageLocationBasedOnTemp(args: any) {

    //console.log("args LoadStorageLocationBasedOnTemp :", args.target.value);
    if (args.target.value != "") {
      let temp = parseFloat(args.target.value)
      this._inventoryMasterService.GetStorageLocationNameBasedOnTemp(temp).subscribe((data) => {
        this.objNewStorageLocList = data['Object'];

      });
    }
    else {
     // console.log("args LoadStorageLocationBasedOnTemp 2:", args.target.value);
      this.objNewStorageLocList = this.objStorageLocList

    }

  }
  SetAuthRequired() {
    this.ImsAddInventoryForm.patchValue({
      ImsInventoryMasterAuthRequird: true
    });
    // this.isFreqDisabled = false;
  }








 GetImsMasterDetail1() {
  this._inventoryMasterService.GetInventoryMasterDetails(this.ImsAddInventoryForm.get('ImsInventoryMasterId').value).subscribe((data) => {
  let ObjInventoryDetail = data['Object'] as ImsMaster;
  // if(ObjInventoryDetail!=null){

    this.ImsAddInventoryForm.patchValue({

      ImsInventoryMasterId:ObjInventoryDetail.ImsInventoryMasterId,
      ImsMaterialId:ObjInventoryDetail.ImsMaterialId,
      ImsInventoryMasterCatalogueNumber:ObjInventoryDetail.ImsInventoryMasterCatalogueNumber,
      ImsInventoryStorageTemperature:ObjInventoryDetail.ImsInventoryStorageTemperature,
      ImsInventoryMasterReorderLevel:ObjInventoryDetail.ImsInventoryMasterReorderLevel,
      ImsInventoryCategoryId:ObjInventoryDetail.ImsInventoryCategoryId,
      ImsInventorySubCategoryId:ObjInventoryDetail.ImsSubCategoryName,
      ImsInventoryCategoryMaterialId:ObjInventoryDetail.ImsInveventoryMaterialName,
      ImsVendorMasterId:ObjInventoryDetail.ImsVendorMasterId,
      ImsManufacturerId:ObjInventoryDetail.ImsManufacturerId,
      ImsStorageLocationId:ObjInventoryDetail.ImsStorageLocationId,
      ImsQCId:ObjInventoryDetail.ImsQCId,
      // ImsSubCategoryName:ObjInventoryDetail.ImsSubCategoryName,
      // ImsInveventoryMaterialName:ObjInventoryDetail.ImsInveventoryMaterialName,
      ImsInventoryMasterApproverd:ObjInventoryDetail.ImsInventoryMasterApprover,
      ImsInventoryMasterAuthRequird: ObjInventoryDetail.ImsInventoryMasterAuthRequird,
      ImsInventoryMasterAllowInward:ObjInventoryDetail.ImsInventoryMasterAllowInward,
      ImsInventoryAllowGmP:ObjInventoryDetail.ImsInventoryMasterAllowInward,
      ImsInventoryAllowNonGmP:ObjInventoryDetail.ImsInventoryAllowNonGmP


    });
    console.log(this.ImsAddInventoryForm)
// }
  });
}


UpdateIImsMaster() {
  if (this.ImsAddInventoryForm.valid){
         this._inventoryMasterService.UpdateImsMaster(this.ImsAddInventoryForm.value).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.resetForm();
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
  }

}

getStoragetemperature(event)
{
//console.log("event :",event)
this.MinTemparature =event['itemData']['ImsStorageTemperatureMinValue'];
this.MaxTemparature = event['itemData']['ImsStorageTemperatureMaxValue'];

if( this.TemparatureFlag == true)
{
  let temp = parseFloat((this.ImsAddInventoryForm.get('ImsInventoryStorageTemperature').value))
 
  if( this.MinTemparature != null && this.MaxTemparature != null)
{
  if(temp < this.MinTemparature || temp > this.MaxTemparature  )
  {
    this._toastr.error("Temperature Should be in between Min and Max Value");
       
  } 
}


}

}

CheckStorageLocationTemparature(event)
{
  let temp = parseFloat(event.target.value)
  this.TemparatureFlag = false;
 
if( this.MinTemparature != null && this.MaxTemparature != null)
{
  if(temp < this.MinTemparature || temp > this.MaxTemparature  )
  {
    this._toastr.error("Temperature Should be in between Min and Max Value");
       
  } 
}
else{
  this.TemparatureFlag = true;
}
}

}
