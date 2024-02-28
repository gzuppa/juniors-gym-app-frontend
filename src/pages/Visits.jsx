import PersonIcon from "@mui/icons-material/Person";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import VisitTable from "../components/Visits/VisitTable";
import useMembers from "../hooks/useMembers";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

const Visits = () => {
  const { visit, handleNewVisitModal, newVisit } = useMembers();
  const [name, setName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitPay, setVisitPay] = useState("");

  useEffect(() => {
    if (visit?._id) {
      setName(visit.name);
      setVisitDate(visit.visitDate);
      setVisitPay(visit.visitPay);
      return;
    }
    setName("");
    setVisitDate("");
    setVisitPay("");
  }, [visit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, visitDate, visitPay].includes("")) {
      Swal.fire({
        title: "Atención!",
        text: "Todos los campos son obligatorios",
        icon: "warning",
        confirmButtonText: "Reintentar",
      });
      return;
    }
    await newVisit({
      name,
      visitDate,
      visitPay,
    });
    setName("");
    setVisitDate("");
    setVisitPay("");
  };

  return (
    <>
      <div className="text-yellow-300 mb-6 text-4xl font-raleway">Visitas</div>
      <button
        type="button"
        onClick={handleNewVisitModal}
        className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway mt-5 mb-8 w-full md:w-auto flex items-center justify-center"
      >
        <LibraryAddOutlinedIcon className="mr-2" />
        Registrar visita
      </button>
      <VisitTable />

      <div className="flex justify-center mt-10">
        <form
          className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <FormControl sx={{ width: "100%", mb: 2 }}>
              <InputLabel htmlFor="name">Nombre del usuario</InputLabel>
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

            <DemoItem label="Fecha de visita">
              <DatePicker
                value={visitPay}
                onChange={(newValue) => setVisitPay(newValue)}
              />
            </DemoItem>

            <FormControl sx={{ width: "100%", mt: 3 }}>
              <InputLabel htmlFor="visitPay">Monto de visita</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
                    <PaidIcon />
                  </InputAdornment>
                }
                id="visitPay"
                label="Monto de visita"
                onChange={(e) => setVisitPay(e.target.value)}
                sx={{ label: { color: "#6b21a8" } }}
                type="text"
                value={visitPay}
              />
            </FormControl>
          </div>
          <input
            className="w-full mt-10 px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway"
            type="submit"
            value="Registrar visita"
          />
        </form>
      </div>
    </>
  );
};

export default Visits;
