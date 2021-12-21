import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useState } from 'react'

interface Props {
  email: string
  password: string
  handleChange: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LoginForm: React.FC<Props> = ({ email, password, handleChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Box>

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', p: 4, gap: 2 }} onSubmit={handleSubmit}>
        <TextField
          id="email"
          value={email}
          onChange={handleChange('email')}
          aria-describedby="Email"
          label="Correo electrónico"
          fullWidth
        />
        <TextField
          id="password"
          value={password}
          onChange={handleChange('password')}
          type={showPassword ? 'text' : 'password'}
          aria-describedby="Password"
          label="Contraseña"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Cambiar visibilidad de la contraseña"
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div>
          <Button type="submit" fullWidth variant="contained">
            Iniciar sesión
          </Button>
        </div>
      </Box>
    </>
  )
}

export default LoginForm
