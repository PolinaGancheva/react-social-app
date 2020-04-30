import { signIn, signUp } from '../auth';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('api/devcamp/auth', () => {
  it('makes the correct request signin', async () => {
    mockAxios.onPost('/signin').reply(200, { id: 1 });
    const result = await signIn({ username: 'qwe', password: 'avc' });
    expect(result).toEqual({ id: 1 });
  });

  it('makes the correct request signup', async () => {
    mockAxios.onPost('/signup').reply(200, { id: 1 });
    const result = await signUp({
      name: 'abc',
      username: 'qwe',
      password: 'avc',
    });
    expect(result).toEqual({ id: 1 });
  });
});
