import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dasboardGuard } from './dasboard.guard';

describe('dasboardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dasboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
