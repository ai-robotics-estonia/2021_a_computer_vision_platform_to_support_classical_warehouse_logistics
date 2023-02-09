export const whereIsUnique = <T>(i: T, inx: number, self: T[]) =>
  self.indexOf(i) === inx;

export function whereIsUniqueObj(key = '') {
  const unique: object[] = [];
  if (!key) return whereIsUnique;
  return (i: object) => {
    let k = i;
    for (const ke of key.split('.')) {
      // @ts-ignore
      k = k[ke];
    }
    const exists = unique.includes(k);
    if (!exists) unique.push(k);
    return !exists;
  };
}
