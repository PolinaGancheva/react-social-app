import { TimestampsModel } from './Timestamps';

export type MediaModel = {
  id: number;
  filePath: string;
  fileSize: number;
  mimeType: string;
} & TimestampsModel;
