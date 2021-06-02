export interface ImsMaster {
    ImsInventoryMasterId:number;
    ImsMaterialId:string;
    ImsInventoryMasterCatalogueNumber:string;
    ImsInventoryStorageTemperature:DoubleRange;
    ImsInventoryMasterReorderLevel:number;
    ImsInventoryCategoryId:number;
    ImsInventorySubCategoryId:number;
    ImsInventoryCategoryMaterialId:number;
    ImsVendorMasterId:number;
    ImsManufacturerId:number;
    ImsStorageLocationId:number;
    ImsQCId:string;
    ImsSubCategoryName:string;
    ImsInveventoryMaterialName:string;
    ImsInventoryMasterApprover:string;
    ImsInventoryMasterAuthRequird: boolean;
    ImsInventoryMasterAllowInward:boolean; 
    ImsInventoryAllowGmP:boolean;
    ImsInventoryAllowNonGmP:boolean;
  }
  