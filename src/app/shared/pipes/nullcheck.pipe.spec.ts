import { NullcheckPipe } from './nullcheck.pipe';

describe('NullcheckPipe', () => {
  it('create an instance', () => {
    const pipe = new NullcheckPipe();
    expect(pipe).toBeTruthy();
  });
});
