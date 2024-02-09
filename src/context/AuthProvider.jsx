import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const { data } = await axiosClient('/users/profile', config)
        setAuth(data)
        // navigate('/admin')
      } catch (error) {
        setAuth({})
      } finally {
        setLoading(false)
      }
    }
    authUser()
  }, [])

  const closeSessionAuth = () => {
    setAuth({})
  }

  return (
    <AuthContext.Provider value={{ auth, closeSessionAuth, loading, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
