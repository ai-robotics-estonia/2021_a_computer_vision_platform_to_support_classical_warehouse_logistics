export const snakeCaseToPascalCase = (word: string) => {
  if (!word) return '';

  let stringBuilder = word[0].toUpperCase();
  for (let i = 1; i < word.length; i++) {
    const chr = word[i];
    stringBuilder += chr === '-' ? word[++i].toUpperCase() : chr.toLowerCase();
  }
  return stringBuilder;
};

export const pathToFileName = (path: string) => {
  const filenameSplit = path.split('/');
  return filenameSplit[filenameSplit.length - 1];
};
