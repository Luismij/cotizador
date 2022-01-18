import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { NextPageComposed } from '~/types/NextComposed'
import SectionHeader from '~/components/layout/SectionHeader'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import Link from '~/components/base/Link'
import PricingDataGrid from '~/components/pricings/datagrid/PricingDataGrid'
import { getMany } from '~/lib/pricings'
import { getSession } from 'next-auth/client'
import { Pricing } from '~/models/Pricing'

interface Props {
  pricings?: Pricing[]
}

const Cotizaciones: NextPageComposed<Props> = ({ pricings }) => {
  return (
    <>
      <Head>
        <title>Cotizaciones</title>
      </Head>
      <>
        <SectionHeader label="Cotizaciones">
          <Button component={Link} href="/cotizaciones/crear" variant="contained">
            <AddIcon sx={{ mr: 1 }} />
            Añade una cotización
          </Button>
        </SectionHeader>
        <Box sx={{ mx: 'auto', p: 2 }}>
          <Paper>
            <PricingDataGrid pricings={pricings} />
          </Paper>
        </Box>
      </>
    </>
  )
}

Cotizaciones.meta = {
  auth: true,
}

export default Cotizaciones

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)
    const { accessToken } = session

    const pricings = await getMany(accessToken as string)

    return {
      props: {},
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}
