export const downloadUrl = (href: string, filename: string) => {
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', filename);
  link.click();
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const href = window.URL.createObjectURL(blob);
  downloadUrl(href, filename);
};

export const imgDataUrlToBlobUrl = (base64ImageData: string) => {
  const contentType = 'image/png';
  const byteCharacters = atob(
    base64ImageData.substring(`data:${contentType};base64,`.length)
  );
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return URL.createObjectURL(blob);
};
