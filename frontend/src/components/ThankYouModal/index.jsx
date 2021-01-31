import React from 'react';
import { Modal } from 'antd';
import checkmark from '../../assets/check-mark.png';
import './style.scss';

const ThankYouModal = (props) => {
  return ( 
    <Modal visible={props.isModalVisible} onOk={props.closeModal} onCancel={props.closeModal} footer={null} width="30vw">
      <div className="thank-you-modal">
        <img className="check" src={checkmark}></img>
        <div className="note">
          <div className="thank-you">Thank you for your donation.</div>
          <div className="appreciation">Your support helps us to further our mission. Your donation is invaluable to us, thanks again!</div>
        </div>
      </div>
    </Modal>
  )
}

export default ThankYouModal;