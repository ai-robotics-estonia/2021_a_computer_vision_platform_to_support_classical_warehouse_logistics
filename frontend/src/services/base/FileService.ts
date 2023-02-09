import axios from 'axios';
import { downloadBlob } from '../../utils/fileUtils';
import IFileService, { UploadOptionsType } from '../interfaces/IFileService';

export class FileService implements IFileService {
  download = async (url: string, fullName: string) => {
    const res = await axios.get<Blob>(url, {
      responseType: 'blob',
    });
    downloadBlob(res.data, fullName);
  };
  getAsText = async (url: string) => {
    const res = await axios.get<Blob>(url, {
      responseType: 'text',
    });
    return res.data as unknown as string;
  };

  upload = async (
    url: string,
    formMap: { [key: string]: File | string | File[] },
    options?: UploadOptionsType
  ): Promise<boolean> => {
    const form = new FormData();
    Object.entries(formMap).map(e => {
      if (Array.isArray(e[1]))
        return (e[1] as File[]).map(f => form.append(e[0], f));
      form.append(e[0], e[1]);
    });
    const res = await axios.post(url, form, {
      onUploadProgress(e) {
        options?.onProgress?.(Math.floor((e.loaded * 100) / e.total));
      },
    });
    if (res.status === 429) options?.onError?.('Too many requests');
    else if (res.status === 415) options?.onError?.('File Type Not Supported');
    else if (res.status === 408) options?.onError?.('File Upload Timeout');
    else if (res.status === 413) options?.onError?.('File Too Large');
    else if (res.status !== 200) options?.onError?.('Upload failed');
    return res.status === 200;
  };
}
export default new FileService();
