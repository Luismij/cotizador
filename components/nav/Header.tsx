import { Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu, Logout } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import { MouseEventHandler } from 'react'
import { signOut } from 'next-auth/client'

interface Props {
  toggleDrawer: MouseEventHandler<HTMLButtonElement>
}

const Header: React.FC<Props> = ({ toggleDrawer }) => {
  return (
    <AppBar elevation={0} sx={{ gridColumn: '1 / 3' }}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{
            marginRight: '36px',
          }}
        >
          <Menu />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {' '}
        </Typography>
        <Button onClick={() => signOut()} color="inherit">
          Cerrar sesión
          <Logout sx={{ ml: 1 }} />
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
