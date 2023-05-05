import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";

function App() {

  return (
    <>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
      </Routes>
    </>
  )
}

export default App;
