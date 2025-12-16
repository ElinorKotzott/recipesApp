import PrimaryButton from "./buttons/PrimaryButton.js";
import {useNavigate} from "react-router-dom";

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
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control mb-2 mt-3"
                    />


                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control mb-2"
                    />



                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mb-2"
                    />



                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control mb-2"
                    />



                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control mb-2"
                    />
                    <PrimaryButton type="submit">Register</PrimaryButton>

                    <p className="mt-4 mb-1">Already have an account?</p>

                    <PrimaryButton type="submit" onClick={() => navigate("/login")}>
                        Login
                    </PrimaryButton>

                </form>
            </div>
        </div>
    );
};
export default Register;
