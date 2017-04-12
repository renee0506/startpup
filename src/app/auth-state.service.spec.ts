import { TestBed, inject } from '@angular/core/testing';

import { AuthStateService } from './auth-state.service';

describe('AuthStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStateService]
    });
  });

  it('should ...', inject([AuthStateService], (service: AuthStateService) => {
    expect(service).toBeTruthy();
  }));
});
