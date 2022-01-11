import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { NextPageComposed } from '~/types/NextComposed'

interface Props {}

const Productos: NextPageComposed<Props> = () => {
  return (
    <>
      <Head>
        <title>Productos</title>
      </Head>
      <div>Productos</div>
    </>
  )
}

Productos.meta = {
  auth: true,
}

export default Productos

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
