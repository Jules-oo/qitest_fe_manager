import { TestBed } from '@angular/core/testing';

import { MaterialeService } from './materiale.service';

describe('MaterialeService', () => {
  let service: MaterialeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
