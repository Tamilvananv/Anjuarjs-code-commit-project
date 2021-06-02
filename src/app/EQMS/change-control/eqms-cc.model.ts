export class EqmsCc {
    EqmsCcRequisitionId : number;
    EqmsCcChangeControlNumberId:number;
    EqmsCcChangeControlNumber : number;
    EqmsCcRelatedToId :number;
    EqmsCcRelatedTo :string;
    EqmsCcMediumForChangeId :number;
    EqmsCcMediumForChange :string;
    DepartmentId:number;
    DepartmentName:string;
    EqmsCcDocumentTitle:string;
    EqmsCcBriefDescription:string;
    EqmsCcMediumId:number;
    EqmsCcInitiatedDate:Date;
    EqmsCcMedium:string;
     UserId:number;
     UName:string;
}

export class EqmsCcChangeDetails {
    EqmsCcRequisitionId:number;
    DepartmentId:number;
    DepartmentName:string;
    EqmsCcProcedure: string;
    EqmsCcJustification:string;
    EqmsCcProposedChange:string;
    EqmsCcActionPlan:string;
}

export class EqmsCcPrimaryAssessment {
    EqmsCcImpactChangesId:number;
    EqmsCcChangeControlNumberId:number;
    MediumOfImpactId: number;
    EqmsCcImpact: string;
    EqmsCcProposedTimeFrame: string;
    EqmsNotes:string;
    EqmsCcAttachment:number;
}
export class EqmsCcQualityAssuarance {
    EqmsCcChangeControlNumberId:number;
      EqmsCcQualityAssuaranceId:number;
      //send to API
      EqmsCcQualityAssuaranceLableId1:number;
      EqmsCcQualityAssuaranceStatus1: string;
      EqmsCcQualityAssuaranceComents1: string;  

}
export class EqmsCcApprovalStatus {
    EqmsCcChangeControlNumberId:number;
        EqmsCcApprovedStatus:number;
        EqmsCcApprovedUpto:number;
}