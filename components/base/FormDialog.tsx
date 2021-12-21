import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FormEventHandler, MouseEventHandler } from 'react'

interface Props {
  title?: string
  text?: string
  open: boolean
  onSubmit?: FormEventHandler<HTMLFormElement>
  handleClose: MouseEventHandler<HTMLButtonElement>
  keepMounted?: boolean
}

const FormDialog: React.FC<Props> = ({ title, text, onSubmit, open, handleClose, keepMounted, children }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} keepMounted={keepMounted} maxWidth="md" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContentText>{text}</DialogContentText>
        <form onSubmit={onSubmit}>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default FormDialog
