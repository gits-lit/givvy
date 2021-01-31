import React from 'react';
import { Switch } from 'antd';

import './style.scss';

const Filters = (props) => {
  return (
    <div className="filters">
      <h4>🔎 Filter Views</h4>
      <Switch />
      <p>Homeless Shelter</p>
      <Switch />
      <p>Food Bank</p>
      <Switch />
      <p>Mobile Pantry</p>
      <Switch />
      <p>Donation Center</p>
    </div>
  );
};

export default Filters;
