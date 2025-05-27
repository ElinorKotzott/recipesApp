import React from 'react';

const Register = ({ username, setUsername, password, setPassword, handleRegister }) => {
    return (
        <form onSubmit={handleRegister}>
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
