import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';
import bg from '../../assets/hbg.png';

const HomePage= () => {
  return (
    <div className="home-page">
      <NavLink to="/donate">
        <button>Start now</button>
      </NavLink>
      <NavLink to="/donate">
        <button>Demo now</button>
      </NavLink>
    </div>
  );
};

export default HomePage;