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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <br/>
                    <br/>

                    <PrimaryButton type="submit">Login</PrimaryButton>
                    <p>Don't have an account yet?</p>
                    <PrimaryButton type="button" onClick={() => navigate("/register")}>
                        Register
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};

export default Login;
