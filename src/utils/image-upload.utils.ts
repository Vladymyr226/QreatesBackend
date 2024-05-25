import * as fs from 'fs-extra';

export const saveBase64Image = async (
  base64Data: string,
  uploadDir: string,
): Promise<string> => {
  const [meta] = base64Data.split(',');
  const fileType = meta.split('/')[1].split(';')[0];
  const extName = fileType === 'jpg' ? 'jpeg' : fileType;
  const fileName = `${Date.now()}.${extName}`;
  const imgUrl = `${uploadDir}/${fileName}`;
  const filePath = `/var/www/QreatesBackend/uploads/products/${fileName}`;
  // const filePath = `uploads/products/${fileName}`;

  const base64DataBuffer = Buffer.from(
    base64Data.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );
  fs.writeFileSync(filePath, base64DataBuffer);
  return imgUrl;
};

export const getImageMimeType = (fileExtension: string): string => {
  let mimeType;
  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
      mimeType = 'image/jpeg';
      break;
    case 'png':
      mimeType = 'image/png';
      break;
    case 'gif':
      mimeType = 'image/gif';
      break;
    default:
      mimeType = 'application/octet-stream';
  }
  return mimeType;
};
