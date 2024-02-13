import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import io from "socket.io-client";
import useMembers from "../hooks/useMembers";
import useAdmin from "../hooks/useAdmin";
import Loader from "../assets/files/Loader";
import Assistance from "../components/Assistance";
import Training from "../components/Training";
import TrainingFormModal from "../components/Modals/TrainingFormModal";
import DeleteTrainingModal from "../components/Modals/DeleteTrainingModal";
import DeleteSecondaryTrainerModal from "../components/Modals/DeleteSecondaryTrainerModal";
import SecondaryTrainer from "../components/SecondaryTrainer";
import noImage from "../assets/misc/no-image.jpg";

let socket;

const Member = () => {
  const params = useParams();
  const {
    addAssistance,
    changeStatusTrainingMember,
    deleteTrainingMember,
    getMember,
    handleTrainingModal,
    loading,
    member,
    submitTrainingMember,
    updateTrainingMember,
  } = useMembers();
  const admin = useAdmin();
  const { name, lastName, avatar } = member;

  useEffect(() => {
    getMember(params.id);
  }, []);

  useEffect(() => {
    socket = io('https://juniors-gym-app-backend-dev-ktbd.2.us-1.fl0.io');
    socket.emit("Open member", params.id);
  }, []);

  useEffect(() => {
    socket.on("added training", (newTraining) => {
      if (newTraining.member === member._id) {
        submitTrainingMember(newTraining);
      }
    });
    socket.on("deleted training", (deletedTraining) => {
      if (deletedTraining.member === member._id) {
        deleteTrainingMember(deletedTraining);
      }
    });
    socket.on("updated training", (updatedTraining) => {
      if (updatedTraining.member._id === member._id) {
        updateTrainingMember(updatedTraining);
      }
    });
    socket.on("new status", (newStatus) => {
      if (newStatus.member._id === member._id) {
        changeStatusTrainingMember(newStatus);
      }
    });
  });

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1 className="font-bold text-yellow-300 text-4xl font-raleway">
            {name} {lastName}
          </h1>
          <img
            className="h-24 ml-10"
            src={member.avatar ? member.avatar : noImage}
            alt="avatar"
          />
        </div>
        {admin && (
          <Link
            className="text-yellow-300 hover:text-purple-600 cursor-pointer flex items-center gap-2 font-raleway"
            to={`/admin/members/edit/${params.id}`}
          >
            <EditOutlinedIcon /> Editar
          </Link>
        )}
      </div>
      <p className="text-xl mt-5 text-yellow-300">Asistencias del usuario</p>
      <button
        type="button"
        onClick={() => addAssistance()}
        className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer  mt-5 w-full md:w-auto font-raleway  flex items-center justify-center"
      >
        <LibraryAddOutlinedIcon className="mr-2" /> Agregar asistencia
      </button>
      <div className="bg-white shadow mt-10 rounded-lg">
        {member.assistance?.length ? (
          <Assistance key={member.assistance} assistance={member.assistance} />
        ) : (
          <p className="text-center my-5 p-10 font-raleway text-purple-800 font-bold">
            Este usuario no tiene asistencias registradas
          </p>
        )}
      </div>
      <p className="text-xl mt-10 text-yellow-300">
        Entrenamientos del usuario
      </p>
        <button
          type="button"
          onClick={handleTrainingModal}
          className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer  mt-5 w-full md:w-auto font-raleway  flex items-center justify-center"
        >
          <LibraryAddOutlinedIcon className="mr-2" /> Agregar entrenamiento
        </button>
      <div className="bg-white shadow mt-10 rounded-lg">
        {member.trainings?.length ? (
          member.trainings?.map((training) => (
            <Training key={training._id} training={training} />
          ))
        ) : (
          <p className="text-center my-5 p-10 font-raleway text-purple-800 font-bold">
            Este usuario no tiene entrenamientos registrados
          </p>
        )}
      </div>
      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="text-xl text-yellow-300">Entrenadores del usuario</p>
            <Link
              className="text-yellow-300 hover:text-purple-600 cursor-pointer flex items-center gap-2 font-raleway"
              to={`/admin/members/new-trainer/${member._id}`}
            >
              <PostAddOutlinedIcon /> Agregar
            </Link>
          </div>
          <div className="bg-white shadow mt-10 rounded-lg">
            {member.secondaryTrainers?.length ? (
              member.secondaryTrainers?.map((secondaryTrainer) => (
                <SecondaryTrainer
                  key={secondaryTrainer._id}
                  secondaryTrainer={secondaryTrainer}
                />
              ))
            ) : (
              <p className="text-center my-5 p-10 font-raleway text-purple-800 font-bold">
                Este usuario no tiene entrenadores registrados
              </p>
            )}
          </div>
        </>
      )}
      <TrainingFormModal />
      <DeleteTrainingModal />
      <DeleteSecondaryTrainerModal />
    </>
  );
};

export default Member;
