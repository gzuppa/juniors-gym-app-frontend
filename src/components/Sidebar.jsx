import React, { useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PeopleIcon from "@mui/icons-material/People";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { NavLink } from "react-router-dom";
import JuniorsLogo from "../assets/images/logo-transparent.png";
import useAuth from "../hooks/useAuth";
import useMembers from "../hooks/useMembers";
import "../styles/Sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { closeSessionAuth } = useAuth();
  const { closeSession } = useMembers();

  const toggle = () => setIsOpen(!isOpen);

  const handleCloseSession = () => {
    closeSession();
    closeSessionAuth();
    localStorage.removeItem("token");
  };

  const menuItem = [
    {
      path: "",
      name: "Panel inicial",
      icon: <AdminPanelSettingsIcon />,
    },
    {
      path: "members",
      name: "Usuarios",
      icon: <PeopleIcon />,
    },
    {
      path: "create-member",
      name: "Agregar nuevo usuario",
      icon: <GroupAddOutlinedIcon />,
    },
    {
      path: "send-reminder",
      name: "Recordatorios de pago",
      icon: <WhatsAppIcon />,
    },
    {
      path: "warehouse",
      name: "Inventario",
      icon: <WarehouseOutlinedIcon />,
    },
  ];
  return (
    <div>
      <div
        style={{ width: isOpen ? "200px" : "50px" }}
        className="sidebar font-raleway"
      >
        <div className="top_section text-yellow-300">
          <a href="/">
            <img
              style={{ display: isOpen ? "block" : "none" }}
              src={JuniorsLogo}
              alt="JuniorsLogo"
              className="h-20 mr-5"
            />
          </a>

          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <MenuOpenIcon onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link text-yellow-300 hover:text-purple-800"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <button
          type="button"
          className="text-yellow-300"
          onClick={handleCloseSession}
        >
          Cerrar sesión
        </button>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
