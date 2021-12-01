import { NextPage } from 'next'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { ReactElement, ReactNode } from 'react'
import { LinkProps } from '~/components/base/Link'

export type NextPageComposed<P = {}, IP = P> = NextPage<P, IP> & {
  meta?: {
    auth?: boolean
    breadcrumbs?: Breadcrumbs
    model?: string
    layout?: (page: ReactElement) => ReactNode
  }
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageComposed
}

export type Breadcrumbs = LinkProps & {
  label?: string
}
