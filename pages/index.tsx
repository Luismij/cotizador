import { signIn, getProviders, getSession } from 'next-auth/client'
import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Box, Button } from '@mui/material'
import LoginForm from '../components/auth/LoginForm'

interface State {
  email: string
  password: string
  rememberMe: boolean
}

const Login = () => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn('credentials', {
      email: values.email,
      password: values.password,
    })
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
        }}
      >
        <Box sx={{ width: '100%', gap: '2rem', maxWidth: 'sm' }}>
          <LoginForm
            email={values.email}
            password={values.password}
            handleChange={handleChange}
            handleSubmit={handleLogin}
          ></LoginForm>
        </Box>
      </Box>
    </>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const isUser = !!session?.user

  if (isUser) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers: await getProviders(),
    },
  }
}
