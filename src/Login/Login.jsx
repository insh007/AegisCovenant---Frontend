import React, { useState } from "react";
import './Login.css'
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {

    const [credentials, setCredentials] = useState({email:"", password:""})

    let navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://ages-covenant-api.onrender.com/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        console.log(response)
        const json = await response.json()
        console.log(json)

        if(json.status){
            // save the auth token and redirect
            localStorage.setItem('token', json.token)
            
            alert("Logged in successful")
            navigate('/')  // redirect
        }else{
            alert("Invalid credentials")
        }
    };


    return (
        <>
            <div className="app" >
                <div className="auth-form-container">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">email</label>
                        <input value={ credentials.email} onChange={onChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
                        <label htmlFor="password">password</label>
                        <input value={credentials.password} onChange={onChange} type="password" placeholder="********" id="password" name="password" required />
                        <button type="submit">Log In</button>
                    </form>

                    <NavLink className="link-btn" to="/signup" >Don't have an account? Register here.</NavLink>
                </div>
            </div>
        </>
    )
}

export default Login;
