import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';

function App() {
  //const [message, setMessage] = useState(null);

  /*
  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => setMessage(data.message))
  }, []);*/

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;