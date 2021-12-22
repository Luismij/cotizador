import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import Link from '../base/Link'
import { User } from '~/models/User'

import { useForm } from 'react-hook-form'
import UserSchema from '~/models/validation/User.schema'
import { updateProfile } from '~/lib/users'
import { useSession } from 'next-auth/client'
import { useSnackbar } from 'notistack'
import Image from 'next/image'
import { blobLoader, mediaLoader } from '~/lib/media'
import { useEffect, useState } from 'react'
// https://github.com/react-hook-form/resolvers/issues/271
// eslint-disable-next-line
const { yupResolver } = require('@hookform/resolvers/yup')

interface Props {
  profile: User
}

interface UserFormFields {
  name: string
  nit: string
  logo: File
  address: string
  socialReason: string
  phone: string
  email: string
  webpage: string
}

const AccountForm: React.FC<Props> = ({ profile }) => {
  const [session, loading] = useSession()
  const [showDefaultImage, setShowDefaultImage] = useState<boolean>(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(UserSchema),
  })
  const logo = watch('logo')

  useEffect(() => {
    if (profile?.logo) {
      setShowDefaultImage(true)
    }
    if (logo === null || logo?.name) {
      setShowDefaultImage(false)
    }
  }, [logo, profile?.logo])

  const handleFileChange = (e) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const logo: File = e.target.files[0]
      setValue('logo', logo)
    }
  }

  const handleRemoveFile = (e) => {
    setValue('logo', null)
  }

  const onSubmit = async (data: User) => {
    try {
      await updateProfile(data, session?.accessToken as string)
      enqueueSnackbar('Tu perfil se editó con éxito', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Ocurrió un error actualizando tu perfil', { variant: 'error' })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box component="section">
        <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>
          Logo
        </Typography>
        <Card sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 300,
                height: 100,
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
                  src={profile?.logo}
                  loader={mediaLoader}
                  alt={`Logo de ${profile?.name}`}
                  layout="fill"
                  objectFit="contain"
                />
              )}

              {logo?.name && (
                <Image
                  src={URL.createObjectURL(logo)}
                  loader={blobLoader}
                  alt={`Logo de ${profile?.name}`}
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
        </Card>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>
            Información general
          </Typography>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                id="name"
                name="name"
                autoComplete="organization"
                label="Nombre*"
                variant="standard"
                helperText={`*Requerido. ${errors.name?.message ?? ''}`}
                error={!!errors.name}
                defaultValue={profile.name}
                {...register('name')}
              />
              <TextField
                id="nit"
                name="nit"
                label="NIT*"
                variant="standard"
                autoComplete="off"
                helperText={`*Requerido. ${errors.nit?.message ?? ''}`}
                error={!!errors.nit}
                defaultValue={profile.nit}
                {...register('nit')}
              />
              <TextField
                id="socialReason"
                name="socialReason"
                autoComplete="off"
                label="Razón social"
                type="text"
                variant="standard"
                error={!!errors.socialReason}
                helperText={errors.socialReason?.message ?? ''}
                defaultValue={profile.socialReason}
                {...register('socialReason')}
              />
            </Box>
          </Card>
        </Box>
        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>
            Información de contacto
          </Typography>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                id="email"
                name="email"
                autoComplete="email"
                label="Correo electrónico"
                variant="standard"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message ?? ''}
                defaultValue={profile.email}
                {...register('email')}
              />
              <TextField
                id="phone"
                name="phone"
                autoComplete="tel-local"
                label="Teléfono"
                type="text"
                variant="standard"
                error={!!errors.phone}
                helperText={errors.phone?.message ?? ''}
                defaultValue={profile.phone}
                {...register('phone')}
              />
              <TextField
                id="webpage"
                name="webpage"
                autoComplete="url"
                label="Página web"
                variant="standard"
                error={!!errors.webpage}
                helperText={errors.webpage?.message ?? ''}
                defaultValue={profile.webpage}
                {...register('webpage')}
              />
              <TextField
                id="address"
                name="address"
                autoComplete="address-line1"
                label="Dirección"
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.address}
                helperText={errors.address?.message ?? ''}
                defaultValue={profile.address}
                {...register('address')}
              />
            </Box>
          </Card>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
          <Button>
            <Link href="/dashboard" sx={{ textDecoration: 'none', color: 'inherit' }}>
              Cancelar
            </Link>
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AccountForm
