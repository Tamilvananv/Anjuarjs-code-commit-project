import { TestBed } from '@angular/core/testing';

import { EquipmentMasterService } from './eqs-master.service';

describe('EquipmentMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipmentMasterService = TestBed.get(EquipmentMasterService);
    expect(service).toBeTruthy();
  });
});
