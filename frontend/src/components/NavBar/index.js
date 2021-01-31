import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <NavLink to="/"><h2>givvy</h2></NavLink>
      <div className="links">
        <div onClick={props.toggleSideBar}>Locations</div>
        <div>Analytics</div>
        <div onClick={props.toggleThankYouModal}>Current Items</div>
      </div>
      <div className="scan" onClick={props.enableModal}>Scan Items &#62;</div>
    </div>
  );
};

export default NavBar;