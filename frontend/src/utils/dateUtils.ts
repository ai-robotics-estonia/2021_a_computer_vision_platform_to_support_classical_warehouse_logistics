export const getRandomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getDefaultRandomDate = () =>
  getRandomDate(new Date(2022, 0, 1), new Date());
