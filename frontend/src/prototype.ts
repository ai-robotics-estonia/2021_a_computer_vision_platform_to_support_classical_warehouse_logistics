declare global {
  interface String {
    format(): string;
  }
  interface Date {
    toDisplayDate(): string;
    toDisplayDateTime(): string;
  }
  interface String {
    toDisplayDate(): string;
    toDisplayDateTime(): string;
  }
  interface Array<T> {
    findCommon(): T;
  }
  interface File {
    path: string;
    lastModifiedDate: Date;
    size: number;
    type: string;
  }
  interface Math {
    sum(...args: number[]): number;
    avg(...args: number[]): number;
  }
}

// https://www.tutorialstonight.com/javascript-string-format.php
String.prototype.format = function (...args) {
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

type Primitive = number | string | boolean | symbol;

Array.prototype.findCommon = function <T extends Primitive>(
  ...props: T[]
): T | undefined {
  if (props.length === 0) return undefined;
  const common: { [key: string]: number } = {};
  let mostCommon: T | undefined = undefined;
  let mostCommonN = 0;
  for (const _prop of props) {
    const prop: string = _prop as string;
    if (prop in common) common[prop] += 1;
    else common[prop] = 1;
    if (common[prop] > mostCommonN) {
      mostCommon = _prop;
      mostCommonN = common[prop];
    }
  }
  return mostCommon;
};

Math.sum = function (...args: number[]): number {
  return args.reduce((a, b) => a + b, 0);
};
Math.avg = function (...args: number[]): number {
  if (args.length === 0) return 0;
  return Math.sum(...args) / args.length;
};

Date.prototype.toDisplayDate = function (this: Date) {
  if (this.toString() === 'Invalid Date') return 'Invalid Date';
  if (this === null) return 'NA';
  //dd.MM.YYYY HH.mm
  return this.toLocaleDateString('et', {
    day: '2-digit',
    year: 'numeric',
    month: '2-digit',
  });
};

Date.prototype.toDisplayDateTime = function (this: Date) {
  if (this.toString() === 'Invalid Date') return 'Invalid Date';
  return this.toLocaleDateString(['et', 'en'], {
    day: '2-digit',
    year: 'numeric',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

String.prototype.toDisplayDate = function (this: string) {
  return new Date(this).toDisplayDate();
};
String.prototype.toDisplayDateTime = function (this: string) {
  return new Date(this).toDisplayDateTime();
};

export default {};
