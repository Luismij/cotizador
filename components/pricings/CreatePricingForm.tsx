import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import DatePicker from '@mui/lab/DatePicker'
import SellerInfo from './SellerInfo'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteIcon from '@mui/icons-material/Delete'

import { User } from '~/models/User'
import { Customer } from '~/models/Customer'
import { PricingDetail } from '~/models/PricingDetail'
import { Pricing } from '~/models/Pricing'
import PricingSchema from '~/models/validation/Pricing.schema'
import { Product } from '~/models/Product'
import { useState } from 'react'

interface Props {
  customers: Customer[]
  profile: User
}

interface PricingFormFields {
  number: string
  customer: string
  validSince: Date
  validUntil: Date
  details: PricingDetail[]
}

const CreatePricingForm: React.FC<Props> = ({ customers, profile }) => {
  const [products, setProducts] = useState<Product[]>([])
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PricingFormFields>({ resolver: yupResolver(PricingSchema) })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'details',
    keyName: 'id',
  })

  const details: PricingDetail[] = watch('details')
  const customerOptions = customers.map(({ id, nit, name, ...other }) => {
    return { label: `${name} - ${nit}`, value: id, id, nit, name, ...other }
  })

  const onCreateSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onCreateSubmit, onCreateSubmit)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SellerInfo profile={profile} />
          <Stack sx={{ gap: 4 }}>
            <TextField
              {...register('number')}
              label="Cotización"
              InputProps={{
                startAdornment: <InputAdornment position="start">#</InputAdornment>,
              }}
              error={!!errors.number}
              helperText={errors.number?.message ?? ''}
            />
            <Controller
              control={control}
              name="validSince"
              render={({ field }) => (
                <DatePicker
                  label="Fecha de cotización"
                  inputFormat="dd/MM/yyyy"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  renderInput={({ error, helperText, ...params }) => (
                    <TextField error={!!errors.validSince} helperText={errors.validSince?.message ?? ''} {...params} />
                  )}
                />
              )}
            />
            <Controller
              control={control}
              name="validUntil"
              render={({ field }) => (
                <DatePicker
                  label="Fecha de vencimiento"
                  inputFormat="dd/MM/yyyy"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  renderInput={({ error, helperText, ...params }) => (
                    <TextField error={!!errors.validUntil} helperText={errors.validUntil?.message ?? ''} {...params} />
                  )}
                />
              )}
            />
          </Stack>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary.dark">
            Información del cliente
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Controller
            name="customer"
            control={control}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={customerOptions}
                id="customer-select"
                onChange={(e, data) => field.onChange(data)}
                sx={(theme) => ({
                  [theme.breakpoints.down('md')]: { width: '100%' },
                  [theme.breakpoints.up('md')]: { width: 500 },
                })}
                renderInput={(params) => (
                  <TextField
                    error={!!errors.customer}
                    helperText={errors.customer?.message ?? ''}
                    {...params}
                    label="Cliente"
                  />
                )}
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary.dark">
            Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {fields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 4,
                  flex: 1,
                }}
              >
                <TextField
                  {...register(`details.${index}.item` as const)}
                  label="Item"
                  sx={{ flex: 1 }}
                  error={!!errors.details?.at(index)?.item}
                  helperText={errors.details?.at(index)?.item?.message ?? ''}
                />
                {/* Add autocomplete for products */}
                <TextField
                  {...register(`details.${index}.price` as const)}
                  label="Precio"
                  type="number"
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  error={!!errors.details?.at(index)?.price}
                  helperText={errors.details?.at(index)?.price?.message ?? ''}
                />
                <TextField
                  {...register(`details.${index}.quantity` as const)}
                  label="Cantidad"
                  type="number"
                  sx={{ flex: 1 }}
                  error={!!errors.details?.at(index)?.quantity}
                  helperText={errors.details?.at(index)?.quantity?.message ?? ''}
                />
                <TextField
                  sx={{ flex: 1, display: 'inline-flex', alignItems: 'center' }}
                  InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  value={
                    isNaN(details[index]?.quantity * details[index]?.price)
                      ? 0
                      : details[index]?.quantity * details[index]?.price
                  }
                />
              </Box>
              <Box>
                <IconButton aria-label="Detalles de este item">
                  <SettingsIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="Remueve este producto" onClick={() => remove(index)}>
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Button
            onClick={() => {
              append({ id: fields.length })
            }}
            sx={{ ml: 1 }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Añade un item
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Button type="submit" variant="contained">
          Crear cotización
        </Button>
      </form>
    </>
  )
}

export default CreatePricingForm
