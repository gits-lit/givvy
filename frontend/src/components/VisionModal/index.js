import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Webcam from "react-webcam";

import { scanItem } from '../../actions/VisionActions';

import './style.scss';
let cameraTimer;
const VisionModal = (props) => {

  const webcamRef = React.useRef(null);

  const closeModal = () => {
    if (cameraTimer) {
      clearInterval(cameraTimer);
    }
    props.closeModal();
  }

  useEffect(() => {
    if (props.isModalVisible) {
      console.log('starting timer');
      if (cameraTimer) {
        clearInterval(cameraTimer);
      }
      cameraTimer = setInterval(() => {
        const base64 = webcamRef.current.getScreenshot();
        console.log('taking picture');
        props.scanItem(base64);

        // TODO: REMOVE TO DISABLE CAMERA;
        clearInterval(cameraTimer);
      }, 10000);
    }
  }, [props.isModalVisible]);

  return (
    <div className="vision-modal-container">
      <Modal visible={props.isModalVisible} onOk={closeModal} onCancel={closeModal} footer={null} width="70vw">
        <div className="vision-modal">
          <Webcam
            ref={webcamRef}
            className="camera"
            height={866}
            width={838}
          
          />
          <div className="item-list">
            <h1>Items</h1>
            <hr/>
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