import { useNavigate } from "react-router-dom";
import { request } from "../axiosHelper";
import ChangeProfile from "../components/ChangeProfile";
import { useUser } from "../context/UserContext";

function ChangeProfilePage() {
    const { profile, setProfile } = useUser();
    const navigate = useNavigate();

    if (!profile) return null;

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await request(
                "put",
                "/profile/change",
                profile,
                true
            );
            setProfile(response.data);
            navigate("/profile");

        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Update failed!");
        }
    };

    return (
        <ChangeProfile
            profile={profile}
            setProfile={setProfile}
            handleProfileUpdate={handleProfileUpdate}
        />
    );
}

export default ChangeProfilePage;
