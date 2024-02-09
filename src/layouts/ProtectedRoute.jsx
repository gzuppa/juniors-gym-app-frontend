import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loader from '../assets/files/Loader'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const ProtectedRoute = () => {
  const { auth, loading } = useAuth()

  if (loading) return <Loader />

  return (
    <>
      {auth._id ? (
        <div>
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default ProtectedRoute
