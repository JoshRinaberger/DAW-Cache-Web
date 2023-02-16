import "./App.css";
import React, {useEffect, useState} from 'react';
import {Route, Routes, Link} from "react-router-dom";
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import Project from './Project.js';
import Projects from './Projects.js';
import NotFound from './NotFound.js';

function App() {
  //const [message, setMessage] = useState(null);

  /*
  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => setMessage(data.message))
  }, []);*/

async function logout(e) {
  const reponse = await fetch('/login/logout', {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    }
  });
}

  return (
    <div className="app">
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/projects'>Projects</Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
}

export default App;