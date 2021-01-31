import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'antd';
import iphone from '../../assets/iphone.png';

import './style.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <img src={iphone} alt="iphone" className="iphone" />
      <div className="homenav">
        <h2>givvy</h2>
        <div className="links">
          <NavLink to="/">
            <h4>Locations</h4>
          </NavLink>
          <NavLink to="/">
            <h4>Analytics</h4>
          </NavLink>
          <NavLink to="/">
            <h4>Pricing</h4>
          </NavLink>
        </div>
        <Button className="signin" size="large">
          Sign in >
        </Button>
      </div>
      <div className="content">
        <h1>Community</h1>
        <h1>Through Donation</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. 
        </p>
        <div className="buttons">
          <NavLink to="/donate">
            <Button className="play1" size="big">Start now ></Button>
          </NavLink>
          <NavLink to="/donate">
            <Button  className="play" size="big">Demo now ></Button>
          </NavLink>
        </div>
      </div>
      <p className="credits">Made at HackUCI w/🍵</p>
    </div>
  );
};

export default HomePage;
