import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { MouseEventHandler } from 'react'

interface Props {
  open: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
  onDelete: MouseEventHandler<HTMLButtonElement>
  name: string
}

const DeleteDialog: React.FC<Props> = ({ open, onClose, onDelete, name }) => {
  if (!name) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">¿Eliminar la empresa {name}?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro que quiere eliminar la empresa {name}? Esta acción no se puede reversar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Cancelar
        </Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
