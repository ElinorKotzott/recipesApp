import React, { useState } from 'react';

function Register() {


  return (
    <form id="form-id" action="/register" method="post">
      <label htmlFor="username">Username:</label><br />
      <input type="text" id="username" name="username" required /><br /><br />
  
      <label htmlFor="password">Password:</label><br />
      <input type="password" id="password" name="password" required /><br /><br />
  
      <input type="submit" value="Register" />
    </form>
  );
  

}
export default Register;
