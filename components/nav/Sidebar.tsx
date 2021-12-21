import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import SidebarItems from './SidebarItems'

interface Props {
  open: boolean
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'static',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    width: theme.spacing(30),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const NavBar: React.FC<Props> = ({ open }) => {
  return (
    <Drawer variant="permanent" open={open} sx={{ gridColumn: '1 / 2' }}>
      <Toolbar />
      <Divider />
      <List>
        <SidebarItems />
      </List>
    </Drawer>
  )
}

export default NavBar
