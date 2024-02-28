import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import io from "socket.io-client";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";

let socket;

const MemberContext = createContext();

const MemberProvider = ({ children }) => {
  const [allMembers, setAllMembers] = useState([]);
  const [allVisits, setAllVisits] = useState([]);
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(false);
  const [trainingModal, setTrainingModal] = useState(false);
  const [deleteTrainingModal, setDeleteTrainingModal] = useState(false);
  const [deleteSecondaryTrainerModal, setDeleteSecondaryTrainerModal] =
    useState(false);
  const [blockedUsersModal, setBlockedUsersModal] = useState(false);
  const [pendingUsersModal, setPendingUsersModal] = useState(false);
  const [paidUsersModal, setPaidUsersModal] = useState(false);
  const [newWarehouseArticleModal, setNewWarehouseArticleModal] =
    useState(false);
  const [productCardModal, setProductCardModal] = useState(false);
  const [training, setTraining] = useState({});
  const [trainer, setTrainer] = useState({});
  const [article, setArticle] = useState({});
  const [visit, setVisit] = useState({});
  const [allArticles, setAllArticles] = useState([]);
  const [searcher, setSearcher] = useState(false);
  const navigate = useNavigate();

  const { auth } = useAuth();

  useEffect(() => {
    const getAllMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient("/members/all-members", config);
        setAllMembers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllMembers();
  }, [auth]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient("/members", config);
        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMembers();
  }, [auth]);

  useEffect(() => {
    const getAllArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient("/warehouse", config);
        setAllArticles(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllArticles();
  }, [auth]);

  useEffect(() => {
    const getAllVisits = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient("/visits", config);
        setAllVisits(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllVisits();
  }, [auth]);

  useEffect(() => {
    // socket = io('https://juniors-gym-app-backend-dev-ktbd.2.us-1.fl0.io');
    socket = io("http://localhost:4000");
  }, []);

  const submitMember = async (member) => {
    if (member.id) {
      await editMember(member);
    } else {
      await newMember(member);
    }
  };

  const editMember = async (member) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(
        `/members/${member.id}`,
        member,
        config,
      );
      const updatedMembers = members.map((memberState) =>
        memberState._id === data._id ? data : memberState,
      );

      setMembers(updatedMembers);
      Swal.fire({
        title: "Éxito!",
        text: "El usuario fue actualizado correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editWarehouseArticle = async (article) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(
        `/warehouse/${article.id}`,
        article,
        config,
      );
      const updatedArticles = allArticles.map((memberState) =>
        memberState._id === data._id ? data : memberState,
      );

      setAllArticles(updatedArticles);
      Swal.fire({
        title: "Éxito!",
        text: "El usuario fue actualizado correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const newMember = async (member) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post("/members", member, config);
      setMembers([...members, data]);

      Swal.fire({
        title: "Éxito!",
        text: "El usuario fue creado correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      setTimeout(() => {
        navigate("/admin/members");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const newArticle = async (member) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post("/warehouse", member, config);
      setArticle(data);

      Swal.fire({
        title: "Éxito!",
        text: "El artículo se agregó al inventario",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      setNewWarehouseArticleModal(false);
      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const newVisit = async (visit) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post("/visits", visit, config);
      setVisit(data);

      Swal.fire({
        title: "Éxito!",
        text: "La visita fue registrada correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      setTimeout(() => {
        navigate("/admin/visits");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const getMember = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient(`/members/${id}`, config);
      setMember(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.msg,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      navigate("/members");
    } finally {
      setLoading(false);
    }
  };

  const getArticle = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient(`/warehouse/${id}`, config);
      setArticle(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.msg,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      navigate("/warehouse");
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete(`/members/${id}`, config);
      const updatedMembers = members.filter(
        (memberState) => memberState._id !== id,
      );

      setMembers(updatedMembers);

      Swal.fire({
        title: "Éxito!",
        text: data.msg,
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      setTimeout(() => {
        navigate("/admin/members");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTrainingModal = () => {
    setTrainingModal(!trainingModal);
    setTraining({});
  };

  const submitTraining = async (training) => {
    if (training?.id) {
      await editTraining(training);
    } else {
      await createTraining(training);
    }
  };

  const createTraining = async (training) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post("/trainings", training, config);
      setTrainingModal(false);

      socket.emit("new training", data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTraining = async (training) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(
        `/trainings/${training.id}`,
        training,
        config,
      );
      setTrainingModal(false);
      socket.emit("update training", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTrainingModal = (training) => {
    setTraining(training);
    setTrainingModal(true);
  };

  const handleDeleteTrainingModal = (training) => {
    setTraining(training);
    setDeleteTrainingModal(!deleteTrainingModal);
  };

  const deleteTraining = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete(
        `/trainings/${training._id}`,
        config,
      );

      Swal.fire({
        title: "Éxito!",
        text: data.msg,
        icon: "success",
        confirmButtonText: "Cerrar",
      });

      setDeleteTrainingModal(false);
      socket.emit("delete training", training);
      setTraining({});
    } catch (error) {
      console.log(error);
    }
  };

  const submitTrainer = async (name) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        "/members/trainers",
        { name },
        config,
      );
      setTrainer(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.msg,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAssistance = async () => {
    const { data } = await axiosClient.post(
      `/members/assistance/${member._id}`,
    );
    Swal.fire({
      title: "Éxito!",
      text: data.msg,
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  };

  const addTrainer = async (name) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/members/trainers/${member._id}`,
        name,
        config,
      );
      Swal.fire({
        title: "Éxito!",
        text: data.msg,
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      setTrainer({});
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.msg,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const handleDeleteSecondaryTrainerModal = (trainer) => {
    setDeleteSecondaryTrainerModal(!deleteSecondaryTrainerModal);
    setTrainer(trainer);
  };

  const deleteSecondaryTrainer = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/members/delete-trainers/${member._id}`,
        { id: trainer._id },
        config,
      );
      const updatedMember = { ...member };
      updatedMember.secondaryTrainers = updatedMember.secondaryTrainers.filter(
        (secondaryTrainerState) => secondaryTrainerState._id !== trainer._id,
      );

      setMember(updatedMember);

      Swal.fire({
        title: "Éxito!",
        text: data.msg,
        icon: "success",
        confirmButtonText: "Cerrar",
      });

      setTrainer({});
      setDeleteSecondaryTrainerModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const completeTraining = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/trainings/training-status/${id}`,
        {},
        config,
      );
      socket.emit("change status", data);
      setTraining({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearching = () => [setSearcher(!searcher)];

  //socket.io
  const submitTrainingMember = (training) => {
    const updatedMember = { ...member };
    updatedMember.trainings = [...updatedMember.trainings, training];
    setMember(updatedMember);
  };

  const deleteTrainingMember = (training) => {
    const updatedMember = { ...member };
    updatedMember.trainings = updatedMember.trainings.filter(
      (trainingState) => trainingState._id !== training._id,
    );
    setMember(updatedMember);
  };

  const updateTrainingMember = (training) => {
    const updatedMember = { ...member };
    updatedMember.trainings = updatedMember.trainings.map((trainingState) =>
      trainingState._id === training._id ? training : trainingState,
    );
    setMember(updatedMember);
  };

  const changeStatusTrainingMember = (training) => {
    const updatedMember = { ...member };
    updatedMember.trainings = updatedMember.trainings.map((trainingState) =>
      trainingState._id === training._id ? training : trainingState,
    );
    setMember(updatedMember);
  };

  const closeSession = () => {
    setMembers([]);
    setMember({});
  };

  const handleBlockedUsersModal = () => {
    setBlockedUsersModal(!blockedUsersModal);
  };

  const handlePendingUsersModal = () => {
    setPendingUsersModal(!pendingUsersModal);
  };

  const handlePaidUsersModal = () => {
    setPaidUsersModal(!paidUsersModal);
  };

  const handleNewWarehouseArticleModal = () => {
    setNewWarehouseArticleModal(!newWarehouseArticleModal);
  };

  const handleProductCardModal = () => {
    setProductCardModal(!productCardModal);
  };

  return (
    <MemberContext.Provider
      value={{
        //functions
        addAssistance,
        addTrainer,
        changeStatusTrainingMember,
        closeSession,
        completeTraining,
        deleteMember,
        deleteTraining,
        deleteTrainingMember,
        deleteSecondaryTrainer,
        editWarehouseArticle,
        getArticle,
        getMember,
        handleBlockedUsersModal,
        handleDeleteTrainingModal,
        handleDeleteSecondaryTrainerModal,
        handleEditTrainingModal,
        handleNewWarehouseArticleModal,
        handlePaidUsersModal,
        handlePendingUsersModal,
        handleProductCardModal,
        handleSearching,
        handleTrainingModal,
        newArticle,
        newVisit,
        submitMember,
        submitTrainer,
        submitTraining,
        submitTrainingMember,
        updateTrainingMember,
        //state
        allArticles,
        allMembers,
        allVisits,
        article,
        blockedUsersModal,
        deleteSecondaryTrainerModal,
        deleteTrainingModal,
        loading,
        member,
        members,
        newWarehouseArticleModal,
        paidUsersModal,
        pendingUsersModal,
        productCardModal,
        searcher,
        trainer,
        training,
        trainingModal,
        visit,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export { MemberProvider };
export default MemberContext;
