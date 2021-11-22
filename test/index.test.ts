import { NextAuthEndpoint, withAuthEndpoint } from '..'

const sum = (a: number, b: number) => a + b;

describe('sum', () => {
  it('adds two numbers together', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});

interface TestArgs {
  a: number;
  b: string;
}

export const testFn: NextAuthEndpoint<TestArgs> = ({ session, a, b }) => {
  return { a, b, session };
}

export const test = withAuthEndpoint(testFn);