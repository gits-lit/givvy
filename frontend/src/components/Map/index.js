import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw'
});

const MapComponent = (props) => {
  const leftMargin = props.sideBarVis ? '30vw' : '0';
  console.log(props.sideBarVis);

  return (
    <Map
      antialias={true}
      containerStyle={{
        height: '110vh',
        width: '100%',
        marginLeft: leftMargin,
        transition: '.5s'
      }}
      center={[-118.2437, 34.0522]}
      flyToOptions={{
        speed: 0
      }}
      onClick={props.mapClick}
      onStyleLoad={props.mapLoad}
      pitch = {[60]}
      style="mapbox://styles/mapbox/light-v10"
      zoom = {[15]}
    >
    </Map>
  );
}

export default MapComponent;