import { Box } from '@mui/system'
import { DataGrid, GridCallbackDetails, GridColDef } from '@mui/x-data-grid'
import { MouseEvent } from 'react'
import { Customer } from '~/models/Customer'
import Actions from './cells/Actions'
import ContactCell from './cells/ContactCell'
import CustomerCell from './cells/CustomerCell'

interface Props {
  customers: Customer[]
  page?: number
  onPageChange?: (page: number, details: GridCallbackDetails) => void
  onEditClick?: (event: MouseEvent<HTMLButtonElement>, customer?: Customer) => void
  onDeleteClick?: (event: MouseEvent<HTMLButtonElement>, customer?: Customer) => void
}

const columns: GridColDef[] = [
  { field: 'id', headerName: '#', hide: true },
  { field: 'name', headerName: 'Nombre', hide: true },
  { field: 'logo', headerName: 'Logo', hide: true },
  {
    field: 'email',
    headerName: 'Email',
    hide: true,
  },
  { field: 'contact', headerName: 'Contacto', hide: true },
  {
    field: 'phone',
    headerName: 'Teléfono',
    hide: true,
  },
  {
    field: 'customer',
    headerName: 'Cliente',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <CustomerCell
        name={params.getValue(params.id, 'name') as string}
        logo={params.getValue(params.id, 'logo') as string}
        email={params.getValue(params.id, 'email') as string}
      />
    ),
  },
  { field: 'nit', headerName: 'NIT', flex: 1, minWidth: 150 },
  {
    field: 'contactPhone',
    headerName: 'Contacto',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <ContactCell
        contact={params.getValue(params.id, 'contact') as string}
        phone={params.getValue(params.id, 'phone') as string}
      />
    ),
  },
]

const CustomerDataGrid: React.FC<Props> = ({ customers, page, onPageChange, onEditClick, onDeleteClick }) => {
  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Acciones',
    minWidth: 100,
    renderCell: (params) => (
      <Actions
        customerId={params.getValue(params.id, 'id') as number}
        customerName={params.getValue(params.id, 'name') as string}
        onEditClick={(event) => onEditClick(event, params.row as Customer)}
        onDeleteClick={(event) => onDeleteClick(event, params.row as Customer)}
      />
    ),
  }

  return (
    <Box sx={{ height: 750 }}>
      <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            rows={customers}
            columns={[...columns, actions]}
            density="comfortable"
            page={page}
            onPageChange={onPageChange}
          ></DataGrid>
        </Box>
      </Box>
    </Box>
  )
}

export default CustomerDataGrid
