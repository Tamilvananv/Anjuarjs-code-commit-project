export interface EqsMaster {
  EqsEquipmentId: number;
  EquipmentId: string;
  EquipmentTypeId: number;
  EquipmentMake: string;
  EquipmentModel: string;
  EqsStorageLocationId: number;
  URSId: number;
  URSNO: string;
  URSAttachmet: AttachmentList[];
  PONO: string;
  POAttachment: AttachmentList[];
  EquipmentInChargeId: number;
  EquipmentServiceEngContact: string;
  EquipmentDeliveryDate: Date;
  EquipmentMfgSrNo: string;
  CriticalityId: number;
  EquipmentBackupInChargeId: number;
  PoId: number;
  PODate: Date;
  IsEquipmentCalibrationRequired: boolean;
  EquipmentCalibrationFrequency: number;
  Availability: boolean;
  DepartmentId: number;
  DepartmentName: string;
  EqsUnAvailabilityReason: string;
  Image:string;
}

export interface EqsMaintenence {
  EqsMaintenenceTypeFrequencyId: number;
  EqsEquipmentId: number;
  MaintenenceTypeMasterId: number;
  FrequencyInMonth: string;
  MaintenenceTypeName:string;
}
export interface Calibration {
  EqsEquipmentId: number;
  IsEquipmentCalibrationRequired: boolean;
  EquipmentCalibrationFrequency: number;
}
export interface AttachmentList {
  AttachmentPath: string
}
