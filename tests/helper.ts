import { FAMILY } from "./setup";

export const getRandomKey = () => Math.random().toString(36);

export const getRowData = (key: string) => ({
  key,
  data: { [FAMILY]: { foo: { value: "bar" } } },
});
