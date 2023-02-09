export const objectKeyReplacer = function <T extends { [key: string]: any }>(
  obj: T,
  codec: (str: string) => string
) {
  const newObj: { [key: string]: any } = {};
  Object.keys(obj).forEach(k => {
    newObj[codec(k)] = obj[k];
  });
  return newObj as T;
};
