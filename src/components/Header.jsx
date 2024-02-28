import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PeopleIcon from "@mui/icons-material/People";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import JuniorsLogo from "../assets/images/juniors-gym-logo.png";
import "../styles/Header.css";

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation bg-black">
      <a href="/admin">
        {" "}
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-20 p-3" />
      </a>
      <a href="/admin" className="brand-name text-yellow-300 font-raleway">
        Junior's Gym
      </a>
      <button
        className="hamburger cursor-pointer bg-yellow-300 text-purple-800 hover:bg-purple-800 hover:text-yellow-300 transition-colors"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <MenuIcon />
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul className="font-raleway">
          <li className="text-yellow-300 hover:text-purple-800">
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/admin"
            >
              <AdminPanelSettingsIcon className="mr-2 flex items-center justify-center" />
              Panel inicial
            </Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/admin/members"
            >
              <PeopleIcon className="mr-2 flex items-center justify-center" />
              Usuarios
            </Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/admin/create-member"
            >
              <GroupAddOutlinedIcon className="mr-2 flex items-center justify-center" />
              Agregar nuevo usuario
            </Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/admin/send-reminder"
            >
              <WhatsAppIcon className="mr-2 flex items-center justify-center" />
              Recordatorios de pago
            </Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/admin/warehouse"
            >
              <WarehouseOutlinedIcon className="mr-2 flex items-center justify-center" />
              Inventario
            </Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/admin/visits"
            >
              <WavingHandIcon className="mr-2 flex items-center justify-center" />
              Visitas
            </Link>
          </li>
          <li className="text-yellow-300 hover:text-purple-800">
            <Link
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
              to="/"
            >
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
