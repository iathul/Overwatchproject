import { TestBed } from '@angular/core/testing';

import { LookoutService } from './lookout.service';

describe('LookoutService', () => {
  let service: LookoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
