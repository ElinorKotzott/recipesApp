import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  //logs user out by removing their token and redirects to login page
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button type="submit" className="button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
