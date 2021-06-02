import { TestBed } from '@angular/core/testing';

import { ChangeControlDataServiceService } from './change-control-data-service.service';

describe('ChangeControlDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeControlDataServiceService = TestBed.get(ChangeControlDataServiceService);
    expect(service).toBeTruthy();
  });
});
