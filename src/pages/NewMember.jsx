import MemberForm from '../components/Forms/MemberForm'

const NewMember = () => {
  return (
    <>
      <h1 className="text-4xl text-purple-400 font-raleway font-bold">
        Crear nuevo usuario
      </h1>
      <div className="mt-10 flex justify-center">
        <MemberForm />
      </div>
    </>
  )
}

export default NewMember
