import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Swal from "sweetalert2";
import axiosClient from "../config/axiosClient";
import JuniorsLogo from "../assets/images/juniors-gym-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      Swal.fire({
        title: "Atención!",
        text: "El email no puede ir vacío",
        icon: "warning",
        confirmButtonText: "Reintentar",
      });
      return;
    }

    try {
      const { data } = await axiosClient.post("/users/forgot-password", {
        email,
      });

      Swal.fire({
        title: "Éxito!",
        text: data.msg,
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    } catch (error) {
      Swal.fire({
        title: "Atención!",
        text: error.response.data.msg,
        icon: "warning",
        confirmButtonText: "Reintentar",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-5" />
        <h1 className="text-yellow-300 font-black text-5xl">
          Recupera tu<span className="text-purple-800"> acceso</span>
        </h1>
      </div>

      <form
        className="bg-white my-10 shadow-yellow-400 rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ width: "100%", mt: 3 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
                <EmailIcon />
              </InputAdornment>
            }
            id="email"
            label="Email"
            sx={{ label: { color: "#6b21a8" } }}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
          />
        </FormControl>

        <input
          type="submit"
          value="Enviar instrucciones"
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
          to="/register"
          className="block text-center my-5 text-yellow-300 uppercase text-sm"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
