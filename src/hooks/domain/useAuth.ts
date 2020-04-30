import { useQuery } from 'react-query';
import * as devcamp from 'api/devcamp';

const fiveMinutes = 1000 * 60 * 5;
export const useAuth = () => {
  const { data, error, status } = useQuery('me', devcamp.getMe, {
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: fiveMinutes,
  });

  return {
    user: data,
    isAuthenticated: !!data,
    error: devcamp.extractErrorMsg(error),
    isLoading: status === 'loading',
  };
};
