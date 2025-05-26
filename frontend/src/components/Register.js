import React, { useState } from 'react';
import { request } from '../axiosHelper';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('POST', '/register', { username, password });
        try {
            await request('post', '/register', { username, password });
            navigate('/login');
       } catch (error) {
            if (error.response) {
            alert('Registration failed: ' + error.response.data.message);
            } else {
                alert('Error: ' + error.message);
            }
        }
    };


return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label><br />
        <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}/>

        <br/><br/>

        <label htmlFor="password">Password:</label><br />
            <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}/>

        <br/><br/>

        <input type="submit" value="Register" />
    </form>
  );
  

}
export default Register;
