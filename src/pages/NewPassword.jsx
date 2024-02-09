import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosClient from "../config/axiosClient";
import JuniorsLogo from "../assets/images/juniors-gym-logo.png";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        Swal.fire({
          title: "Atención!",
          text: error.response.data.msg,
          icon: "warning",
          confirmButtonText: "Reintentar",
        });
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "El password debe tener al menos 6 caracteres",
        icon: "error",
        confirmButtonText: "Reintentar",
      });
    }

    try {
      const url = `http://localhost:4000/api/users/forgot-password/${token}`;
      const { data } = await axiosClient.post(url, { password });

      Swal.fire({
        icon: "success",
        title: "Éxito!",
        text: data.msg,
        confirmButtonText: "Cerrar",
        footer: '<a href="/">Iniciar sesión</a>',
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
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
          Reestablece tu<span className="text-purple-800"> password</span>
        </h1>
      </div>

      {validToken && (
        <form
          className="bg-white my-10 shadow-yellow-400 rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <FormControl sx={{ width: "100%", mt: 3 }}>
            <InputLabel htmlFor="password">Nuevo Password</InputLabel>
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
            value="Guardar nuevo password"
            className="bg-yellow-300 w-full py-3 text-purple-800 font-bold rounded-lg hover:cursor-pointer hover:bg-purple-800 hover:text-yellow-300 transition-colors mt-5 mb-5"
          />
        </form>
      )}
    </>
  );
};

export default NewPassword;
