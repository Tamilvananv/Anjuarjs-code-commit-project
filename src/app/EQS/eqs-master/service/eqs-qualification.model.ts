export interface EqsQualification {
    EqsQualificationTypeRecordId: number;
    EqsEquipmentId: number;
    EqsQualificationTypeId: number;
    EqsQualificationDate: Date;
    AttachmentList:AttachmentList[];
    EqsQualificationDescription: string;
    EqsQualificationPerformedByName: string;
    EqsQualificationTypeName: string;
    EquipmentTypeId: number;
    EquipmentTypeName: string;
}

export interface AttachmentList {
  AttachmentPath: string
}
