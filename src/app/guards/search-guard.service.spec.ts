import { TestBed } from '@angular/core/testing';

import { SearchGuardService } from './search-guard.service';

describe('SearchGuardService', () => {
  let service: SearchGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
