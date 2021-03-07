import Head from 'next/head';
import { csrfToken } from 'next-auth/client';

export async function getServerSideProps(context)
{
  return {
    props: { csrfToken: await csrfToken(context) }
  };
}

function useLogin()
{
  /** @param {Event} event */
  const register = event =>
  {
    event.preventDefault();
  };

  return { register };
}

export default function Login({ csrfToken })
{
  const {
    register,
  } = useLogin();

  return (
    <>
      <Head>
        <title>Recall | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-100 flex flex-column justify-center items-center">
        <h1 className="fg-colored">Recall</h1>
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="flex flex-column items-center"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input name="username" type="text" className="mv2" placeholder="Username" />
          <input name="password" type="password" className="mv2" placeholder="Password" />
          <div className="flex mt2">
            <button type="submit" className="mr3">Login</button>
            <button onClick={register}>Register</button>
          </div>
        </form>
      </div>
    </>
  );
}
