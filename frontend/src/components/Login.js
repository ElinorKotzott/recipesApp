//this form accepts username, password, the setter functions and handleLogin as props from the LoginPage

import React from 'react';

const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {
    return (
        <div className="auth">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label><br />
            <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}/>

            <br /><br />

            <label htmlFor="password">Password:</label><br />
            <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}/>

            <br /><br />

            <input type="submit" value="Login" />
        </form>
        </div>
    );
};

export default Login;
