import React, { useState } from 'react';
import { request } from '../axiosHelper';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };

      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('POST', '/register', { username, password });
        try {
            await request('post', '/register', { username, password });
            alert('Registered successfully!');
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
            onChange={handleUsernameChange}/>

        <br/><br/>

        <label htmlFor="password">Password:</label><br />
            <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={handlePasswordChange}/>

        <br/><br/>

        <input type="submit" value="Register" />
    </form>
  );
  

}
export default Register;
