import { HasAuth } from './has-auth';

describe('HasAuth', () => {
  it('should create an instance', () => {
    const directive = new HasAuth();
    expect(directive).toBeTruthy();
  });
});
