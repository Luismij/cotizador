import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { NextPageComposed } from '~/types/NextComposed'

interface Props {}

const Dashboard: NextPageComposed<Props> = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>Dashboard</div>
    </>
  )
}

Dashboard.meta = {
  auth: true,
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    return {
      props: {},
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}
