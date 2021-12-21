import { NextPageComposed } from '~/types/NextComposed'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AccountForm from '~/components/account/AccountForm'
import { GetServerSideProps } from 'next'
import { User } from '~/models/User'
import axios from '~/lib/axios'
import { getSession } from 'next-auth/client'
import { getProfile } from '~/lib/users'

interface Props {
  profile?: User
}

const Cuenta: NextPageComposed<Props> = ({ profile }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ px: { sm: 2, md: 4 }, py: 4 }}>
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          Cuenta
        </Typography>
        <Typography variant="body2" sx={{ mb: 4 }}>
          Administra la información de tu cuenta.
        </Typography>
        <AccountForm profile={profile} />
      </Box>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)
    const accessToken = session.accessToken

    const profile = await getProfile(accessToken as string)

    return {
      props: {
        profile: profile,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: true,
      },
    }
  }
}

Cuenta.meta = {
  auth: true,
}

export default Cuenta
