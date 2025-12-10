import {useEffect, useState} from "react";
import ChangeProfile from "../components/ChangeProfile";
import {request} from "../axiosHelper";
import {useNavigate} from "react-router-dom";

function ChangeProfilePage() {
    const emptyProfile = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        bio: "",
        image: {
            imageData: "",
            imageType: "",
            cropParameters: null
        }
    };
    const [profile, setProfile] = useState(emptyProfile);

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                const response = await request("get", "/profile", null, true);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [token]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await request(
                "put",
                "/profile/change",
                profile,
                true
            );
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
