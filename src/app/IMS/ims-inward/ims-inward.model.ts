
export interface ImsInward {
    ImsInwardRecordId: number;
    ImsInventoryMasterId: number;
    ImsMaterialId: number;
    ImsInventoryCategoryMaterialId: number;
     ImsInventoryMaterialName: string;
    ImsVendorMasterId: number;
    ImsVendorName: string;
    ImsLotNumber: string;
    // ImsInwardQuantity: number;
    ImsInwardRecievedBy: number;
    ImsInwardManufacturingDate: Date ;
    ImsInwardDeliveryDate:Date ;
    ImsInwardExpiryDate: Date;
    ImsInwardStorageTemperature: number;
    ImsStorageLocationId: number;
    ImsStorageLocationName: string;
    // MaterialName: string;
    VendorName: string;
    ImsGrnAttachmentId: number;
    ImsCoaAttachmentId: number;
    ImsQuantityId: number;
    ImsOrderQuantity: number;
    ImsManufacturerId: number;
    ImsManufacturerName: string;

}

export interface Inward {
    ImsInwardRecordId: number;
    ImsInventoryMasterId: number;
    ImsMaterialId: number;
    ImsInventoryCategoryMaterialId: number;
     ImsInventoryMaterialName: string;
    ImsVendorMasterId: number;
    ImsVendorName: string;
   
    ImsInwardStorageTemperature: number;
    ImsStorageLocationId: number;
    ImsStorageLocationName: string;
   
    ImsManufacturerId: number;
    ImsManufacturerName: string;

}
