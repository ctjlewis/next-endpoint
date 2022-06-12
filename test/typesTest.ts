
import { ApiAuthFunction, ApiFunction, withAuthEndpoint } from "../src";

interface TestArgs {
  a: number;
  b: number;
}

export const testFn: ApiAuthFunction = ({ session, a, b }) => {
  return { a, b, session };
};

export const testFn2: ApiAuthFunction<TestArgs> = ({ session, a, b }) => {
  return { a, b, session };
};

export const testFn3: ApiFunction<TestArgs> = ({ a, b }) => {
  return { a, b };
};

export const testFn4: ApiFunction<TestArgs> = ({ a, b }) => {
  return { a, b };
};

export const testEndpoint = withAuthEndpoint(testFn4);

const test2Fn: ApiAuthFunction<TestArgs> = async ({ session, a, b }) => {
  console.log(session.user);
  return Number(a) + Number(b);
};

const a = test2Fn({ session: { user: { name: "test" } }, a: 1, b: 2 });

export const testEndpoint2 = withAuthEndpoint(test2Fn, { method: "POST" });
