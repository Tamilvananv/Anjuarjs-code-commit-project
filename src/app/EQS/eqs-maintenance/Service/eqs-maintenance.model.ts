export interface EqsMaintenance {
    EqsMaintenanceRecordId: number;
    EqsEquipmentId: number;    
    EquipmentTypeId: number;
    MaintenanceTypeMasterId: number;   
    EqsMaintenancePerformDate: Date;   
    EqsMaintenanceDescription: string; 
    AttachmentId: number;
    Attachment: string;
    AttachmentList:[AttachmentList];
    EquipmentTypeName:string;
}

export interface AttachmentList {
    AttachmentPath: string
}