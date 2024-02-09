import { useMemo } from 'react'
import { Chip, Typography } from '@mui/material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import SportsKabaddiOutlinedIcon from '@mui/icons-material/SportsKabaddiOutlined'
import { formatDate } from '../helpers/formatDate'
import useMembers from '../hooks/useMembers'
import useAdmin from '../hooks/useAdmin'

const Training = ({ training }) => {
  const { name, description, startDate, level, status, _id, completed } =
    training
  const {
    completeTraining,
    handleEditTrainingModal,
    handleDeleteTrainingModal,
  } = useMembers()
  const admin = useAdmin()

  const chipLevelColor = useMemo(() => {
    switch (level) {
      case 'Principiante':
        return 'info'
      case 'Intermedio':
        return 'secondary'
      case 'Avanzado':
        return 'error'
      case 'Alto Nivel':
        return 'success'
      default:
        return 'secondary'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  const chipLevelIcon = useMemo(() => {
    switch (level) {
      case 'Principiante':
        return <DirectionsBikeIcon />
      case 'Intermedio':
        return <FitnessCenterIcon />
      case 'Avanzado':
        return <EmojiEventsIcon />
      case 'Alto Nivel':
        return <SportsKabaddiOutlinedIcon />
      default:
        return <PriceCheckIcon />
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  return (
    <div className="border-b p-5 flex justify-between items-center font-raleway">
      <div>
        <p className="text-xl mb-1">{name}</p>
        <p className="text-sm mb-1 text-gray-600">{description}</p>
        <p className="text-sm mb-1">Fecha de inicio: {formatDate(startDate)}</p>
        <div
          className="flex-1 md:flex flex-col md:flex-row items-center"
          direction="row"
          spacing={1}
        >
          <p className="text-sm mb-1 mr-2">Nivel de entrenamiento: </p>
          <Chip
            label={level}
            size="small"
            color={chipLevelColor}
            icon={chipLevelIcon}
          />
        </div>
        {status && (
          <Chip
            sx={{ mt: 1 }}
            label={`Completado por: ${completed.name}`}
            size="medium"
            color="info"
            icon={<CheckOutlinedIcon />}
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        {admin && (
          <button
            className="bg-purple-800 px-4 py-3 text-white rounded-lg"
            onClick={() => handleEditTrainingModal(training)}
          >
            <Typography sx={{ fontSize: '10px' }}>Editar</Typography>
          </button>
        )}
        <button
          className={`${
            status ? 'bg-green-500' : 'bg-orange-500'
          } px-4 py-3 text-white rounded-lg`}
          onClick={() => completeTraining(_id)}
        >
          {status ? (
            <Typography sx={{ fontSize: '10px' }}>Finalizado</Typography>
          ) : (
            <Typography sx={{ fontSize: '10px' }}>Incompleto</Typography>
          )}
        </button>
        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white rounded-lg"
            onClick={() => handleDeleteTrainingModal(training)}
          >
            <Typography sx={{ fontSize: '10px' }}>Eliminar</Typography>
          </button>
        )}
      </div>
    </div>
  )
}

export default Training
