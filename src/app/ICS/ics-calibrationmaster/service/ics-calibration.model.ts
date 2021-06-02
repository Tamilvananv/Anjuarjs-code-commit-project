export interface Calibration {
  IcsInstrumentId: number;
  InstrumentId: string;
  InstrumentTypeId: number;
  InstrumentTypeName: string;
  IcsCalibrationRecordId: number;
  CalibrationPerformedDate: Date;
  CalibrationNextDueDate: string;
  CalibrationDueDate: string;
  CalibrationPerformedByID: number;
  CalibrationPerformedBy: string;
  CalibrationDescription: string;
  CalibrationAttachmentList:[AttachmentList];
  ServiceAttachmentList:[AttachmentList];
}
export interface AttachmentList {
  AttachmentPath: string
}
