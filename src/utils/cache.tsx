import { queryCache } from 'react-query';
import { CursorResponse } from 'types';

/* eslint-disable-next-line */
export function deduplicateCache<T extends { id: number }>(cacheKey: any) {
  const cachedData = queryCache.getQueryData(cacheKey) as CursorResponse<T>[];
  const occurrences = new Set<number>();
  let didRemoveDuplicates = false;

  if (cachedData) {
    for (const group of cachedData) {
      if (group.results.some((x) => occurrences.has(x.id))) {
        didRemoveDuplicates = true;
        group.results = group.results.filter((x) => !occurrences.has(x.id));
      }

      for (const item of group.results) {
        occurrences.add(item.id);
      }
    }

    if (didRemoveDuplicates) {
      queryCache.setQueryData(cacheKey, cachedData);
    }
  }
}

export function appendToCache<T extends { id: number }>(
  /* eslint-disable-next-line */
  cacheKey: any,
  data: T
) {
  queryCache.setQueryData(cacheKey, (old: CursorResponse<T>[]) =>
    old && old.length
      ? [
          ...old.slice(0, -1),
          {
            cursor: old.slice(-1).pop()!.cursor,
            results: old.slice(-1).pop()!.results.concat(data),
          },
        ]
      : [{ cursor: null, results: [data] }]
  );
}

export function prependToCache<T extends { id: number }>(
  /* eslint-disable-next-line */
  cacheKey: any,
  data: T
) {
  queryCache.setQueryData(cacheKey, (old: CursorResponse<T>[]) =>
    old && old.length
      ? [
          {
            cursor: old.slice(0, 1).pop()!.cursor,
            results: [data, ...old.slice(0, 1).pop()!.results],
          },
          ...old.slice(1),
        ]
      : [{ cursor: null, results: [data] }]
  );
}

export function updateInCache<T extends { id: number }>(
  /* eslint-disable-next-line */
  cacheKey: any,
  id: number,
  updater: (old: T) => T
) {
  const cachedData = queryCache.getQueryData(cacheKey) as CursorResponse<T>[];
  let didUpdate = false;

  if (cachedData) {
    for (const group of cachedData) {
      if (group.results.some((x) => x.id === id)) {
        didUpdate = true;
        group.results = group.results.map((x) =>
          x.id === id ? updater(x) : x
        );
      }
    }

    if (didUpdate) {
      queryCache.setQueryData(cacheKey, cachedData);
    }
  }
}

export function removeFromCache<T extends { id: number }>(
  /* eslint-disable-next-line */
  cacheKey: any,
  id: number
) {
  const cachedData = queryCache.getQueryData(cacheKey) as CursorResponse<T>[];
  let didRemove = false;

  if (cachedData) {
    for (const group of cachedData) {
      if (group.results.some((x) => x.id === id)) {
        didRemove = true;
        group.results = group.results.filter((x) => x.id !== id);
      }
    }

    if (didRemove) {
      queryCache.setQueryData(cacheKey, cachedData);
    }
  }
}
