import { TestBed } from '@angular/core/testing';

import { QuarterlyService } from './quarterly.service';

describe('QuarterlyService', () => {
  let service: QuarterlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuarterlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
