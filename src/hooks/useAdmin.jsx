import useMembers from "./useMembers";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { member } = useMembers();
  const { auth } = useAuth();

  return member.principalTrainer === auth._id;
};

export default useAdmin;
