import { get } from "lodash";

const escapeRegex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

const createRegex = (str) => new RegExp(escapeRegex(str), "i");

const getKeys = (item, keys = [], prefix = "") => {
  if (item) {
    Object.keys(item).forEach((key) => {
      if (item[key] !== null || item[key] !== undefined) {
        typeof item[key] === "object"
          ? getKeys(item[key], keys, prefix + key + ".")
          : keys.push(prefix + key);
      }
    });
  }

  return keys;
};

export const searchArrayOfObjects = (itemsToSearch, search, keysToSearch = null) => {
  const keys = keysToSearch ? keysToSearch : getKeys(itemsToSearch[0]);

  const regex = createRegex(search);

  const matches = itemsToSearch.filter((item) =>
    keys.some((key) => regex.test(get(item, key)))
  );

  return matches;
};