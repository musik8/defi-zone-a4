import { TestBed } from '@angular/core/testing';

import { LamaService } from './lama.service';

describe('LamaService', () => {
  let service: LamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
