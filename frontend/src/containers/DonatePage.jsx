import React, { useState } from 'react';

import Map from '../components/Map';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import VisionModal from '../components/VisionModal';

import { loadLocations } from '../actions/MapActions';

const DonatePageContainer = () => {

  const [sideBarVis, setSideBar] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(true);

  const toggleSideBar = (sideBarState) => {
    setSideBar(sideBarState);
  }

  const mapLoad = map => {
    window.map = map;
    loadLocations(map);
  };

  return (
    <>
      <NavBar enableModal={() => setIsModalVisible(true)} toggleSideBar={() => {setSideBar(!sideBarVis)}}/>
      <VisionModal isModalVisible={isModalVisible} closeModal={() => setIsModalVisible(false)}/>
      <SideBar toggleSideBar={toggleSideBar} sideBarVis={sideBarVis}/>
      <Map mapLoad={mapLoad} sideBarVis={sideBarVis} />
    </>
  )
}

export default DonatePageContainer;