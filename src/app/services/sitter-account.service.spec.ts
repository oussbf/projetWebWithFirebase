import { TestBed } from '@angular/core/testing';

import { SitterAccountService } from './sitter-account.service';

describe('SitterAccountService', () => {
  let service: SitterAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitterAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
