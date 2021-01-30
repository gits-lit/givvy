import React from 'react';

import './style.scss';

const SideBar= (props) => {
  const width = props.sideBarVis ? '30vw' : '0';

  return (
    <div className="side-bar" style={{width: width}}>
      <button onClick={() => {props.toggleSideBar(false)}}>x</button>
    </div>
  );
};

export default SideBar;