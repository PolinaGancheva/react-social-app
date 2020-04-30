import axios from 'axios';
import { SuccessResponse, CommentModel, CursorResponse } from 'types';

type CreateCommentData = {
  content: string;
  postId: number | null;
  parentCommentId?: number | null;
  mediaId: number | null;
};

export const createComment = async (
  data: CreateCommentData
): Promise<CommentModel> => {
  const res = await axios.post(`/comments`, data);
  return res.data;
};

export const likeComment = async (id: number): Promise<SuccessResponse> => {
  const res = await axios.post(`/comments/${id}/like`);
  return res.data;
};

export const dislikeComment = async (id: number): Promise<SuccessResponse> => {
  const res = await axios.post(`/comments/${id}/dislike`);
  return res.data;
};

export const getComments = async (
  postId: number,
  cursor: number | null,
  limit: number = 10
): Promise<CursorResponse<CommentModel>> => {
  const res = await axios.get(`v1/posts/${postId}/comments`, {
    params: { postId, limit, cursor },
  });
  return res.data;
};

export const deleteComment = async (id: number): Promise<SuccessResponse> => {
  const res = await axios.delete(`/comments/${id}`);
  return res.data;
};
