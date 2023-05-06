import React, { useState } from "react";
import './Login.css'
import { NavLink } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/login', {
            email: email,
            password: pass
        })
            .then((response) => {
                console.log(response.data.token);
                // Store the token in localStorage or session storage
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };


    return (
        <>
            <div className="app" >
                <div className="auth-form-container">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password">password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <button type="submit">Log In</button>
                    </form>

                    <NavLink className="link-btn" to="/signup" >Don't have an account? Register here.</NavLink>
                </div>
            </div>
        </>
    )
}

export default Login;
