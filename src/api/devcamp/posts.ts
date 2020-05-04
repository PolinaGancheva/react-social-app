import axios from 'axios';
import { SuccessResponse, PostModel } from 'types';
import { CursorResponse } from '../../types/responses/CursorResponse';

export const likePost = async (id: number): Promise<SuccessResponse> => {
  const res = await axios.post(`/posts/${id}/like`);
  return res.data;
};

export const dislikePost = async (id: number): Promise<SuccessResponse> => {
  const res = await axios.post(`/posts/${id}/dislike`);
  return res.data;
};

export const getFollowingPosts = async (
  cursor: number | null,
  limit: number = 10
): Promise<CursorResponse<PostModel>> => {
  const res = await axios.get('v1/posts', {
    params: { cursor, limit },
  });
  return res.data;
};

type CreatePostData = {
  content: string;
  mediaId: number | null;
};

export const createPost = async (data: CreatePostData): Promise<PostModel> => {
  const res = await axios.post('/posts', data);
  return res.data;
};

export const deletePost = async (id: number): Promise<SuccessResponse> => {
  const res = await axios.delete(`/posts/${id}`);
  return res.data;
};

export type DataTypes = {
  title: string;
  content: string;
  mediaId: number;
};

export const editPost = async (
  id: number,
  data: DataTypes
): Promise<SuccessResponse> => {
  const res = await axios.patch(`/posts/${id}`, { data });
  return res.data;
};
