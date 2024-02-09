import { Fragment, useEffect, useState } from "react";
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
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import useMembers from "../../hooks/useMembers";

const TrainingFormModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [level, setLevel] = useState("");
  const [id, setId] = useState("");
  const { handleTrainingModal, training, submitTraining, trainingModal } =
    useMembers();
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
    <Transition.Root show={trainingModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleTrainingModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-purple-800 hover:text-purple-500 focus:outline-none"
                  onClick={handleTrainingModal}
                >
                  <span className="sr-only">Cerrar</span>
                  <CloseOutlinedIcon />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 font-bold text-purple-800"
                  >
                    {id ? "Editar entrenamiento" : "Crear entrenamiento"}
                  </Dialog.Title>
                  <form className="my-10" onSubmit={handleSubmit}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel htmlFor="name">
                        Nombre del entrenamiento
                      </InputLabel>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: "#6b21a8" }}
                          >
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
                      <InputLabel htmlFor="name">
                        Descripción del entrenamiento
                      </InputLabel>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: "#6b21a8" }}
                          >
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
                          <Grid
                            container
                            spacing={1}
                            sx={{ ml: 1, alignItems: "center" }}
                          >
                            <p>Fecha de inicio de entrenamiento</p>
                            <Tooltip title="Puede ser editable o terminada al momento de cambiar status">
                              <IconButton>
                                <LiveHelpIcon
                                  fontSize="small"
                                  sx={{ color: "#6b21a8" }}
                                />
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
                      <InputLabel
                        id="level"
                        sx={{ mb: "12px", fontSize: "0.875rem" }}
                      >
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
                      className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway w-full mt-10"
                      value={
                        id ? "Editar entrenamiento" : "Crear entrenamiento"
                      }
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TrainingFormModal;
