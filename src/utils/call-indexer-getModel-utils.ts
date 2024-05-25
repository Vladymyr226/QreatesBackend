import { getImageMimeType } from './image-upload.utils';
import { urls } from '../constants/urls';

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export const callIndexerGetModel = async (product): Promise<void> => {
  const { id: productId } = product;
  const { email, username, name } = product.user[0];
  const userNameToSend = username || name;

  const externalAPIUrl = `${urls.callIndexer}?productID=${productId}&user_name=${userNameToSend}&user_mail=${email}`;

  const formData = new FormData();
  const imgPath = `/var/www/QreatesBackend/${product.images[0].imageUrl}`;
  // const imgPath = `${product.images[0].imageUrl}`; // for local testing
  const imageBuffer = await fs.promises.readFile(imgPath);

  const fileExtension = path.extname(imgPath).slice(1);
  const mimeType = getImageMimeType(fileExtension);

  const imageBlob = new Blob([imageBuffer], { type: mimeType });
  formData.append('imagefile', imageBlob, 'image.jpg');

  try {
    console.log('Sending image to external API:', externalAPIUrl); // remove later only for testing
    const response = await axios.post(externalAPIUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key':
          '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', // use env variable
      },
    });
    console.log('External API response:', response.data);
  } catch (error) {
    console.error('Error sending image to external API:', error);
  }
};
