import axios from 'axios';
import { MediaModel } from 'types';

export const uploadMedia = async (file: File): Promise<MediaModel> => {
  const formData = new FormData();
  formData.append('media', file);
  const res = await axios.post('/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
