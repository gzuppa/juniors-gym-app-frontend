import { Fragment, useEffect, useState } from 'react'
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { Dialog, Transition } from '@headlessui/react'
import Swal from 'sweetalert2'
import useMembers from '../../hooks/useMembers'
import noImage from '../../assets/misc/no-image.jpg'

const NewWarehouseArticleModal = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [status, setStatus] = useState('')
  const [image, setImage] = useState('')
  const {
    article,
    handleNewWarehouseArticleModal,
    newArticle,
    newWarehouseArticleModal,
  } = useMembers()

  useEffect(() => {
    if (article?._id) {
      setName(article.name)
      setDescription(article.description)
      setType(article.type)
      setPrice(article.price)
      setStock(article.stock)
      setStatus(article.status)
      setImage(article.image)
      return
    }
    setName('')
    setDescription('')
    setType('')
    setPrice('')
    setStock('')
    setStatus('')
    setImage('')
  }, [article])

  const previewFiles = file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleChange = e => {
    const file = e.target.files[0]
    setImage(file)
    previewFiles(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, description, type, price, stock, status].includes('')) {
      Swal.fire({
        title: 'Atención!',
        text: 'Todos los campos son obligatorios',
        icon: 'warning',
        confirmButtonText: 'Reintentar',
      })
      return
    }
    await newArticle({
      // id,
      name,
      description,
      type,
      price,
      stock,
      status,
      image,
      // member: params.id,
    })
    // setId('')
    setName('')
    setDescription('')
    setType('')
    setPrice('')
    setStock('')
    setStatus('')
    setImage('')
  }

  return (
    <Transition.Root show={newWarehouseArticleModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleNewWarehouseArticleModal}
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
                  onClick={handleNewWarehouseArticleModal}
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
                    Nuevo artículo
                  </Dialog.Title>
                  <form className="my-10" onSubmit={handleSubmit}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel htmlFor="name">
                        Nombre del artículo
                      </InputLabel>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: '#6b21a8' }}
                          >
                            <AppRegistrationOutlinedIcon />
                          </InputAdornment>
                        }
                        id="name"
                        label="Nombre del artículo"
                        onChange={e => setName(e.target.value)}
                        sx={{ label: { color: '#6b21a8' } }}
                        type="text"
                        value={name}
                      />
                    </FormControl>

                    <FormControl sx={{ width: '100%', mt: 3 }}>
                      <InputLabel htmlFor="name">
                        Descripción del artículo
                      </InputLabel>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: '#6b21a8' }}
                          >
                            <AppRegistrationOutlinedIcon />
                          </InputAdornment>
                        }
                        id="description"
                        label="Descripción del artículo"
                        onChange={e => setDescription(e.target.value)}
                        sx={{ label: { color: '#6b21a8' } }}
                        type="text"
                        value={description}
                      />
                    </FormControl>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControl sx={{ width: '100%', mt: 3 }}>
                          <InputLabel htmlFor="price">
                            Precio del artículo
                          </InputLabel>
                          <OutlinedInput
                            endAdornment={
                              <InputAdornment
                                position="end"
                                sx={{ color: '#6b21a8' }}
                              >
                                <PaidOutlinedIcon />
                              </InputAdornment>
                            }
                            id="price"
                            label="Precio del artículo"
                            onChange={e => setPrice(e.target.value)}
                            sx={{ label: { color: '#6b21a8' } }}
                            type="number"
                            value={price}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl sx={{ width: '100%', mt: 3 }}>
                          <InputLabel htmlFor="stock">
                            Cantidad en stock
                          </InputLabel>
                          <OutlinedInput
                            endAdornment={
                              <InputAdornment
                                position="end"
                                sx={{ color: '#6b21a8' }}
                              >
                                <Inventory2OutlinedIcon />
                              </InputAdornment>
                            }
                            id="stock"
                            label="Cantidad en stock"
                            onChange={e => setStock(e.target.value)}
                            sx={{ label: { color: '#6b21a8' } }}
                            type="number"
                            value={stock}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControl sx={{ width: '100%', mt: 3 }}>
                          <InputLabel
                            id="status"
                            sx={{ mb: '12px', fontSize: '0.875rem' }}
                          >
                            Status de artículo
                          </InputLabel>
                          <Select
                            labelId="status"
                            fullWidth
                            id="status"
                            value={status}
                            label="Status de artículo"
                            onChange={e => setStatus(e.target.value)}
                          >
                            <MenuItem value={'Disponible'}>Disponible</MenuItem>
                            <MenuItem value={'No disponible'}>
                              No disponible
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl sx={{ width: '100%', mt: 3 }}>
                          <InputLabel
                            id="type"
                            sx={{ mb: '12px', fontSize: '0.875rem' }}
                          >
                            Tipo de artículo
                          </InputLabel>
                          <Select
                            labelId="type"
                            fullWidth
                            id="type"
                            value={type}
                            label="Tipo de artículo"
                            onChange={e => setType(e.target.value)}
                          >
                            <MenuItem value={'Aparato'}>Aparato</MenuItem>
                            <MenuItem value={'Mercancía'}>Mercancía</MenuItem>
                            <MenuItem value={'Otro'}>Otro</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid
                      className="font-raleway flex items-center justify-between"
                      container
                      spacing={2}
                      sx={{ mt: 2 }}
                    >
                      <Grid item xs={8}>
                        <label
                          for="images"
                          class="drop-container"
                          id="dropcontainer"
                        >
                          <span class="drop-title">
                            Selecciona la foto del artículo
                          </span>
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={e => handleChange(e)}
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
                    </Grid>
                    <input
                      type="submit"
                      className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway w-full mt-10"
                      value="Agregar artículo al inventario"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default NewWarehouseArticleModal
