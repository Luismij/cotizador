import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
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
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {' '}
        </Typography>
        <Button onClick={() => signOut()} color="inherit">
          Cerrar sesión
          <LogoutIcon sx={{ ml: 1 }} />
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
