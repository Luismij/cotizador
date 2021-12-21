import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  currentImage?: string
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
const CustomerCreateFields: React.FC<Props> = ({ currentImage }) => {
  const [selectedImage, setSelectedImage] = useState<File>(null)
  const [showImage, setShowImage] = useState<boolean>(!!selectedImage || !!currentImage)

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<FormFields>()

  const handleFileChange = (e) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const logo: File = e.target.files[0]
      setValue('logo', logo)
      setSelectedImage(logo)
    }
  }

  const removeSelectedImage = (e) => {
    setSelectedImage(null)
    setValue('logo', null)
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          component="label"
          variant="outlined"
          sx={{
            height: 180,
            mx: 'auto',
            width: 320,
            background: showImage ? `no-repeat center/100% url(${URL.createObjectURL(selectedImage)})` : '',
            position: 'relative',
          }}
        >
          {!showImage ? (
            'Añade un logo'
          ) : (
            <Fab
              color="primary"
              aria-label="Quita este logo"
              size="small"
              sx={{ position: 'absolute', top: -20, right: -20 }}
              onClick={removeSelectedImage}
            >
              <CloseIcon />
            </Fab>
          )}
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            {...register('logo')}
            onChange={handleFileChange}
            hidden
          />
        </Button>
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
          defaultValue=" "
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
          defaultValue=" "
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
          defaultValue=" "
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
          defaultValue=" "
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
          defaultValue=" "
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
          defaultValue=" "
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
          defaultValue=" "
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
          defaultValue=" "
        ></TextField>
      </Box>
    </>
  )
}

export default CustomerCreateFields
