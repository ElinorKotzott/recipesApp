import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function LogoutButton() {
  const navigate = useNavigate();

  //logs user out by removing their token and redirects to login page
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button variant="primary" type="submit" className="button" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
