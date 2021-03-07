import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options =
{
  // Configure one or more authentication providers
  pages:
  {
    signIn: '/login',
  },
  providers:
    [
      Providers.Credentials({
        name: 'Credentials',
        credentials:
        {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' }
        },
        authorize: async credentials =>
        {
          const validLogin = credentials.username === 'recall' && credentials.password === 'recall';
          return Promise.resolve(validLogin);
        }
      })
    ],
};

export default (req, res) => NextAuth(req, res, options);
