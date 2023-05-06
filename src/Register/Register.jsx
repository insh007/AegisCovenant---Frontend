import React, { useState } from "react";
import './Register.css'
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    let navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API call
        const response = await fetch("http://localhost:3000/createUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.status) {
            // save the auth token and redirect
            // localStorage.setItem('token', json.data.password)
            
            alert("Account created successfully")
            navigate('/login')  // redirect
        } else {
            // alert("Invalid credentials")
            alert(json.message)  // Show the error message from the backend
        }
    }

    return (
        <>
            <div className="app">

                <div className="auth-form-container">
                    <h2>Register</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Full name</label>
                        <input value={credentials.name} name="name" onChange={onChange} id="name" placeholder="full Name" required />
                        <label htmlFor="email">email</label>
                        <input value={credentials.email} onChange={onChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
                        <label htmlFor="password">password</label>
                        <input value={credentials.password} onChange={onChange} type="password" placeholder="********" id="password" name="password" required />
                        <button type="submit">Sign Up</button>
                    </form>

                    <NavLink className="link-btn" to="/login">Already have an account? Login here.</NavLink>
                </div>
            </div>
        </>
    )
}

export default Register