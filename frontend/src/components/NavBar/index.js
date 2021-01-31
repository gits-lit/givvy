import React from 'react';

import './style.scss';

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <h2>givvy</h2>
      <div className="links">
        <div onClick={props.toggleSideBar}>Locations</div>
        <div>Analytics</div>
        <div>Current Items</div>
      </div>
      <div className="scan" onClick={props.enableModal}>Scan Items &#62;</div>
    </div>
  );
};

export default NavBar;