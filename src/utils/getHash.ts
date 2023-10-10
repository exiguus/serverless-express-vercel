// Fowler-Noll-Vo 1a hash
export const getHash = (str: string) => {
  // tslint:disable no-bitwise
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
  // tslint:enable no-bitwise
};
