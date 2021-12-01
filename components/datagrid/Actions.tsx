import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import { MouseEvent, MouseEventHandler } from 'react'
import { Customer } from '~/models/Customer'

interface Props {
  customerId: number
  customerName: string
  onEditClick?: (event?: MouseEvent<HTMLButtonElement>, customer?: Customer) => void
  onDeleteClick?: (event: MouseEvent<HTMLButtonElement>, customer?: Customer) => void
}

const Actions: React.FC<Props> = ({ customerId, customerName, onEditClick, onDeleteClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <IconButton aria-label={`Edita la empresa ${customerName}`} color="primary" onClick={onEditClick}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label={`Elimina la empresa ${customerName}`} color="error" onClick={onDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

export default Actions
