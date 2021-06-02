import { TestBed } from '@angular/core/testing';

import { ImsSettingsService } from './ims-settings.service';

describe('ImsSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImsSettingsService = TestBed.get(ImsSettingsService);
    expect(service).toBeTruthy();
  });
});
