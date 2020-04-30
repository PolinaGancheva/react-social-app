import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignIn from '../SignIn';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { AuthContextProvider, AuthContext } from 'contexts/AuthContext';

jest.mock('api/devcamp', () => ({
  getMe: jest.fn().mockResolvedValue(null),
  signIn: jest.fn().mockImplementation(() =>
    Promise.resolve({
      id: 1,
      username: 'proba',
      name: 'Proba Proba',
    })
  ),
}));

describe('SignIn page', () => {
  it('renders without crashing', () => {
    render(
      <Router history={createMemoryHistory()}>
        <SignIn />
      </Router>
    );
  });

  it('renders without crashing', async () => {
    const history = createMemoryHistory();
    const { rerender } = render(
      <AuthContextProvider>
        <Router history={history}>
          <SignIn />
        </Router>
        <AuthContext.Consumer>{({ user }) => user?.name}</AuthContext.Consumer>
      </AuthContextProvider>
    );

    expect(screen.queryByText('Proba Proba')).toBeFalsy();

    const usernameInput = await screen.findByLabelText('Username');
    fireEvent.change(usernameInput, {
      target: { value: 'testuser' },
    });

    const passwordInput = await screen.findByLabelText('Password');
    fireEvent.change(passwordInput, {
      target: { value: 'testpassword' },
    });

    fireEvent.click(screen.getByText('Submit'));

    rerender(
      <AuthContextProvider>
        <Router history={history}>
          <SignIn />
        </Router>
        <AuthContext.Consumer>{({ user }) => user?.name}</AuthContext.Consumer>
      </AuthContextProvider>
    );

    await screen.findByText('Proba Proba');
  });
});
