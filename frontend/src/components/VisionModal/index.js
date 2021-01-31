import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Webcam from "react-webcam";

import {
  DeleteOutlined,
  Loading3QuartersOutlined
} from '@ant-design/icons';

import { scanItem } from '../../actions/VisionActions';
import { rankShelters } from '../../actions/ShelterActions';
import { removeItem } from '../../actions/ItemsActions';

import './style.scss';
const VisionModal = (props) => {

  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null)
  const [imageSrc, setImageSrc] = useState('');
  const [message, setMessage] = useState('No server found');
  const [imageTimeout, setImageTimeout] = useState('');

  const closeModal = () => {
    console.log('closing modal');
    props.closeModal();
    if (imageTimeout) {
      console.log('clearing timeout');
      clearTimeout(imageTimeout);
    }
  }

  useEffect(() => {
    if (props.isModalVisible) {
      console.log('starting timer');
          playCamera();
    }
  }, [props.isModalVisible]);

  const playCamera = () => {
    console.log('play camera');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setImageSrc('');
    const iTO = setTimeout(() => {
      if (webcamRef && webcamRef.current) {
        const base64 = webcamRef.current.getScreenshot();
        console.log('taking picture');
        setImageSrc(base64);
        props.scanItem(base64, playCamera, drawCanvas, setMessageTwo);
      }
    }, 10000);
    setImageTimeout(iTO);
  }

  const removeItem = (itemName) => {
    props.removeItem(itemName);
  }

  const setMessageTwo = (message) => {
    setMessage(message);
  }

  const confirmDonation = () => {
    closeModal();
    props.openSideBar();
    props.rankShelters(props.items);
  }

  const drawCanvas = (bounds) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let maxX = 0;
    let maxY = 0;
    let minX = 1300;
    let minY = 1300;
    for (let i = 0; i < bounds.length; i++) {
      const corner = bounds[i];
      const cornerX = corner.x || 0;
      const cornerY = corner.y || 0;
      maxX = Math.max(maxX, cornerX);
      maxY = Math.max(maxY, cornerY);
      minX = Math.min(minX, cornerX);
      minY = Math.min(minY, cornerY);
    }
    const x = minX * canvas.width;
    const width = (maxX - minX) * canvas.width;
    const y = (minY) * canvas.height;
    const height = (maxY - minY) * canvas.height;
    ctx.beginPath();
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "#A643F4");
    gradient.addColorStop("1", "#F959A6");
    ctx.lineWidth = "6";
    ctx.strokeStyle = gradient;
    ctx.rect(x, y, width, height);
    ctx.stroke();
  }

  return (
    <div className="vision-modal-container">
      <Modal visible={props.isModalVisible} onOk={closeModal} onCancel={closeModal} footer={null} width="70vw">
        <div className="vision-modal">
          <div className="header">
            <h1>Scan to donate</h1>
            { imageSrc == '' && 
            <div className="loading">
              <Loading3QuartersOutlined spin />
              <span>Scanning... </span>
            </div>
            }
          </div>
          <Webcam
            ref={webcamRef}
            className="camera"
            screenshotQuality={1}
            height={720}
            width={1280}
          />
          
          { imageSrc != '' && 
          <>
            <img className="screenshot" src={imageSrc}></img>
            <div className="pop-up-message">{message}</div>
            </>
          }
          <div className="canvas-container">
            <canvas ref={canvasRef} height={720} width={1280}/>
          </div>
          <div className="item-list">
            <h1>Items</h1>
            <div className="line"></div>
            {props.items.map((item) => {
              const name = item[0];
              const quantity = item[1];
              return (
                <div className="item" key={'item' + item[0]}>
                  <DeleteOutlined onClick={() => {removeItem(name)}}/>
                  <span className="item-name">{name}</span>
                  <span className="item-quantity">x{quantity}</span>
                </div>
              );
            })}
            <div className="confirm-button" onClick={confirmDonation}>Confirm Items</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.items.items
});

export default connect(
  mapStateToProps,
  { removeItem, scanItem, rankShelters }
)(VisionModal);