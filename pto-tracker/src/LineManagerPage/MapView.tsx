import React, {useState} from 'react';
import './TeamRequests.css';
import axios from 'axios';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

  
type holiday = {
    id: string,
    status: string,
    start: string,
    end: string,
    postcode: string,
    lat: number,
    lng: number
};

type user_details = {
    user: string,
    profile_picture: string,
    holidays: holiday[]
};

interface MapViewProps {
    teamMembers : user_details[]
    handleRender: () => void;
}

const containerStyle = {
    width: '1200px',
    height: '400px',
    border: '1px solid black',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
};

function MapView() {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyCHbswLdpHD2K_R8ICJngiGeSLHfAa_xO8"
    })
  
    const [map, setMap] = React.useState(null)
  
    const onLoad = React.useCallback(function callback(map: any) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
  
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map: any) {
      setMap(null)
    }, [])
  
    return isLoaded ? (
        <div style={wrapperStyle}>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            onLoad={onLoad}
            onUnmount={onUnmount}
            >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
            </GoogleMap>
        </div>
    ) : <></>
  }
  
  export default React.memo(MapView)
