import React from 'react';

import './style.scss';

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <div onClick={props.toggleSideBar}>Locations</div>
      <div onClick={props.enableModal}>Scan Items</div>
    </div>
  );
};

export default NavBar;