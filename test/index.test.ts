import test from "ava";

const sum = (a: number, b: number) => a + b;

test("two plus two should equal four", async (t) => {
  if (sum(2, 2) === 4) {
    t.pass();
  }
});