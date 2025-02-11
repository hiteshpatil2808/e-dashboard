import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
      const auth = localStorage.getItem('user');
      if (auth) {
          navigate('/');
      }
  },[]);

  async function collectData() {
    console.warn(name, email, password);
    let result = await fetch('http://localhost:5000/register', {        // fetch is function or API in javasript
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'content-Type': 'application/json',
      },
    });
    result = await result.json();
    console.warn(result);
      localStorage.setItem("user",JSON.stringify(result.result));
      localStorage.setItem("token",JSON.stringify(result.auth));
      navigate('/');
  }

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Your Name"
      />

      <input
        type="text"
        className="inputBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
      />

      <input
        type="password"
        className="inputBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Your Passwors"
      />

      <button type="button" className="appButton" onClick={collectData}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
