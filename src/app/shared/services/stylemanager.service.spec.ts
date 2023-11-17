import { TestBed } from '@angular/core/testing';

import { StylemanagerService } from './stylemanager.service';

describe('StylemanagerService', () => {
  let service: StylemanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylemanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
