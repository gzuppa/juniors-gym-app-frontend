import useMembers from "../hooks/useMembers";
import MemberPreview from "../components/Previews/MemberPreview";
import Searching from "../components/Searching";

const Members = () => {
  const { handleSearching, allMembers } = useMembers();

  return (
    <>
      <h1 className="text-4xl text-yellow-300 font-raleway font-bold">
        Usuarios
      </h1>
      <button
        className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer mt-5 font-raleway"
        type="button"
        onClick={handleSearching}
      >
        Buscar usuario
      </button>
      <Searching />
      <div className="bg-white shadow mt-10 rounded-lg">
        {allMembers.length ? (
          allMembers.map((member) => (
            <MemberPreview key={member._id} member={member} />
          ))
        ) : (
          <p className="mt-5 text-center text-purple-800 uppercase">
            Aún no hay usuarios creados
          </p>
        )}
      </div>
    </>
  );
};

export default Members;
