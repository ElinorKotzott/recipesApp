import React, { useState } from 'react';
import { request } from './axiosHelper';

function Register() {


}




return
(
  <form action="/register" method="post">
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username" required><br><br>

    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" required><br><br>

    <input type="submit" value="Register">
  </form>
)


export default Register;
