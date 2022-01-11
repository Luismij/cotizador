import { GetServerSideProps } from 'next'
import { NextPageComposed } from '~/types/NextComposed'

interface Props {}

const Productos: NextPageComposed<Props> = () => {
  return (
    <>
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
