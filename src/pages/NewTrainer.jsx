import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useMembers from '../hooks/useMembers'
import TrainerForm from '../components/Forms/TrainerForm'
import Loader from '../assets/files/Loader'

const NewTrainer = () => {
  const { addTrainer, getMember, loading, member, trainer } = useMembers()
  const params = useParams()

  useEffect(() => {
    getMember(params.id)
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <h1 className="text-2xl font-black text-yellow-300 font-raleway">
        Agregar entrenador al usuario:
      </h1>
      <h1 className="text-yellow-300 font-raleway mt-1">
        {member.name} {member.lastName}
      </h1>
      <div className="mt-10 flex justify-center">
        <TrainerForm />
      </div>
      {loading ? (
        <Loader />
      ) : (
        trainer?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold text-purple-800 font-raleway">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p className="font-raleway text-purple-800">{trainer.name}</p>
                <button
                  type="button"
                  className="text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg font-bold font-raleway bg-yellow-300 hover:bg-purple-800 text-purple-800 hover:text-yellow-300 cursor-pointer flex items-center justify-center"
                  onClick={() =>
                    addTrainer({
                      name: trainer.name,
                    })
                  }
                >
                  Agregar entrenador al usuario
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default NewTrainer
