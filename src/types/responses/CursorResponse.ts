export type CursorResponse<T> = {
  cursor: number | null;
  results: T[];
};
