import { NextAuthEndpoint, NextEndpoint, withAuthEndpoint } from '..'

const sum = (a: number, b: number) => a + b;

describe('sum', () => {
  it('adds two numbers together', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});

interface TestArgs {
  a: number;
  b: number;
}

export const testFn: NextAuthEndpoint = ({ session, a, b }) => {
  return { a, b, session };
}

export const testFn2: NextAuthEndpoint<TestArgs> = ({ session, a, b }) => {
  [a, b] = [a, b].map((x) => parseInt(x.toString()));
  return { a, b, session };
}

export const testFn3: NextEndpoint = ({ a, b }) => {
  return { a, b };
}

export const testFn4: NextEndpoint<TestArgs> = ({ a, b }) => {
  return { a, b };
}

export const test = withAuthEndpoint(testFn);