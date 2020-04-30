import {
  Me,
  UserSummaryModel,
  UserDetailsModel,
  SuccessResponse,
  PostModel,
} from 'types';
import axios from 'axios';
import { CursorResponse } from '../../types/responses/CursorResponse';

export const getMe = async (): Promise<Me> => {
  const res = await axios.get('/users/me');
  return res.data;
};

export const getUsers = async (search: string): Promise<UserSummaryModel[]> => {
  const res = await axios.get('/users', { params: { search } });
  return res.data;
};

export const getPosts = async (
  id: number,
  cursor: number | null,
  limit: number = 10
): Promise<CursorResponse<PostModel>> => {
  const res = await axios.get(`/v1/users/${id}/posts`, {
    params: { cursor, limit },
  });
  return res.data;
};

export const getUser = async (username: string): Promise<UserDetailsModel> => {
  const res = await axios.get(`/users/${username}`);
  return res.data;
};

export const followUser = async (id: number): Promise<SuccessResponse> => {
  const res = await axios.post(`/users/${id}/follow`);
  return res.data;
};

export const unfollowUser = async (id: number): Promise<SuccessResponse> => {
  const res = await axios.post(`/users/${id}/unfollow`);
  return res.data;
};
