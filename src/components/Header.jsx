import { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import JuniorsLogo from '../assets/images/juniors-gym-logo.png'
import '../styles/Header.css'

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <nav className="navigation bg-black">
      <a href="/">
        {' '}
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-20 p-3" />
      </a>
      <a href="/" className="brand-name text-yellow-300 font-raleway">
        Junior's Gym
      </a>
      <button
        className="hamburger cursor-pointer bg-yellow-300 text-purple-800 hover:bg-purple-800 hover:text-yellow-300 transition-colors"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        <MenuIcon />
      </button>
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul className="font-raleway">
          <li className="text-yellow-300 hover:text-purple-800">
            <Link onClick={() => {setIsNavExpanded(!isNavExpanded)}} to="/admin">Panel inicial</Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link onClick={() => {setIsNavExpanded(!isNavExpanded)}} to="/admin/members">Usuarios</Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link onClick={() => {setIsNavExpanded(!isNavExpanded)}} to="/admin/create-member">Agregar nuevo usuario</Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link onClick={() => {setIsNavExpanded(!isNavExpanded)}} to="/admin/send-reminder">Recordatorios de pago</Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link onClick={() => {setIsNavExpanded(!isNavExpanded)}} to="/admin/warehouse">Inventario</Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link onClick={() => {setIsNavExpanded(!isNavExpanded)}} to="/">Cerrar sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
