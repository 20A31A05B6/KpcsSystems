import { useState, useEffect } from 'react';
import './App.css';
import Ct from './comp/Ct';
import Cookies from 'js-cookie';
import Register from './comp/Register';
import Login from './comp/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './comp/Home';
import Logout from './comp/Logout';
import Nav from './comp/Nav';
import Admin from './comp/Admin';
import Edit from './comp/Edit';
import LandingPage from './comp/landingpage';

const App = () => {
  const [state, setState] = useState({ token: "", uid: "", name: "", role: "" });
  const updstate = (obj) => {
    setState({ ...state, ...obj });
  };

  useEffect(() => {
    const t = Cookies.get("lgc");
    if (t !== undefined) {
      updstate(JSON.parse(t));
    }
  }, []);

  const obj = { state, updstate };

  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/edit/:pid" element={<Edit />} />
        </Routes>
      </Ct.Provider>
    </BrowserRouter>
  );
};

export default App;