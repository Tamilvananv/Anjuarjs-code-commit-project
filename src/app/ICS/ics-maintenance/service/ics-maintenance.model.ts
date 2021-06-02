export interface MaintenanceEnt {
  IcsMaintenanceRecordId: number;
  IcsInstrumentId: number;
  InstrumentTypeId: number;
  IcsMaintenanceTypeId: number;
  PerformedDate: Date;
  Description: string;
  AttachmentId: number;
  Attachment: string;
  AttachmentList:[AttachmentList];
  InstrumentTypeName : string;
}

export interface AttachmentList {
    AttachmentPath: string
}
