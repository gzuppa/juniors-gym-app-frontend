import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import useMembers from "../hooks/useMembers";
import Loader from "../assets/files/Loader";
import MemberForm from "../components/Forms/MemberForm";

const EditMember = () => {
  const params = useParams();
  const { deleteMember, getMember, loading, member } = useMembers();
  const { name, lastName } = member;

  useEffect(() => {
    getMember(params.id);
  }, []);

  if (loading) return <Loader />;

  const handleClick = () => {
    if (confirm("Deseas eliminar este usuario?")) {
      deleteMember(params.id);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-yellow-300 text-4xl">
          {name} {lastName}
        </h1>
        <div className="text-yellow-300 hover:text-purple-600 flex items-center gap-2">
          <DeleteForeverOutlinedIcon />{" "}
          <button onClick={handleClick}>Eliminar usuario</button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <MemberForm />
      </div>
    </>
  );
};

export default EditMember;
