import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Dashboard, People } from '@mui/icons-material'
import Link from '~/components/base/Link'

interface Props {}

const NavBarItems = (props: Props) => {
  return (
    <>
      <ListItem button>
        <Link href="/dashboard" sx={{ display: 'flex', width: '100%', textDecoration: 'none' }} color="inherit">
          <ListItemIcon aria-label="Dashboard">
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link href="/clientes" sx={{ display: 'flex', width: '100%', textDecoration: 'none' }} color="inherit">
          <ListItemIcon aria-label="Dashboard">
            <People />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </Link>
      </ListItem>
    </>
  )
}

export default NavBarItems
