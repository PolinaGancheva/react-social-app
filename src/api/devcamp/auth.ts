import { Me, SuccessResponse } from 'types';
import axios from 'axios';

export type SingUpData = {
  name: string;
  username: string;
  password: string;
};

export type SingInData = {
  username: string;
  password: string;
};

export const signUp = async (data: SingUpData): Promise<Me> => {
  const res = await axios.post('/signup', data);
  return res.data;
};

export const signIn = async (data: SingInData): Promise<Me> => {
  const res = await axios.post('/signin', data);
  return res.data;
};

export const signOut = async (): Promise<SuccessResponse> => {
  const res = await axios.post('/signout');
  return res.data;
};
