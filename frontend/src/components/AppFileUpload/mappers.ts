import IFileDto from './IFileDto';

export const toIFileDto = (
  file: File,
  progress = 0,
  error?: string
): IFileDto => ({
  fileObject: file,
  progress,
  error,
});

export const toFile = (fullName: string, fileSize = 0): File => {
  const emptySize = new Uint32Array(
    fileSize ?? Math.round(Math.random() * 230000)
  );
  return new File([emptySize], fullName);
};
