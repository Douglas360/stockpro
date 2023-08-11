import { sumKeyOfObject } from "./sumOfKeyObject";

export const sumKeyOfArrayObject = (arr, key) => {
  let count = 0;
  arr.map((item) => (count += sumKeyOfObject(item.items, key)));
  return count;
};