import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import Swal from 'sweetalert2'
import axiosClient from '../config/axiosClient'
import JuniorsLogo from '../assets/images/juniors-gym-logo.png'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, email, password, confirmPassword].includes('')) {
      Swal.fire({
        title: 'Atención!',
        text: 'Todos los campos son obligatorios',
        icon: 'warning',
        confirmButtonText: 'Reintentar',
      })
      return
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Atención!',
        text: 'Los passwords no son iguales',
        icon: 'warning',
        confirmButtonText: 'Reintentar',
      })
      return
    }

    if (password.length < 6) {
      Swal.fire({
        title: 'Atención!',
        text: 'El password es muy corto, agrega al menos 6 caracteres',
        icon: 'warning',
        confirmButtonText: 'Reintentar',
      })
      return
    }

    try {
      const { data } = await axiosClient.post('/users', {
        name,
        email,
        password,
      })

      Swal.fire({
        title: 'Éxito!',
        text: data.msg,
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })

      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.msg,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      })
    }
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-5" />
        <h1 className="text-yellow-300 font-black text-5xl">
          Crea tu<span className="text-purple-800"> cuenta</span>
        </h1>
      </div>

      <form
        className="bg-white my-10 shadow-yellow-400 rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ width: '100%' }}>
          <InputLabel htmlFor="name">Nombre</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                <SupervisorAccountIcon />
              </InputAdornment>
            }
            id="name"
            label="name"
            onChange={e => setName(e.target.value)}
            sx={{ label: { color: '#6b21a8' } }}
            type="text"
            value={name}
          />
        </FormControl>

        <FormControl sx={{ width: '100%', mt: 3 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end" sx={{ color: '#6b21a8' }}>
                <EmailIcon />
              </InputAdornment>
            }
            id="email"
            label="Email"
            onChange={e => setEmail(e.target.value)}
            sx={{ label: { color: '#6b21a8' } }}
            type="text"
            value={email}
          />
        </FormControl>

        <FormControl sx={{ width: '100%', mt: 3 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{ color: '#6b21a8' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            id="password"
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
        </FormControl>

        <FormControl sx={{ width: '100%', mt: 3 }}>
          <InputLabel htmlFor="password2">Confirma tu password</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{ color: '#6b21a8' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            id="password2"
            onChange={e => setConfirmPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
          />
        </FormControl>

        <input
          type="submit"
          value="Crear cuenta"
          className="bg-yellow-300 w-full py-3 text-purple-800 font-bold rounded-lg hover:cursor-pointer hover:bg-purple-800 hover:text-yellow-300 transition-colors mt-5 mb-5"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-yellow-300 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? Iniciar sesión
        </Link>
        <Link
          to="/forgot-password"
          className="block text-center my-5 text-yellow-300 uppercase text-sm"
        >
          Olvidé mi password
        </Link>
      </nav>
    </>
  )
}

export default Register
