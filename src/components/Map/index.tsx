import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapIcon from "../../utils/mapIcon";
import { MapPoints } from "../../interfaces/MapPoints";
import "./Map.css";

interface GarbageMapProps {
   mapPoints: MapPoints[];
}

export const GarbageMap: React.FC<GarbageMapProps> = ({ mapPoints }) => {
   const [currentLatitude, setCurrentLatitude] = useState<number>(-30.1084987);
   const [currentLongitude, setCurrentLongitude] = useState<number>(-51.317225);

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
            console.log("Latitude: ", position.coords.latitude);
            console.log("Longitude: ", position.coords.longitude);
         },
         (error) => {
            console.error("Error Code = " + error.code + " - " + error.message);
         }
      );
   }, []);

   return (
      <Map
         className="map"
         center={[currentLatitude, currentLongitude]}
         zoom={13}
         style={{ width: "100%", height: "100%" }}
      >
         <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
         />

         {mapPoints.map((mapPoint) => {
            return (
               <Marker
                  key={mapPoint.id}
                  icon={mapIcon}
                  position={[mapPoint.latitude, mapPoint.longitude]}
               >
                  <Popup
                     className="map-popup"
                     closeButton={false}
                     minWidth={240}
                     maxWidth={240}
                  >
                     {mapPoint.name}
                     <Link to={`/orphanages/${mapPoint.id}`}>
                        <FiArrowRight size={20} color="blue" />
                     </Link>
                  </Popup>
               </Marker>
            );
         })}
      </Map>
   );
};