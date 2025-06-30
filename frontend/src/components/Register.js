import SubmitButton from './SubmitButton.js';
import { useNavigate } from 'react-router-dom';


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
            <label htmlFor="firstName">First name:</label><br />
                <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />

            <br/><br/>

            <label htmlFor="lastName">Last name:</label><br />
                <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />

            <br/><br/>

            <label htmlFor="email">Email:</label><br />
            <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <br/><br/>

            <label htmlFor="username">Username:</label><br />
            <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <br/><br/>

            <label htmlFor="password">Password:</label><br />
                <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <br/><br/>

            <SubmitButton type="submit" >Register</SubmitButton>
            <p>Already have an account?</p>
            <SubmitButton type="submit" onClick={() => navigate('/login')}>Login</SubmitButton>
        </form>
        </div>
        </div>
    );

}
export default Register;
