import useMembers from '../hooks/useMembers'

const SecondaryTrainer = ({ secondaryTrainer }) => {
  const { name, email } = secondaryTrainer
  const { handleDeleteSecondaryTrainerModal } = useMembers()

  return (
    <div className="border-b p-5 flex justify-between items-center font-raleway">
      <div>
        <p>{name}</p>
        <p className="text-sm mb-1 text-gray-600">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer  mt-5 w-full md:w-auto font-raleway  flex items-center justify-center"
          onClick={() => handleDeleteSecondaryTrainerModal(secondaryTrainer)}
        >
          Eliminar entrenador
        </button>
      </div>
    </div>
  )
}

export default SecondaryTrainer
