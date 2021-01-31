import React from 'react';
import { Modal } from 'antd';

import './style.scss';

const ThankYouModal = (props) => {
  return ( 
    <Modal visible={props.isModalVisible} onOk={props.closeModal} onCancel={props.closeModal} footer={null} width="70vw">
      <div className="thank-you-modal">

      </div>
    </Modal>
  )
}

export default ThankYouModal;