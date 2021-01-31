import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import VisionModal from '../components/VisionModal';
import ThankYouModal from '../components/ThankYouModal';
import Filters from '../components/Filters';

import './style.scss';

import { loadLocations } from '../actions/MapActions';
import { getShelters } from '../actions/ShelterActions';

let locations = {};

const DonatePageContainer = (props) => {

  const [sideBarVis, setSideBar] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalTwoVisible, setIsModalTwoVisible] = useState(false);

  useEffect(() => {
    props.getShelters();
  }, []);

  const toggleSideBar = (sideBarState) => {
    setSideBar(sideBarState);
  }

  const mapLoad = map => {
    window.map = map;
    setTimeout(() => {
      loadLocations(map, locations);
    }, 1000);
  };

  return (
    <div className="donatepage">
      <NavBar enableModal={() => setIsModalVisible(true)} toggleSideBar={() => {setSideBar(!sideBarVis)}}/>
      <NavBar enableModal={() => setIsModalVisible(true)}
      toggleSideBar={() => {setSideBar(!sideBarVis)}}
      toggleThankYouModal={()=>{}}/>
      <VisionModal isModalVisible={isModalVisible} closeModal={() => setIsModalVisible(false)} openSideBar= {() => {setSideBar(true)}}/>
      <ThankYouModal isModalVisible={isModalTwoVisible} closeModal={() => setIsModalTwoVisible(false)}/>
      <SideBar toggleSideBar={toggleSideBar} sideBarVis={sideBarVis} toggleThankYouModal={() => {setIsModalTwoVisible(true)}}/>
      <Map mapLoad={mapLoad} sideBarVis={sideBarVis} />
      <Filters /> 
    </div>
  )
}

const mapStateToProps = state => {
  locations = state.shelters.shelters;

  return ({
    shelters: state.shelters.shelters
  })};

export default connect(
  mapStateToProps,
  { getShelters }
)(DonatePageContainer);