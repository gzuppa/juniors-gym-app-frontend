import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";
import JuniorsLogo from "../assets/images/juniors-gym-logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      Swal.fire({
        title: "Atención!",
        text: "Todos los campos son obligatorios",
        icon: "warning",
        confirmButtonText: "Reintentar",
      });
      return;
    }

    try {
      const { data } = await axiosClient.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/admin");
    } catch (error) {
      Swal.fire({
        title: "Atención!",
        text: error.response.data.msg,
        icon: "error",
        confirmButtonText: "Reintentar",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-5" />
        <h1 className="text-yellow-300 font-black text-5xl">
          Bienvenido a <span className="text-purple-800">Junior's Gym</span>
        </h1>
      </div>

      <form
        className="bg-white my-10 shadow-yellow-400 rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
                <EmailIcon />
              </InputAdornment>
            }
            id="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ label: { color: "#6b21a8" } }}
            type="text"
            value={email}
          />
        </FormControl>

        <FormControl sx={{ width: "100%", mt: 3 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{ color: "#6b21a8" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            value={password}
          />
        </FormControl>
        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-yellow-300 w-full py-3 text-purple-800 font-bold rounded-lg hover:cursor-pointer hover:bg-purple-800 hover:text-yellow-300 transition-colors mt-5 mb-5"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/register"
          className="block text-center my-5 text-yellow-300 uppercase text-sm"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link
          to="/forgot-password"
          className="block text-center my-5 text-yellow-300 uppercase text-sm"
        >
          Olvidé mi password
        </Link>
      </nav>
      <div>
        <Link
          to="/"
          className="block text-center my-5 text-yellow-300 uppercase text-sm"
        >
          Regresar al home
        </Link>
      </div>
    </>
  );
};

export default Login;
