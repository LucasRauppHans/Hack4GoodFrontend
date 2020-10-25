import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapMarkerImg from "../images/map-marker.svg";
import "../styles/pages/orphanages-map.css";
import mapIcon from "../utils/mapIconsGreen";
import api from "../services/api";

interface Orphanage {
   id: number;
   name: string;
   latitude: number;
   longitude: number;
}

function OrphanagesMap() {
   const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

   useEffect(() => {
      api.get("orphanages").then((response) => {
         setOrphanages(response.data);
         console.log(orphanages);
      });
   }, []);

   return (
      <div id="page-map">
         <aside>
            <header>
               <img src={mapMarkerImg} alt="Happy" />
               <h2>Escolha um orfanato no mapa</h2>
               <p>Muitas crianças estão esperando a sua visita :{")"}</p>
            </header>

            <footer>
               <strong>Rio do Sul</strong>
               <span>Santa Catarina</span>
            </footer>
         </aside>

         <Map
            className="map"
            center={[-29.7509965, -51.1781533]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
         >
            {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
            <TileLayer
               url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

            {orphanages.map((orphanage) => {
               return (
                  <Marker
                     key={orphanage.id}
                     icon={mapIcon}
                     position={[orphanage.latitude, orphanage.longitude]}
                  >
                     <Popup
                        className="map-popup"
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                     >
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                           <FiArrowRight size={20} color="blue" />
                        </Link>
                     </Popup>
                  </Marker>
               );
            })}
         </Map>

         <Link to="/orphanages/create" className="createReport">
            <FiPlus size={32} color="#fff" />
         </Link>
      </div>
   );
}

export default OrphanagesMap;