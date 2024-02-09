import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Swal from "sweetalert2";
import useMembers from "../../hooks/useMembers";

const TrainingForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [level, setLevel] = useState("");
  const [id, setId] = useState("");

  const { training, submitTraining } = useMembers();

  const params = useParams();

  useEffect(() => {
    if (training?._id) {
      setId(training._id);
      setName(training.name);
      setDescription(training.description);
      setLevel(training.level);
      return;
    }
    setId("");
    setName("");
    setDescription("");
    setLevel("");
  }, [training]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, startDate, level].includes("")) {
      Swal.fire({
        title: "Atención!",
        text: "Todos los campos son obligatorios",
        icon: "warning",
        confirmButtonText: "Reintentar",
      });
      return;
    }
    await submitTraining({
      id,
      name,
      description,
      startDate,
      level,
      member: params.id,
    });
    setId("");
    setName("");
    setDescription("");
    setStartDate("");
    setLevel("");
  };

  return (
    <form className="my-10" onSubmit={handleSubmit}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor="name">Nombre del entrenamiento</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
              <AppRegistrationOutlinedIcon />
            </InputAdornment>
          }
          id="name"
          label="Nombre del entrenamiento"
          onChange={(e) => setName(e.target.value)}
          sx={{ label: { color: "#6b21a8" } }}
          type="text"
          value={name}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mt: 3 }}>
        <InputLabel htmlFor="name">Descripción del entrenamiento</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
              <AppRegistrationOutlinedIcon />
            </InputAdornment>
          }
          id="description"
          label="Descripción del entrenamiento"
          onChange={(e) => setDescription(e.target.value)}
          sx={{ label: { color: "#6b21a8" } }}
          type="text"
          value={description}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mt: 3 }}>
        <DemoItem
          label={
            <Grid container spacing={1} sx={{ ml: 1, alignItems: "center" }}>
              <p>Fecha de inicio de entrenamiento</p>
              <Tooltip title="Puede ser editable o terminada al momento de cambiar status">
                <IconButton>
                  <LiveHelpIcon fontSize="small" sx={{ color: "#6b21a8" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          }
        >
          <DatePicker
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
        </DemoItem>
      </FormControl>

      <FormControl sx={{ width: "100%", mt: 3 }}>
        <InputLabel id="level" sx={{ mb: "12px", fontSize: "0.875rem" }}>
          Nivel del entrenamiento
        </InputLabel>
        <Select
          labelId="level"
          fullWidth
          id="level"
          value={level}
          label="Nivel del entrenamiento"
          onChange={(e) => setLevel(e.target.value)}
        >
          <MenuItem value={"Principiante"}>Principiante</MenuItem>
          <MenuItem value={"Intermedio"}>Intermedio</MenuItem>
          <MenuItem value={"Avanzado"}>Avanzado</MenuItem>
          <MenuItem value={"Alto Nivel"}>Alto Nivel</MenuItem>
        </Select>
      </FormControl>

      <input
        type="submit"
        className="bg-yellow-300 hover:bg-purple-800 text-purple-800 hover:text-yellow-300 cursor-pointer w-full p-3 font-bold font-raleway mt-10 rounded transition-colors"
        value={id ? "Editar" : "Crear"}
      />
    </form>
  );
};

export default TrainingForm;
