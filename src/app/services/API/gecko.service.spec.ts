import { TestBed } from '@angular/core/testing';

import { GeckoService } from './gecko.service';

describe('GeckoService', () => {
  let service: GeckoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeckoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
