import { TestBed } from '@angular/core/testing';

import { WiredService } from './wired.service';

describe('WiredService', () => {
  let service: WiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
