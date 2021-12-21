import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

import { MouseEventHandler } from 'react'
import AccountMenu from '../layout/AccountMenu'
import { User } from '~/models/User'
import { useProfile } from '~/hooks/useProfile'
import Image from 'next/image'
import { mediaLoader } from '~/lib/media'

interface Props {
  toggleDrawer: MouseEventHandler<HTMLButtonElement>
}

const Header: React.FC<Props> = ({ toggleDrawer }) => {
  const { data: profile, status } = useProfile()

  return (
    <AppBar elevation={0} sx={{ gridColumn: '1 / 3' }}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        {profile?.logo && (
          <Box sx={{ position: 'relative', width: 100, height: 50, mr: 4 }}>
            <Image loader={mediaLoader} src={profile?.logo} alt={profile?.name} layout="fill" objectFit="contain" />
          </Box>
        )}
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
        <AccountMenu profile={profile} />
      </Toolbar>
    </AppBar>
  )
}

export default Header
