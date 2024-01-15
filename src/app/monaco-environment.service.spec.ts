import { TestBed } from '@angular/core/testing';

import { MonacoEnvironmentService } from './monaco-environment.service';

describe('MonacoEnvironmentService', () => {
  let service: MonacoEnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonacoEnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
