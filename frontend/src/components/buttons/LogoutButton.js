import {useNavigate} from "react-router-dom";
import PrimaryButton from "./PrimaryButton.js";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <PrimaryButton type="submit" onClick={handleLogout}>
            Logout
        </PrimaryButton>
    );
}

export default LogoutButton;
