import { TestBed } from '@angular/core/testing';

import { ReverseAuthGuardService } from './reverse-auth-guard.service';

describe('ReverseAuthGuardService', () => {
  let service: ReverseAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
