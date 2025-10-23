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
        <div className="auth-container">
            <div className="auth">
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>


                    <PrimaryButton type="submit">Login</PrimaryButton>
                    <p style={{ margin: "0" }}>Don't have an account yet?</p>
                    <PrimaryButton type="button" onClick={() => navigate("/register")}>
                        Register
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};

export default Login;
