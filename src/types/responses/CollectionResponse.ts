import { PostModel } from '../models/Post';

export type CollectionResponse<T> = {
  total: number;
  results: PostModel[];
};
