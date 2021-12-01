import { Box, Container, CssBaseline, Grid, Toolbar } from '@mui/material'
import { useState } from 'react'
import Header from '../nav/Header'
import Sidebar from '../nav/Sidebar'

interface Props {}

const Default: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <CssBaseline />
      {/* header */}
      <Header toggleDrawer={toggleDrawer}></Header>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', height: '100%' }}>
        {/* drawer */}
        <Sidebar open={open} />
        {/* content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
          bgcolor="grey.50"
        >
          <Toolbar />
          <Box>{children}</Box>
        </Box>
      </Box>
    </>
  )
}

export default Default
