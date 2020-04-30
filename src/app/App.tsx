import React from 'react';
import Main from 'Components/Layout/Main/index';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from 'Components/Layout/Nav/NavBar/index';
import RootRoutes from './RootRotes';
import { queryCache, ReactQueryConfigProvider } from 'react-query';
import * as devcamp from 'api/devcamp';
import { ReactQueryDevtools } from 'react-query-devtools';

const queryConfig = {
  refetchAllOnWindowFocus: false,
  onError: (err: unknown) => {
    const apiError = devcamp.extractApiError(err);
    if (apiError?.statusCode === 401) {
      queryCache.setQueryData('me', undefined);
    }
  },
};

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <Navbar />
        <Main>
          <RootRoutes />
        </Main>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryConfigProvider>
  );
};

export default App;
