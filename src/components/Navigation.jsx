import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useState } from 'react';

const Navigation = () => {
  const logoText = "STATHIS_STAVRIANOS // STATIC_AGE_IMAGES";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <NavLink to="/" className="glitch-link">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ marginRight: '10px', verticalAlign: 'middle' }}
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
          <span className="logo-text" data-text={logoText}>{logoText}</span>
        </NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>HOME</NavLink>
        </li>
        
        {/* Dropdown Projects */}
        <li 
          className="dropdown-wrapper"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <NavLink 
            to="/projects" 
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            PROJECTS
          </NavLink>
          
          <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
            <NavLink to="/projects/future-yesterdays" onClick={() => setIsDropdownOpen(false)}>
              FUTURE YESTERDAYS
            </NavLink>
            <NavLink to="/projects/fishtank" onClick={() => setIsDropdownOpen(false)}>
              FISHTANK
            </NavLink>
          </div>
        </li>

        <li>
          <NavLink to="/street" className={({ isActive }) => isActive ? 'active-link' : ''}>STREET</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active-link' : ''}>CONTACT</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
