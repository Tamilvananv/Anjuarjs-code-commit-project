import { TestBed } from '@angular/core/testing';

import { ImsInwardService } from './ims-inward.service';

describe('ImsInwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImsInwardService = TestBed.get(ImsInwardService);
    expect(service).toBeTruthy();
  });
});
