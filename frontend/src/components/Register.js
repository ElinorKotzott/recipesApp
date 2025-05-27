import React from 'react';

const Register = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, username, setUsername, password, setPassword, handleRegister }) => {
    return (
        <form onSubmit={handleRegister}>
            <label htmlFor="firstName">First name:</label><br />
                <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}/>

            <br/><br/>

            <label htmlFor="lastName">Last name:</label><br />
                <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}/>

            <br/><br/>

            <label htmlFor="email">Email:</label><br />
            <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}/>

            <br/><br/>

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
