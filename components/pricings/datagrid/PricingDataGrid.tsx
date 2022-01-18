import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Pricing } from '~/models/Pricing'

interface Props {
  pricings: Pricing[]
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'id', hide: true },
  { field: 'number', headerName: '#', flex: 1 },
  { field: 'customer', headerName: 'Cliente', flex: 1 },
  { field: 'validSince', headerName: 'Fecha de cotización', flex: 1 },
  { field: 'validUntil', headerName: 'Fecha de vencimiento', flex: 1 },
]

const PricingDataGrid: React.FC<Props> = ({ pricings }) => {
  return (
    <Box sx={{ height: 750 }}>
      <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid rows={pricings} columns={columns} density="comfortable"></DataGrid>
        </Box>
      </Box>
    </Box>
  )
}

export default PricingDataGrid
