import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if (auth) {
        navigate("/");
    }
  },[])
  async function handleLogin() {
    console.log(email,password);
    let result = await fetch('http://localhost:5000/login', {        // fetch is function or API in javasript
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'content-Type':'application/json'
        }
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate("/");
    }else{
        alert("Please Enter Correct Details");
    }
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="email"
        className="inputBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        type="password"
        className="inputBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button type="button" className="appButton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
