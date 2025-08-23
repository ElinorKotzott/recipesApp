//this form accepts username, password, the setter functions and handleLogin as props from the LoginPage

import SubmitButton from "./SubmitButton.js";
import { useNavigate } from "react-router-dom";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />

          <SubmitButton type="submit">Login</SubmitButton>
          <p>Don't have an account yet?</p>
          <SubmitButton type="submit" onClick={() => navigate("/register")}>
            Register
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
