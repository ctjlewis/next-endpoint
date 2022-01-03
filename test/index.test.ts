import { NextAuthEndpointFunction, NextEndpointFunction, withNextAuthEndpoint } from "..";

const sum = (a: number, b: number) => a + b;

describe("sum", () => {
  it("adds two numbers together", () => {
    expect(sum(1, 1)).toEqual(2);
  });
});

interface TestArgs {
  a: number;
  b: number;
}

export const testFn: NextAuthEndpointFunction = ({ session, a, b }) => {
  return { a, b, session };
};

export const testFn2: NextAuthEndpointFunction<TestArgs> = ({ session, a, b }) => {
  [a, b] = [a, b].map((x) => parseInt(x.toString()));
  return { a, b, session };
};

export const testFn3: NextEndpointFunction = ({ a, b }) => {
  return { a, b };
};

export const testFn4: NextEndpointFunction<TestArgs> = ({ a, b }) => {
  return { a, b };
};

export const test = withNextAuthEndpoint(testFn4);

const test2Fn = async ({ session, a, b }) => {
  console.log(session.user);
  return a + b;
};

export const test2 = withNextAuthEndpoint(test2Fn);