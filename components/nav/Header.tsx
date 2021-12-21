import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'

import { MouseEventHandler } from 'react'
import { useSession } from 'next-auth/client'
import AccountMenu from '../layout/AccountMenu'

interface Props {
  toggleDrawer: MouseEventHandler<HTMLButtonElement>
}

const Header: React.FC<Props> = ({ toggleDrawer }) => {
  const [session, loading] = useSession()
  const user = session.user ?? null

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
        <AccountMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Header
