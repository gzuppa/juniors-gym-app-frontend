import { useState } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Swal from "sweetalert2";
import useMembers from "../../hooks/useMembers";

const TrainerForm = () => {
  const [name, setName] = useState("");
  const { submitTrainer } = useMembers();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      Swal.fire({
        title: "Atención!",
        text: "El nombre es obligatorio",
        icon: "warning",
        confirmButtonText: "Reintentar",
      });
      return;
    }
    submitTrainer(name);
  };

  return (
    <form
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor="name">Nombre</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
              <PersonIcon />
            </InputAdornment>
          }
          id="name"
          label="Nombre"
          onChange={(e) => setName(e.target.value)}
          sx={{ label: { color: "#6b21a8" } }}
          type="text"
          value={name}
        />
      </FormControl>

      <input
        type="submit"
        className="bg-yellow-300 hover:bg-purple-800 text-purple-800 hover:text-yellow-300 cursor-pointer w-full p-3 font-bold font-raleway mt-10 rounded transition-colors"
        value="Buscar entrenador"
      />
    </form>
  );
};

export default TrainerForm;
