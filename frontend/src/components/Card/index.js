import React from 'react';
import { Progress } from 'antd';

import './style.scss';

const Card = (props) => {
  return (
    <div className="card">
      <div>
        <Progress
          type="circle"
          percent={75}
          strokeColor={{
            '0%': '#A643F4',
            '100%': 'rgba(249, 89, 166, 0.9)',
          }}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <div className="itemsneeded">
          <h3>{props.units}</h3>
          <span>of {props.item} needed</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
