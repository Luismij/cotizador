import '../styles/globals.css'
import Layout from '~/components/layout/DefaultLayout'
import { SnackbarProvider } from 'notistack'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { Provider } from 'next-auth/client'
import AuthGuard from '../components/auth/AuthGuard'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SnackbarProvider maxSnack={3}>
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
      </SnackbarProvider>
    </LocalizationProvider>
  )
}

export default MyApp
