import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import Image from 'next/image'
import { blobLoader, mediaLoader } from '~/lib/media'
import { Customer } from '~/models/Customer'

interface Props {
  currentImage?: string
  customer?: Customer
}
interface FormFields {
  name: string
  nit: string
  contact: string
  logo: File
  address: string
  socialReason: string
  phone: string
  email: string
  webpage: string
}

/**
 * Customer fields for create and edit:
 * Contacto, Logo, Nit, Dirección, Razón Social, Teléfono, Correo, y Dirección Web
 * contact, logo, nit, address, socialReason, phone, email, webpage
 */
const CustomerCreateFields: React.FC<Props> = ({ customer }) => {
  const [selectedImage, setSelectedImage] = useState<File>(null)
  const [showDefaultImage, setShowDefaultImage] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormFields>()

  const logo = watch('logo')

  useEffect(() => {
    if (customer?.logo) {
      setShowDefaultImage(true)
    }
    if (logo === null || logo?.name) {
      setShowDefaultImage(false)
    }
  }, [logo, customer?.logo])

  const handleFileChange = (e) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const logo: File = e.target.files[0]
      setValue('logo', logo)
      setSelectedImage(logo)
    }
  }

  const handleRemoveFile = (e) => {
    setValue('logo', null)
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 350,
            height: 150,
            border: '1px solid black',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {showDefaultImage && (
            <Image
              src={customer.logo}
              loader={mediaLoader}
              alt={`Logo de ${customer.name}`}
              layout="fill"
              objectFit="contain"
            />
          )}

          {logo?.name && (
            <Image
              src={URL.createObjectURL(logo)}
              loader={blobLoader}
              alt={`Logo de ${customer?.name ?? 'un nuevo cliente'}`}
              layout="fill"
              objectFit="contain"
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Fab color="primary" aria-label="Cambia tu logo" size="small" component="label">
            <input
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              {...register('logo')}
              onChange={handleFileChange}
              hidden
            />
            <EditIcon />
          </Fab>
          <Fab color="inherit" aria-label="Quita este logo" size="small" onClick={handleRemoveFile}>
            <CloseIcon />
          </Fab>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          autoFocus
          error={!!errors.name}
          margin="dense"
          id="name"
          name="name"
          autoComplete="organization"
          label="Nombre*"
          type="text"
          fullWidth
          variant="outlined"
          helperText={`*Requerido. ${errors.name?.message ?? ''}`}
          {...register('name')}
        ></TextField>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          error={!!errors.nit}
          margin="dense"
          id="nit"
          name="nit"
          autoComplete="off"
          label="NIT*"
          type="text"
          fullWidth
          variant="outlined"
          helperText={`*Requerido. ${errors.nit?.message ?? ''}`}
          {...register('nit')}
        ></TextField>
        <TextField
          error={!!errors.socialReason}
          margin="dense"
          id="socialReason"
          name="socialReason"
          autoComplete="off"
          label="Razón social"
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.socialReason?.message ?? ''}
          {...register('socialReason')}
        ></TextField>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          error={!!errors.contact}
          margin="dense"
          id="contact"
          name="contact"
          autoComplete="name"
          label="Contacto"
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.contact?.message ?? ''}
          {...register('contact')}
        ></TextField>
        <TextField
          error={!!errors.phone}
          margin="dense"
          id="phone"
          name="phone"
          autoComplete="tel-local"
          label="Teléfono"
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.phone?.message ?? ''}
          {...register('phone')}
        ></TextField>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          error={!!errors.email}
          margin="dense"
          id="email"
          name="email"
          autoComplete="email"
          label="Correo electrónico"
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.email?.message ?? ''}
          {...register('email')}
        ></TextField>
        <TextField
          error={!!errors.webpage}
          margin="dense"
          id="webpage"
          name="webpage"
          autoComplete="url"
          label="Página web"
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.webpage?.message ?? ''}
          {...register('webpage')}
        ></TextField>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          error={!!errors.address}
          margin="dense"
          id="address"
          name="address"
          autoComplete="address-line1"
          label="Dirección"
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.address?.message ?? ''}
          {...register('address')}
        ></TextField>
      </Box>
    </>
  )
}

export default CustomerCreateFields
