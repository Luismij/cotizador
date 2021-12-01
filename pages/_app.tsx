import '../styles/globals.css'
import Layout from '~/components/layout/Default'

import { Provider } from 'next-auth/client'
import AuthGuard from '../components/auth/AuthGuard'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={session}>
      {Component.meta?.auth ? (
        <AuthGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  )
}

export default MyApp
