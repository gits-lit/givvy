import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Webcam from "react-webcam";

import {
  Loading3QuartersOutlined
} from '@ant-design/icons';

import { scanItem } from '../../actions/VisionActions';

import './style.scss';
let cameraTimer;
const VisionModal = (props) => {

  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = useState('');

  const closeModal = () => {
    props.closeModal();
  }

  useEffect(() => {
    if (props.isModalVisible) {
      console.log('starting timer');
    }
    playCamera();
  }, []);

  const playCamera = () => {
    console.log('play camera');
    setImageSrc('');
    setTimeout(() => {
      const base64 = webcamRef.current.getScreenshot();
      console.log('taking picture');
      setImageSrc(base64);
      props.scanItem(base64, playCamera);
    }, 10000);
  }

  return (
    <div className="vision-modal-container">
      <Modal visible={props.isModalVisible} onOk={closeModal} onCancel={closeModal} footer={null} width="70vw">
        <div className="vision-modal">
          <div className="header">
            <h1>Scan Items to Donate</h1>
          </div>
          <Webcam
            ref={webcamRef}
            className="camera"
            screenshotQuality={1}
          />
          { imageSrc != '' && 
            <img className="screenshot" src={imageSrc}></img>
          }
          <div className="item-list">
            <h1>Items</h1>
            <div className="line"></div>
            <div className="confirm-button">Confirm Items</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default connect(
  null,
  { scanItem }
)(VisionModal);