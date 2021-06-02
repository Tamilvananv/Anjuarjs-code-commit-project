import { TestBed } from '@angular/core/testing';

import { ImsInventoryService } from './ims-inventory.service';

describe('ImsInventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImsInventoryService = TestBed.get(ImsInventoryService);
    expect(service).toBeTruthy();
  });
});
