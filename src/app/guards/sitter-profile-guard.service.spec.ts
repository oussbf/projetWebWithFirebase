import { TestBed } from '@angular/core/testing';

import { SitterProfileGuardService } from './sitter-profile-guard.service';

describe('SitterProfileGuardService', () => {
  let service: SitterProfileGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitterProfileGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
