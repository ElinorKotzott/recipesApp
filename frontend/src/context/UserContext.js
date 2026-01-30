import {createContext, useContext, useEffect, useState} from "react";
import {request} from "../axiosHelper";

const UserContext = createContext(null);

export function UserProvider({children}) {
    const [profile, setProfile] = useState({
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
    });

    const [token, setToken] = useState(
        () => sessionStorage.getItem("token")
    );


    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setProfile(null);
                return;
            }

            try {
                const response = await request("get", "/profile", null, true);
                setProfile(response.data);
            } catch (e) {
                console.error("Failed to fetch profile", e);
                setProfile(null);
            }
        };

        fetchProfile();
    }, [token]);

    return (
        <UserContext.Provider value={{profile, setProfile, token, setToken}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
