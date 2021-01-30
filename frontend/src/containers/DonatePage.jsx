import React, { useState } from 'react';

import Map from '../components/Map';
import SideBar from '../components/SideBar';

import { loadLocations } from '../actions/MapActions';

const DonatePageContainer = () => {

  const [sideBarVis, setSideBar] = useState(true);

  const toggleSideBar = (sideBarState) => {
    setSideBar(sideBarState);
  }

  const mapLoad = map => {
    window.map = map;
    loadLocations(map);
  };

  return (
    <>
      <SideBar toggleSideBar={toggleSideBar} sideBarVis={sideBarVis}/>
      <Map mapLoad={mapLoad} sideBarVis={sideBarVis}/>
    </>
  )
}

export default DonatePageContainer;