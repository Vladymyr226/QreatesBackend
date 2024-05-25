import { Injectable } from '@nestjs/common';
import { GenerateImagesWithRefsDto } from './dto/generate-images-with-refs.dto';
import { getImageMimeType } from '../../utils/image-upload.utils';
import { urls } from '../../constants/urls';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class ImageGeneratorService {
  async generateImageWithRefImgs(
    generateImagesWithRefsDto: GenerateImagesWithRefsDto,
  ) {
    const {
      imageFile,
      product_id,
      prompt,
      ref1img,
      ref2img,
      ref3img,
      ref4img,
      ref5img,
      ref6img,
      refimg_for_style,
      ref_imgs_total_weight,
      style_transfer_weight,
      negative_prompt,
    } = generateImagesWithRefsDto;

    const imgPath = `/var/www/QreatesBackend/${imageFile}`;
    // const imgPath = `${imageFile}`; // for local testing
    const imageBuffer = await fs.promises.readFile(imgPath);
    const fileExtension = path.extname(imageFile).slice(1);
    const mimeType = getImageMimeType(fileExtension);

    const imageBlob = new Blob([imageBuffer], { type: mimeType });

    const formData = new FormData();
    formData.append('imagefile', imageBlob, 'image.jpg');
    formData.append('product_id', product_id.toString());
    formData.append('prompt', prompt);

    if (ref1img) formData.append('ref1img', ref1img);
    if (ref2img) formData.append('ref2img', ref2img);
    if (ref3img) formData.append('ref3img', ref3img);
    if (ref4img) formData.append('ref4img', ref4img);
    if (ref5img) formData.append('ref5img', ref5img);
    if (ref6img) formData.append('ref6img', ref6img);

    if (refimg_for_style) formData.append('refimg_for_style', refimg_for_style);
    if (ref_imgs_total_weight)
      formData.append(
        'ref_imgs_total_weight',
        ref_imgs_total_weight.toString(),
      );
    if (style_transfer_weight)
      formData.append(
        'style_transfer_weight',
        style_transfer_weight.toString(),
      );
    if (negative_prompt) formData.append('negative_prompt', negative_prompt);

    const response = await axios.post(urls.generateImageWithRefImgs, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key':
          '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
      },
    });

    return response.data;
  }
}
