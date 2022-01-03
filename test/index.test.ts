import { ApiAuthFunction, ApiFunction, withAuthEndpoint } from "..";

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

export const testFn: ApiAuthFunction = ({ session, a, b }) => {
  return { a, b, session };
};

export const testFn2: ApiAuthFunction<TestArgs> = ({ session, a, b }) => {
  [a, b] = [a, b].map((x) => parseInt(x.toString()));
  return { a, b, session };
};

export const testFn3: ApiFunction = ({ a, b }) => {
  return { a, b };
};

export const testFn4: ApiFunction<TestArgs> = ({ a, b }) => {
  return { a, b };
};

export const test = withAuthEndpoint(testFn4);

const test2Fn: ApiAuthFunction<TestArgs> = async ({ session, a, b }) => {
  console.log(session.user);
  return Number(a) + Number(b);
};

export const test2 = withAuthEndpoint(test2Fn);