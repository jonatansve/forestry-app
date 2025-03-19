import React from 'react';
import ReactMapGL from 'react-map-gl';

const TestMap = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 57.430398,
    longitude: 13.708269,
    zoom: 14,
    width: '100%',
    height: 'calc(100vh - 40px)'
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/samochips/ckjlyko950ecl19oa2kmadjxl"
      onViewportChange={setViewport}
    />
  );
};

export default TestMap; 