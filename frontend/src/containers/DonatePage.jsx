import React, { useState } from 'react';

import Map from '../components/Map';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import VisionModal from '../components/VisionModal';

import './style.scss';

import { loadLocations } from '../actions/MapActions';

const DonatePageContainer = () => {

  const [sideBarVis, setSideBar] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleSideBar = (sideBarState) => {
    setSideBar(sideBarState);
  }

  const mapLoad = map => {
    window.map = map;
    loadLocations(map);
  };

  return (
    <div className="donatepage">
      <NavBar enableModal={() => setIsModalVisible(true)} toggleSideBar={() => {setSideBar(!sideBarVis)}}/>
      <VisionModal isModalVisible={isModalVisible} closeModal={() => setIsModalVisible(false)}/>
      <SideBar toggleSideBar={toggleSideBar} sideBarVis={sideBarVis}/>
      <Map mapLoad={mapLoad} sideBarVis={sideBarVis} />
    </div>
  )
}

export default DonatePageContainer;