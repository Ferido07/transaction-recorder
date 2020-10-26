import { AccountState } from './account-state.enum';

describe('AccountState', () => {
  it('should be defined', () => {
    expect(new AccountState()).toBeDefined();
  });
});
