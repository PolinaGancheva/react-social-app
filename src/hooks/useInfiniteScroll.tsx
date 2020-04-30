import { useEffect, useRef } from 'react';
import useConstant from './useConstant';

interface IOptions {
  /**
   * Callback invoked when the threshold is reached
   */
  onLoadMore: () => void;
  /**
   * Indicates whether records are currently being loaded
   */
  loading: boolean;
  /**
   * Indicates whether there are more records to load
   */
  hasMore: boolean;
  /**
   * Defaults to the viewport
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#The_intersection_root_and_root_margin
   */
  root?: Element | null;
  /**
   * Defaults to '100px'
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#The_intersection_root_and_root_margin
   */
  rootMargin?: string;
}

function useInfiniteScroll<T extends Element>({
  onLoadMore,
  loading,
  hasMore,
  root = null,
  rootMargin = '100px',
}: IOptions) {
  const boundaryRef = useRef<T>(null);
  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;

  const intObserver = useConstant(
    () =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onLoadMoreRef.current();
            }
          });
        },
        { root, rootMargin }
      )
  );

  useEffect(() => {
    if (boundaryRef.current && !loading && hasMore) {
      intObserver.observe(boundaryRef.current);
    }

    return () => intObserver.disconnect();
  }, [intObserver, loading, hasMore]);

  return boundaryRef;
}

export default useInfiniteScroll;
