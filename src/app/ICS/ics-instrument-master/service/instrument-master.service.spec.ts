import { TestBed } from '@angular/core/testing';

import { InstrumentMasterService } from './instrument-master.service';

describe('InstrumentMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstrumentMasterService = TestBed.get(InstrumentMasterService);
    expect(service).toBeTruthy();
  });
});
