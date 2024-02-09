import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../config/axiosClient'
import JuniorsLogo from '../assets/images/juniors-gym-logo.png'

const ConfirmAccount = () => {
  const [confirmedAccount, setConfirmedAccount] = useState(false)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`
        const { data } = await axiosClient(url)

        Swal.fire({
          title: 'Éxito!',
          text: data.msg,
          icon: success,
          confirmButtonText: 'Reintentar',
        })

        setConfirmedAccount(true)
      } catch (error) {
        Swal.fire({
          title: 'Atención!',
          text: error.response.data.msg,
          icon: 'warning',
          confirmButtonText: 'Cerrar',
        })
      }
    }
    confirmAccount()
  }, [])

  return (
    <>
      <div className="flex justify-center items-center">
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-5" />
        <h1 className="text-yellow-300 font-black text-5xl">
          Tu cuenta ha sido<span className="text-purple-800"> confirmada</span>
        </h1>
      </div>
      <Link
        to="/"
        className="block text-center my-5 text-yellow-300 uppercase text-sm"
      >
        Iniciar sesión
      </Link>
    </>
  )
}

export default ConfirmAccount
