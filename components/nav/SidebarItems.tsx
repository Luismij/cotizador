import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import PaidIcon from '@mui/icons-material/Paid'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from '~/components/base/Link'

interface Props {}

const NavBarItems = (props: Props) => {
  return (
    <>
      <ListItem button>
        <Link href="/dashboard" sx={{ display: 'flex', width: '100%', textDecoration: 'none' }} color="inherit">
          <ListItemIcon aria-label="Dashboard">
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link href="/clientes" sx={{ display: 'flex', width: '100%', textDecoration: 'none' }} color="inherit">
          <ListItemIcon aria-label="Clientes">
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link href="/cotizaciones" sx={{ display: 'flex', width: '100%', textDecoration: 'none' }} color="inherit">
          <ListItemIcon aria-label="Cotizaciones">
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Cotizaciones" />
        </Link>
      </ListItem>
      {/* <ListItem button>
        <Link href="/productos" sx={{ display: 'flex', width: '100%', textDecoration: 'none' }} color="inherit">
          <ListItemIcon aria-label="Productos">
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Productos" />
        </Link>
      </ListItem> */}
    </>
  )
}

export default NavBarItems
