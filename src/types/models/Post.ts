import { CommentModel } from './Comment';
import { UserSummaryModel } from './UserSummary';
import { TimestampsModel } from './Timestamps';

export type PostModel = {
  id: number;
  title: string;
  content: string;
  comments: CommentModel[];
  mediaId?: number;
  user: UserSummaryModel;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  liked: boolean;
  disliked: boolean;
} & TimestampsModel;
