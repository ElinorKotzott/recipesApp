import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {request} from "../../axiosHelper";
import Login from "../../components/Login";
import {jwtDecode} from "jwt-decode";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    /*  useEffect(() => {
        document.body.style.backgroundImage = "url('/veggies2.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";

        return () => {
          document.body.style.backgroundImage = "";
        };
      }, []);*/

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await request("post", "/login", { username, password }, false);

    const token = response.data.token;
    sessionStorage.setItem("token", token);

    const decoded = jwtDecode(token);
    sessionStorage.setItem("user", JSON.stringify({ id: decoded.sub }));

    navigate("/home");
  } catch (error) {
    alert("Login failed"); //how to get error message from backend? axios intercepts 401 errors and will replace error message
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
