import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { NextPageComposed } from '~/types/NextComposed'
import { getSession } from 'next-auth/client'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'

import { Customer } from '~/models/Customer'
import CreatePricingForm from '~/components/pricings/CreatePricingForm'
import { getMany } from '~/lib/customers'
import { getProfile } from '~/lib/users'
import { User } from '~/models/User'

interface Props {
  customers?: Customer[]
  profile?: User
}

const CrearCotizacion: NextPageComposed<Props> = ({ customers, profile }) => {
  return (
    <>
      <Head>
        <title>Crear cotizaciones</title>
      </Head>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Card sx={{ py: 2, px: 4 }}>
          {customers ? (
            <CreatePricingForm customers={customers} profile={profile} />
          ) : (
            <Box>Hubo un error cargando la cotización</Box>
          )}
        </Card>
      </Container>
    </>
  )
}

CrearCotizacion.meta = {
  auth: true,
}

export default CrearCotizacion

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)
    const { accessToken } = session

    const customers = await getMany(accessToken as string)
    const profile = await getProfile(accessToken as string)

    return {
      props: {
        customers,
        profile,
      },
    }
  } catch (error) {
    if (error.response) {
      return {
        props: {
          error: error.response.data,
        },
      }
    }
    return {
      props: {},
    }
  }
}
