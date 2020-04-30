import { UserSummaryModel } from './UserSummary';
import { UserBioModel } from './UserBio';
import { TimestampsModel } from './Timestamps';

export type UserDetailsModel = UserSummaryModel & {
  followersCount: number;
  followingCount: number;
  userBio: UserBioModel;
  following: boolean;
} & TimestampsModel;
