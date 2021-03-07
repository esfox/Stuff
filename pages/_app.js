import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'tachyons/css/tachyons.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/globals.scss';

import { StyleVariables } from '../components/StyleVariables';
import { Layout } from '../components/Layout';
import { AppContextProvider } from '../contexts/AppContext';

const queryClient = new QueryClient();

function App({ Component, pageProps })
{
  const router = useRouter();
  if(router.pathname === '/login')
    return <Component {...pageProps} />;

  const [session, loading] = useSession();
  if(typeof window !== 'undefined' && loading)
    return null;

  if(!session)
  {
    signIn();
    return null;
  }

  return (
    session
      ? (
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      )
      : null
  );
}

export default ({ Component, pageProps }) =>
  <AppContextProvider>
    <StyleVariables />
    <App Component={Component} pageProps={pageProps} />
  </AppContextProvider>;
