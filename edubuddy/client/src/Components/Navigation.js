import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";

function Navigation() {
    return (
      <div className='navigation-bar'>
        <NavLink to="/" className='nav-item' activeClassName="active">Getting Started</NavLink>
        <NavLink to="/schedule" className='nav-item' activeClassName="active">My Schedule</NavLink>
        <NavLink to="/curriculum" className='nav-item' activeClassName="active">My Curriculum</NavLink>
        <NavLink to="/resources" className='nav-item' activeClassName="active">My Resources</NavLink>
        <NavLink to="/help-me" className='nav-item' activeClassName="active">Chat Buddy</NavLink>
      </div>
    );
}

export default Navigation;
