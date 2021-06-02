export interface EqsCalibration {
    EqsCalibrationRecordId: number;
    EqsEquipmentId: number;
    EquipmentId: number;
    EquipmentTypeId: number;
    EqsCalibrationPerformedById: number;
    CalibrationPerformedDate: Date;
    CalibrationDescription: string;
  CalibrationAttachmentList:[AttachmentList];
  ServiceAttachmentList:[AttachmentList];
  EquipmentTypeName:string;
}
export interface AttachmentList {
AttachmentPath: string
}
