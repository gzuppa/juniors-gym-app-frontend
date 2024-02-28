import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import useMembers from "../hooks/useMembers";
import Loader from "../assets/files/Loader";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Swal from "sweetalert2";

const WarehouseArticleEdit = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const { article, editWarehouseArticle, loading } = useMembers();

  const params = useParams();
  console.log(params.id);
  // useEffect(() => {
  //   getArticle(params.id);
  // }, []);

  useEffect(() => {
    if (params.id) {
      setId(article._id);
      setName(article.name);
      setDescription(article.description);
      setPrice(article.price);
      setStock(article.stock);
      setStatus(article.status);
      setType(article.type);
    }
  }, [params]);

  if (loading) return <Loader />;

  // const handleClick = () => {
  //   if (confirm("Deseas eliminar este usuario?")) {
  //     deleteMember(params.id);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, price, stock, status, type].includes("")) {
      Swal.fire({
        title: "Atención!",
        text: "Todos los campos son obligatorios",
        icon: "warning",
        confirmButtonText: "Reintentar",
      });
      return;
    }
    await editWarehouseArticle({
      name,
      description,
      price,
      stock,
      status,
      type,
    });
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setStatus("");
    setType("");
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-yellow-300 text-4xl">{article.name}</h1>
        {/* <div className="text-yellow-300 hover:text-purple-600 flex items-center gap-2">
          <DeleteForeverOutlinedIcon />{" "}
          <button onClick={handleClick}>Eliminar usuario</button>
        </div> */}
      </div>
      <div className="mt-10 flex justify-center">
        <form
          className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
          onSubmit={handleSubmit}
        >
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="name">Nombre del artículo</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
                  <AppRegistrationOutlinedIcon />
                </InputAdornment>
              }
              id="name"
              label="Nombre del artículo"
              onChange={(e) => setName(e.target.value)}
              sx={{ label: { color: "#6b21a8" } }}
              type="text"
              value={name}
            />
          </FormControl>

          <FormControl sx={{ width: "100%", mt: 3 }}>
            <InputLabel htmlFor="name">Descripción del artículo</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
                  <AppRegistrationOutlinedIcon />
                </InputAdornment>
              }
              id="description"
              label="Descripción del artículo"
              onChange={(e) => setDescription(e.target.value)}
              sx={{ label: { color: "#6b21a8" } }}
              type="text"
              value={description}
            />
          </FormControl>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%", mt: 3 }}>
                <InputLabel htmlFor="price">Precio del artículo</InputLabel>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
                      <PaidOutlinedIcon />
                    </InputAdornment>
                  }
                  id="price"
                  label="Precio del artículo"
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{ label: { color: "#6b21a8" } }}
                  type="number"
                  value={price}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%", mt: 3 }}>
                <InputLabel htmlFor="stock">Cantidad en stock</InputLabel>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end" sx={{ color: "#6b21a8" }}>
                      <Inventory2OutlinedIcon />
                    </InputAdornment>
                  }
                  id="stock"
                  label="Cantidad en stock"
                  onChange={(e) => setStock(e.target.value)}
                  sx={{ label: { color: "#6b21a8" } }}
                  type="number"
                  value={stock}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%", mt: 3 }}>
                <InputLabel
                  id="status"
                  sx={{ mb: "12px", fontSize: "0.875rem" }}
                >
                  Status de artículo
                </InputLabel>
                <Select
                  labelId="status"
                  fullWidth
                  id="status"
                  value={status}
                  label="Status de artículo"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"Disponible"}>Disponible</MenuItem>
                  <MenuItem value={"No disponible"}>No disponible</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%", mt: 3 }}>
                <InputLabel id="type" sx={{ mb: "12px", fontSize: "0.875rem" }}>
                  Tipo de artículo
                </InputLabel>
                <Select
                  labelId="type"
                  fullWidth
                  id="type"
                  value={type}
                  label="Tipo de artículo"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={"Aparato"}>Aparato</MenuItem>
                  <MenuItem value={"Mercancía"}>Mercancía</MenuItem>
                  <MenuItem value={"Otro"}>Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* <Grid
            className="font-raleway flex items-center justify-between"
            container
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Grid item xs={8}>
              <label for="images" class="drop-container" id="dropcontainer">
                <span class="drop-title">Selecciona la foto del artículo</span>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </Grid>
            <Grid item xs={4}>
              <img
                src={image ? image : noImage}
                alt=""
                className="h-32"
              />
            </Grid>
          </Grid> */}
          <input
            type="submit"
            className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway w-full mt-10"
            value="Editar artículo del inventario"
          />
        </form>
      </div>
    </>
  );
};

export default WarehouseArticleEdit;
