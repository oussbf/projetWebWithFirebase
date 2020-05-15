import { TestBed } from '@angular/core/testing';

import { ParentProfileGuardService } from './parent-profile-guard.service';

describe('ParentProfileGuardService', () => {
  let service: ParentProfileGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentProfileGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
