import React, {useState} from 'react';
import './MapView.css';

import { GoogleMap, InfoWindow,useJsApiLoader, Marker } from '@react-google-maps/api';
import { any } from 'prop-types';

  
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
    data: holiday | null
    employee: user_details | null
    //teamMembers : user_details[]
    // handleRender: () => void;
}

interface Coordinates {
    lat: number;
    lng: number;
}

const center = {
    lat: -3.745,
    lng: -38.523
};

function MapView({employee, data }: MapViewProps) {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyCHbswLdpHD2K_R8ICJngiGeSLHfAa_xO8"
    })

    const defaultCenter = { lat: -34.397, lng: 150.644 }; // Replace with your default center
    const center = data ? { lat: data.lat, lng: data.lng } : defaultCenter;
    const [selectedMarker, setSelectedMarker] = useState<Coordinates | null>(null);
    const [map, setMap] = React.useState(null)
    
    const onLoad = React.useCallback(function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
  
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map: any) {
      setMap(null)
    }, [])

  
    return isLoaded ? (
        <div className= "wrapperStyle">
            <GoogleMap
                mapContainerClassName="containerStyle"
                center={center}
                zoom={4}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker
                    position={center}
                    onClick={() => setSelectedMarker(center)}
                />
                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div>
                            <h6>Employee Name: {employee?.user}</h6>
                            <ul>
                                <li>Location: {selectedMarker.lat}, {selectedMarker.lng}</li>
                                <li>Start Date: {data?.start}</li>
                                <li>End Date: {data?.end}</li>
                                <li>Status: {data?.status}</li>
                            </ul>
                            
                            {/* Add more data as needed */}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    ) : <></>;
}
  
  export default React.memo(MapView)
