export interface IcsQualification {
  QualificationTypeRecordId: number;
  IcsInstrumentId: number;
  InstrumentTypeId: number;
  QualificationTypeId: number;
  QualificationDate: Date;
  ICSQualificationLink: string;
  QualificationDescription: string;
  QualificationPerformedByName: number;
  AttachmentList:[AttachmentList];
  InstrumentTypeName: string;
}
export interface AttachmentList {
  AttachmentPath: string
}
