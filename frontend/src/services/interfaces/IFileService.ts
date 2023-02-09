export type FileUploadProgress = (p: number) => void;
export type FileUploadError = (msg: string) => void;

export interface UploadOptionsType {
  onProgress?: FileUploadProgress;
  onError?: FileUploadError;
}

export default interface IFileService {
  download(url: string, fullName: string): void;
  getAsText(url: string): Promise<string>;
  upload(
    url: string,
    formMap: { [key: string]: File | string | File[] },
    options?: UploadOptionsType
  ): boolean | Promise<boolean>;
}
