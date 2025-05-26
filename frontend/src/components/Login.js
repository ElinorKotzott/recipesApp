import React, { useState } from 'react';
import { request } from '../axiosHelper';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <label htmlFor="username">Username:</label><br />
            <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                //onChange={handleUsernameChange}
                />

            <br/><br/>

            <label htmlFor="password">Password:</label><br />
                <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                //onChange={handlePasswordChange}
                />

            <br/><br/>

            <input type="submit" value="Login" />
        </form>
      );

}

export default Login;
