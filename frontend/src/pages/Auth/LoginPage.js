import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {request} from "../../axiosHelper";
import Login from "../../components/Login";
import {jwtDecode} from "jwt-decode";
import {useUser} from "../../context/UserContext";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setToken} = useUser();


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await request("post", "/login", { username, password }, false);

    const token = response.data.token;
    sessionStorage.setItem("token", token);

    setToken(token);

    const decoded = jwtDecode(token);
    sessionStorage.setItem("user", JSON.stringify({ id: decoded.sub }));

    navigate("/home");
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    alert(message);
  }

};

  return (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

export default LoginPage;
