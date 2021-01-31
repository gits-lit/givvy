import React from 'react';
import { Progress } from 'antd';

import './style.scss';

const Card = (props) => {
  return (
    <div className="card">
      <div>
        <Progress
          type="circle"
          percent={props.percent}
          strokeColor={{
            '0%': '#A643F4',
            '100%': 'rgba(249, 89, 166, 0.9)',
          }}
          strokeWidth={8}
          strokeLinecap="round"
          width={100}
        />
        <div className="itemsneeded">
          <span>{props.units} {props.item}</span> <br/> <span> needed</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
