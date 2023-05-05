import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");

    const cities = [
        "Delhi",
        "Mumbai",
        "Bangalore",
        "Kolkata",
        "Chennai",
        // Add more cities as needed
    ];

    const handleCityChange = (e) => {
        setSource(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform any necessary actions with the form data
        console.log("Source:", source);
        console.log("Destination:", destination);
        console.log("Date:", date);
    };



    return (
        <>

            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <NavLink exact="true" className="navbar-brand" to="/">Flight's</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink exact="true" className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                        </ul>

                        <form className="d-flex">
                            <NavLink className="btn btn-secondary mx-1 btn-sm" to="/login" role="button">Login</NavLink>
                            <NavLink className="btn btn-secondary mx-1 btn-sm" to="/signup" role="button">SignUp</NavLink>
                        </form>
                    </div>
                </div>
            </nav>

            <div className='app'>
                <div className='"auth-form-container"'>
                    <h2>Dream! Plan! Go!</h2>
                    <form className='cities-form' onSubmit={handleSubmit}>
                        <label htmlFor="source">Source:</label>
                        <select id="source" value={source} onChange={handleCityChange} required>
                            <option value="">Select source city</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="destination">Destination:</label>
                        <select id="destination" value={destination} onChange={handleCityChange} required>
                            <option value="">Select destination city</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={handleDateChange}
                            required
                        />

                        <button type="submit">Go</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home
