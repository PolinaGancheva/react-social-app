import axios from 'axios';
import { MediaModel, Me } from 'types';

export const uploadMedia = async (file: File): Promise<MediaModel> => {
  const formData = new FormData();
  formData.append('media', file);
  const res = await axios.post('/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export type ImgData = {
  avatarId: number | string;
};

export const updateImage = async (data: number | string): Promise<Me> => {
  const res = await axios.patch('/users/me', { avatarId: data });
  return res.data;
};
