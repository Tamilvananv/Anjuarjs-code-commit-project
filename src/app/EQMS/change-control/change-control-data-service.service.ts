import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EqmsCc,EqmsCcPrimaryAssessment } from './eqms-cc.model';
@Injectable({
  providedIn: 'root'

}
)
export class ChangeControlDataServiceService {

  private EQMSAddRequisitionDetailsformData = new BehaviorSubject<EqmsCc>({
    EqmsCcRequisitionId : null,
    EqmsCcChangeControlNumberId:null,
    EqmsCcChangeControlNumber : null,
    EqmsCcRelatedToId :null,
    EqmsCcRelatedTo :null,
    EqmsCcMediumForChangeId :null,
    EqmsCcMediumForChange :null,
    DepartmentId:null,
    DepartmentName:null,
    EqmsCcDocumentTitle:null,
    EqmsCcBriefDescription:null,
    EqmsCcMediumId:null,
    EqmsCcInitiatedDate:null,
    EqmsCcMedium:null,
     UserId:null,
     UName:null,
  });
  private EQMSAddPrimaryAssessmentformData = new BehaviorSubject<EqmsCcPrimaryAssessment>({
    EqmsCcImpactChangesId:null,
    EqmsCcChangeControlNumberId:null,
    MediumOfImpactId:null,
    EqmsCcImpact:null,
    EqmsCcProposedTimeFrame:null,
    EqmsNotes:null,
    EqmsCcAttachment:null,
  });
  EqmsCcPrimaryAssessment
currenntVersionObj = this.EQMSAddRequisitionDetailsformData.asObservable();
  constructor() { }
  setVersionInfo(obj) {
    this.EQMSAddRequisitionDetailsformData.next(obj);
}
ngOnDestroy() {
  console.log('Destroy the eln data sharing service')
}
}
