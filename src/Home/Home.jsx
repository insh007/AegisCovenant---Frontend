import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Home.css'
import axios from 'axios'

const Home = () => {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");

    const [prices, setPrices] = useState({});

    const cities = [
        "Delhi",
        "Mumbai",
        "Bangalore",
        "Kolkata",
        "Chennai",
        "Hyderabad",
        "Pune",
        "Ahmedabad",
        "Jaipur",
        "Amritsar",
        "Kochi",
        "Goa",
        "Guwahati",
        "Indore",
        "Nagpur",
        "Calicut",
        "Thiruvananthapuram"
    ];

    const handleSourceCityChange = (e) => {
        setSource(e.target.value);
    };

    const handleDestinationCityChange = (e) => {
        setDestination(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/") // redirect to login
        }
        else {
            // alert("you are browsing as a guest!!")
            navigate("/login") // redirect to login
        }

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3000/flights`, {
                params: {
                    Source: source,
                    Destination: destination,
                    Date: date
                },
                headers: {
                    'x-api-key': localStorage.getItem('token')
                }
            })
            console.log(response)
            setPrices(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login') // redirect
    }

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

                        {
                            !localStorage.getItem('token') ?
                                <form className="d-flex">
                                    <NavLink className="btn btn-secondary mx-1 btn-sm" to="/login" role="button">Login</NavLink>
                                    <NavLink className="btn btn-secondary mx-1 btn-sm" to="/signup" role="button">SignUp</NavLink>
                                </form> : <button onClick={handleLogout} className='btn btn-secondary btn-sm'>Logout</button>
                        }
                    </div>
                </div>
            </nav>

            <div className='app'>
                <div className='"auth-form-container"'>
                    <h2>Dream! Plan! Go!</h2>
                    <form className='cities-form' onSubmit={handleSubmit}>
                        <label htmlFor="source">Source:</label>
                        <select id="source" value={source} onChange={handleSourceCityChange} required>
                            <option value="">Select source city</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="destination">Destination:</label>
                        <select id="destination" value={destination} onChange={handleDestinationCityChange} required>
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

                        <button type="submit"><b>Go</b> &nbsp;<i className="fa-sharp fa-solid fa-plane"></i></button>
                    </form>
                </div>

                {Object.keys(prices).length > 0 && (
                    <div className='prices-container'>
                        <h3>Flight Prices:</h3>
                        <ul className='price-list'>
                            {Object.entries(prices).map(([airline, price]) => (
                                <li key={airline}>
                                    {`${airline}: ${price === '₹0' ? '₹0' : price}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home
