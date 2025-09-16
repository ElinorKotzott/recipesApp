import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton.js";

function LogoutButton() {
  const navigate = useNavigate();

  //logs user out by removing their token and redirects to login page
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <PrimaryButton type="submit" className="button" onClick={handleLogout}>
      Logout
    </PrimaryButton>
  );
}

export default LogoutButton;
