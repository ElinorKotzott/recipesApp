import {useNavigate} from "react-router-dom";
import PrimaryButton from "./PrimaryButton.js";
import {useUser} from "../../context/UserContext";

function LogoutButton() {
    const navigate = useNavigate();
    const { setToken } = useUser();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <div className="button-container">
            <PrimaryButton className="w-100 mt-3" type="submit" onClick={handleLogout}>
                Logout
            </PrimaryButton>
        </div>
    );
}

export default LogoutButton;
