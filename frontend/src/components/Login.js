import PrimaryButton from "./buttons/PrimaryButton.js";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';


const Login = ({
                   username,
                   setUsername,
                   password,
                   setPassword,
                   handleLogin,
               }) => {
    const navigate = useNavigate();

    return (
        <div className="w-100 h-100">
            <div className="auth-container">
                <div className="auth">
                    <h3>Login</h3>

                    <form onSubmit={handleLogin}>
                        <Form.Group controlId="username">
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control mb-2 mt-3"
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control mb-2"
                            />
                        </Form.Group>
                        <PrimaryButton type="submit">Login</PrimaryButton>


                        <p className="mt-4 mb-1">Don't have an account yet?</p>

                        <PrimaryButton type="button" onClick={() => navigate("/register")}>
                            Register
                        </PrimaryButton>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
