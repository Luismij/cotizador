import { Box, Button } from '@mui/material'
import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/client'
import Sidebar from '~/components/nav/Sidebar'
import axios from '~/lib/axios'
import { NextPageComposed } from '~/types/NextComposed'

interface Props {}

const Dashboard: NextPageComposed<Props> = () => {
  return (
    <>
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
