export interface IcsMaster {
  IcsInstrumentId: number;
  InstrumentId: string;
  InstrumentTypeId: string;
  InstrumentMake: string;
  InstrumentModel: string;
  StorageLocationId: number;
  URSNO: string;
  PONO: string;
  URSAttachmentList: AttachmentList[];
  POAttachmentList: AttachmentList[];
  InstrumentInchargeId: number;
  InstrumentServiceEngContact: string;
  InstrumentDeliveryDate: Date;
  InstrumentMfgSrNo: string;
  CriticalityId: number;
  InstrumentBackupInChargeID: number;
  PODate: Date;
  IsCalibrationRequired: boolean;
  CalibrationFrequency: number;
  Availability: boolean;
  DepartmentId: number;
  DepartmentName: string;
  IcsUnAvailabilityReason: string;
  InstrumentImage:string;
}
export interface AttachmentList {
  AttachmentPath: string
}

export interface IcsMaintenence {
  IcsMaintenenceTypeFrequencyId: number;
  IcsInstrumentId: number;
  MaintenenceTypeMasterId: number;
  FrequencyInMonth: string;
  MaintenenceTypeName:string
}

export interface IcsCustomHeader {
  IcsCustomHeaderId: number;
  IcsInstrumentId: number;
  CustomHeaderMasterId: number;
  CustomHeaderFieldName: string;
  CustomHeaderValue: string;
}
