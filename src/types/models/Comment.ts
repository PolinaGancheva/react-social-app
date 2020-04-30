import { UserSummaryModel } from './UserSummary';
import { TimestampsModel } from './Timestamps';

export type CommentModel = {
  id: number;
  content: string;
  user: UserSummaryModel;
  postId: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  liked: boolean;
  disliked: boolean;
  mediaId: number;
} & TimestampsModel;
