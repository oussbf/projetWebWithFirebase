import { TestBed } from '@angular/core/testing';

import { SitterRatingService } from './sitter-rating.service';

describe('SitterRatingService', () => {
  let service: SitterRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitterRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
