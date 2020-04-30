/* eslint-disable */

import React from 'react';

//

export function isObject(a) {
  return a && typeof a === 'object' && !Array.isArray(a);
}

export function useGetLatest(obj) {
  const ref = React.useRef();
  ref.current = obj;

  return React.useCallback(() => ref.current, []);
}

export function getQueryArgs(args) {
  if (isObject(args[0])) {
    if (
      args[0].hasOwnProperty('queryKey') &&
      args[0].hasOwnProperty('queryFn')
    ) {
      const { queryKey, variables = [], queryFn, config = {} } = args[0];
      return [queryKey, variables, queryFn, config];
    } else {
      throw new Error('queryKey and queryFn keys are required.');
    }
  }
  if (typeof args[2] === 'function') {
    const [queryKey, variables = [], queryFn, config = {}] = args;
    return [queryKey, variables, queryFn, config];
  }

  const [queryKey, queryFn, config = {}] = args;

  return [queryKey, [], queryFn, config];
}
