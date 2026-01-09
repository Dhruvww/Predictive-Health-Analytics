import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);  
      navigate('/');    
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  return (
    <div>
      <header className="header">
        <nav className="nav-bar">
          <div className="logo">PredictiX</div>
          <ul className="nav-links">
            <li><Link className="active-link" to="/Dashboard">Home</Link></li>
            <li><Link to="/History">History</Link></li>
            <li><Link to="/Appointments">Appointments</Link></li>
            <li><Link to="/Doctor">Consult Doctor</Link></li>
            <li><Link to="/About">About</Link></li>
           {isLoggedIn && (
              <li>
                <button onClick={handleLogout} className="nav-button">Logout</button>
              </li>
            )}
            {!isLoggedIn && (
               <button onClick={handleLogout} className="nav-button">Logout</button>
              // <li><Link to="/">Sign in</Link></li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
