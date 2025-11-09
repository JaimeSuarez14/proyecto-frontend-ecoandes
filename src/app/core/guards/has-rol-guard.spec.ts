import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasRolGuard } from './has-rol-guard';

describe('hasRolGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasRolGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
