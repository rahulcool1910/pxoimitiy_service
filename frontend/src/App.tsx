// import React, { Ref, useEffect, useMemo, useRef, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { MapContainer } from 'react-leaflet/MapContainer';
// import { TileLayer } from 'react-leaflet/TileLayer';
// import { useMap } from 'react-leaflet/hooks';
// import { Circle, Marker, Popup } from 'react-leaflet';
// import axios from 'axios';
// import { icon, Icon } from 'leaflet';
// import Leaflet, { LatLngTuple } from 'leaflet';
// import markerIcon from './assets/marker.png';
// import redMarkerIcon from './assets/redMarker.png';
// // import 'leaflet/dist/leaflet.css';
// export interface Buisness {
//   member: string;
//   coordinates: Coordinates;
// }
// export interface Coordinates {
//   longitude: number;
//   latitude: number;
// }

// function App() {
//   const markerRef = useRef<any>();
//   const [markerLocation, setMarkerLocation] = useState<LatLngTuple>([
//     51.505, -0.09,
//   ]);
//   const [businesses, setBuisnesses] = useState<Array<Buisness>>([]);
//   const getBusiness = async (markerLocation: LatLngTuple) => {
//     const currLocation = {
//       lat: markerLocation[0],
//       lng: markerLocation[1],
//     };
//     const response = await axios.post(
//       'http://localhost:3001/getBusiness',
//       currLocation
//     );
//     const { data } = response;
//     const businesses: Buisness[] = data.data;
//     setBuisnesses(businesses);
//     console.log(
//       '🚀 ~ file: App.tsx:36 ~ getBusiness ~ businesses:',
//       businesses
//     );
//   };
//   useEffect(() => {
//     getBusiness(markerLocation);
//   }, []);

//   const eventHandlers = useMemo(
//     () => ({
//       async dragend() {
//         const marker = markerRef.current;
//         if (marker != null) {
//           const currLocation = marker.getLatLng();
//           console.log(
//             '🚀 ~ file: App.tsx:54 ~ dragend ~ currLocation:',
//             currLocation
//           );
//           setMarkerLocation([currLocation.lat, currLocation.lng]);
//           getBusiness([currLocation.lat, currLocation.lng]);
//           // const headers = { 'Content-Type': 'application/json' };

//           // const data = await axios.post(
//           //   'http://localhost:3001/setBusiness',
//           //   currLocation,
//           //   { headers }
//           // );
//         }
//       },
//     }),
//     []
//   );

//   const getMarker = (marker: string) => {
//     return new Leaflet.Icon({
//       iconUrl: marker,
//       iconAnchor: [5, 55],
//       popupAnchor: [10, -44],
//       iconSize: [25, 25],
//     });
//   };
//   return (
//     <div className="App">
//       <MapContainer
//         center={markerLocation}
//         zoom={13}
//         scrollWheelZoom={false}
//         style={{ height: '100vh', width: '100wh' }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {businesses.map((business) => {
//           return (
//             <Marker
//               icon={getMarker(markerIcon)}
//               ref={markerRef}
//               draggable={true}
//               position={[
//                 business.coordinates.latitude,
//                 business.coordinates.longitude,
//               ]}
//             >
//             </Marker>
//           );
//         })}
//         <Marker
//           icon={getMarker(redMarkerIcon)}
//           draggable={true}
//           ref={markerRef}
//           eventHandlers={eventHandlers}
//           position={markerLocation}
//         >
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//         <Circle center={markerLocation} radius={1000} color="red"></Circle>
//       </MapContainer>
//     </div>
//   );
// }

// export default App;

import React, { Ref, useEffect, useMemo, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { useMap } from 'react-leaflet/hooks';
import { Circle, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { icon, Icon } from 'leaflet';
import Leaflet, { LatLngTuple } from 'leaflet';
import markerIcon from './assets/marker.png';
import redMarkerIcon from './assets/redMarker.png';
// import 'leaflet/dist/leaflet.css';
export interface Business {
  member: string;
  coordinates: Coordinates;
}
export interface Coordinates {
  longitude: number;
  latitude: number;
}

function App() {
  const markerRef = useRef<any>();
  const [markerLocation, setMarkerLocation] = useState<LatLngTuple>([
    51.505, -0.09,
  ]);
  const [businesses, setBuisnesses] = useState<Array<Business>>([]);
  const getBusiness = async (markerLocation: LatLngTuple) => {
    const currLocation = {
      lat: markerLocation[0],
      lng: markerLocation[1],
    };
    const response = await axios.post(
      'http://localhost:3001/getBusiness',
      currLocation
    );
    const { data } = response;
    const businesses: Business[] = data.data;
    setBuisnesses(businesses);
  };
  useEffect(() => {
    getBusiness(markerLocation);
  }, []);

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const currLocation = marker.getLatLng();
          setMarkerLocation([currLocation.lat, currLocation.lng]);
          getBusiness([currLocation.lat, currLocation.lng]);
        }
      },
    }),
    []
  );

  const getMarker = (marker: string) => {
    return new Leaflet.Icon({
      iconUrl: marker,
      iconAnchor: [5, 55],
      popupAnchor: [10, -44],
      iconSize: [25, 25],
    });
  };
  return (
    <div className="App">
      <MapContainer
        center={markerLocation}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100vh', width: '100wh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {businesses.map((business) => {
          return (
            <Marker
              icon={getMarker(markerIcon)}
              ref={markerRef}
              // draggable={true}
              position={[
                business.coordinates.latitude,
                business.coordinates.longitude,
              ]}
            >
              <Popup>{business.member}</Popup>
            </Marker>
          );
        })}

        <Marker
          icon={getMarker(redMarkerIcon)}
          draggable={true}
          ref={markerRef}
          eventHandlers={eventHandlers}
          position={[markerLocation[0]-0.003, markerLocation[1]-0.001]}
          // position={markerLocation}
        ></Marker>

        <Circle center={markerLocation} radius={2000} color="red"></Circle>
      </MapContainer>
    </div>
  );
}

export default App;
