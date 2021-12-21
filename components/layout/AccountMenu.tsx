import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import Link from '../base/Link'
import { useState } from 'react'
import { signOut } from 'next-auth/client'
import { getMediaUrl } from '~/lib/media'
import { User } from '~/models/User'

interface Props {
  profile?: User
}

const AccountMenu: React.FC<Props> = ({ profile }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        id="account-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar src={getMediaUrl(profile?.logo)} alt={profile?.name}></Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'account-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Link href="/cuenta" sx={{ textDecoration: 'none', color: 'inherit' }}>
              Mi cuenta
            </Link>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box onClick={() => signOut()} sx={{ display: 'inline-flex' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cerrar sesión</ListItemText>
          </Box>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AccountMenu
