import { Injectable } from '@angular/core';
import { take } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ExpVersionEnt } from './experiment.model';

@Injectable()
export class elnDataService {
    private expVersionObj = new BehaviorSubject<ExpVersionEnt>({
        ExperimentId: null, VersionId: null, IsAllowEdit: true, IsSendForApproval: false,VersionNo:null,
        IsRework: false, StatusCode: 'N', IsFavourite: false, IsAllowDiscontinue: false
    });
    currenntVersionObj = this.expVersionObj.asObservable();

    constructor() { }

    setVersionInfo(obj) {
        this.expVersionObj.next(obj);
    }

    ngOnDestroy() {
        console.log('Destroy the eln data sharing service')
    }
}