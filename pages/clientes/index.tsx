import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/client'
import axios from '~/lib/axios'
import { Customer } from '~/models/Customer'
import { NextPageComposed } from '~/types/NextComposed'
import { MouseEvent, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
// https://github.com/react-hook-form/resolvers/issues/271
// eslint-disable-next-line
const { yupResolver } = require('@hookform/resolvers/yup')
import { Alert, AlertColor, Box, Button, Paper, Snackbar, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import FormDialog from '~/components/base/FormDialog'
import CrudHeader from '~/components/layout/CrudHeader'
import CustomerDataGrid from '~/components/datagrid/customer/CustomerDataGrid'
import CustomerFields from '~/components/customer/CustomerFields'
import CustomerSchema from '~/models/validation/Customer.schema'
import { createOne, deleteOne, updateOne } from '~/lib/customers'
import DeleteDialog from '~/components/customer/DeleteDialog'

interface Props {
  initialCustomers: Customer[]
  error?: Object
}

interface ISnackbarOptions {
  open?: boolean
  severity?: AlertColor
  message: string
}

const Clientes: NextPageComposed<Props> = ({ initialCustomers, error }: Props) => {
  const [session, loading] = useSession()
  const [customers, setCustomers] = useState(initialCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(null)
  const [createFormOpen, setCreateFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbarOptions>({
    open: false,
    severity: 'success',
    message: '',
  })

  const createFormMethods = useForm({ resolver: yupResolver(CustomerSchema) })
  const { handleSubmit, setValue } = createFormMethods

  const editFormMethods = useForm({ resolver: yupResolver(CustomerSchema) })
  const { handleSubmit: handleSubmitEdit, setValue: setValueEdit, getValues } = editFormMethods

  useEffect(() => {
    if (selectedCustomer) {
      Object.entries(selectedCustomer).forEach(([key, value]) => setValueEdit(key, value ?? ''))
    }
    return () => {}
  }, [selectedCustomer, setValueEdit, getValues])

  // Create dialog
  const onCreateSubmit = async (data: Customer) => {
    try {
      const newCustomer = await createOne(data, session?.accessToken as string)
      setCreateFormOpen(false)
      setSnackbarOptions({
        open: true,
        severity: 'success',
        message: 'Cliente creado con éxito',
      })
      setCustomers([...customers, newCustomer])
    } catch (error) {
      setSnackbarOptions({
        open: true,
        severity: 'error',
        message: 'Ocurrió un error creando el cliente',
      })
    }
  }

  const handleCreateOpen = () => {
    setCreateFormOpen(true)
  }

  const handleCreateClose = () => {
    setCreateFormOpen(false)
  }

  // Edit
  const onEditSubmit = async (data: Customer) => {
    try {
      const editedCustomer = await updateOne(data.id, data, session?.accessToken as string)
      setEditFormOpen(false)
      setSnackbarOptions({
        open: true,
        severity: 'success',
        message: 'Cliente editado con éxito',
      })
      const updatedCustomers = customers.map((cust) => (cust.id === editedCustomer.id ? editedCustomer : cust))
      setCustomers(updatedCustomers)
    } catch (error) {
      setSnackbarOptions({
        open: true,
        severity: 'error',
        message: 'Ocurrió un error editando el cliente',
      })
    }
  }

  const handleEditClick = (e: MouseEvent = null, customer: Customer) => {
    setSelectedCustomer(customer)
    setEditFormOpen(true)
  }

  const handleEditClose = () => {
    setEditFormOpen(false)
  }

  // Delete
  const handleDeleteClick = (e: MouseEvent, customer: Customer) => {
    setSelectedCustomer(customer)
    setDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = (e: MouseEvent) => {
    setDeleteDialogOpen(false)
  }

  const handleDelete = async () => {
    try {
      await deleteOne(selectedCustomer.id, session?.accessToken as string)
      setSnackbarOptions({
        open: true,
        severity: 'success',
        message: 'Cliente eliminado con éxito',
      })
      setDeleteDialogOpen(false)
      const updatedCustomers = customers.filter((cust) => {
        return cust.id !== selectedCustomer.id
      })
      setCustomers(updatedCustomers)
      setSelectedCustomer(null)
    } catch (error) {
      setSnackbarOptions({
        open: true,
        severity: 'error',
        message: 'Hubo un error al eliminar el cliente',
      })
    }
  }

  // Snackbar
  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOptions({ ...snackbarOptions, open: false })
  }

  return (
    <>
      <CrudHeader label="Cliente">
        <Button variant="contained" onClick={handleCreateOpen}>
          <Add sx={{ mr: 1 }} />
          Añade un cliente
        </Button>
      </CrudHeader>
      <Box sx={{ mx: 'auto', p: 2 }}>
        <Paper>
          <CustomerDataGrid customers={customers} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
        </Paper>
      </Box>
      {/* dialogs */}
      <>
        {/* Create dialog */}
        <FormDialog
          open={createFormOpen}
          handleClose={handleCreateClose}
          title="Añade un cliente"
          onSubmit={handleSubmit(onCreateSubmit)}
          keepMounted
        >
          <FormProvider {...createFormMethods}>
            <CustomerFields />
          </FormProvider>
        </FormDialog>

        {/* Edit form */}
        <FormDialog
          open={editFormOpen}
          handleClose={handleEditClose}
          title="Edita un cliente"
          onSubmit={handleSubmitEdit(onEditSubmit)}
          keepMounted
        >
          <FormProvider {...editFormMethods}>
            <CustomerFields />
          </FormProvider>
        </FormDialog>
        <DeleteDialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          name={selectedCustomer?.name}
          onDelete={handleDelete}
        />
      </>
      <Snackbar
        open={snackbarOptions.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarOptions.message}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarOptions.severity} sx={{ width: '100%' }}>
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    </>
  )
}

Clientes.meta = {
  auth: true,
  model: 'Clientes',
}

export default Clientes

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)
    const { accessToken } = session

    const { data: initialCustomers } = await axios.get<Customer[]>('/customers', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    return {
      props: {
        initialCustomers,
      },
    }
  } catch (error) {
    if (error.response) {
      return {
        props: {
          error: error.response.data,
        },
      }
    }
    return {
      props: {},
    }
  }
}
