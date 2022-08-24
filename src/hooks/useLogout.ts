import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return onLogout;
};

export default useLogout;
