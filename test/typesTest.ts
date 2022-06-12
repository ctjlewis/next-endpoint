
import { ApiAuthFunction, ApiFunction, withAuthEndpoint } from "../src";

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

export const testEndpoint = withAuthEndpoint(testFn4);

const test2Fn: ApiAuthFunction<TestArgs> = async ({ session, a, b }) => {
  console.log(session.user);
  return Number(a) + Number(b);
};

export const testEndpoint2 = withAuthEndpoint(test2Fn, { method: "POST" });