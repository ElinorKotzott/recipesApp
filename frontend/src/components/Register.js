import PrimaryButton from "./buttons/PrimaryButton.js";
import { useNavigate } from "react-router-dom";

const Register = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  handleRegister,
}) => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
          />

          <label htmlFor="lastName">Last name:</label>

          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
          />


          <label htmlFor="email">Email:</label>

          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />


          <label htmlFor="username">Username:</label>

          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />


          <label htmlFor="password">Password:</label>

          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />

          <PrimaryButton type="submit">Register</PrimaryButton>
          <p style={{ margin: "0" }}>Already have an account?</p>
          <PrimaryButton type="submit" onClick={() => navigate("/login")}>
            Login
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};
export default Register;
