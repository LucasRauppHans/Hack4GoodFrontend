import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus, FiTrash2 } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Modal from "react-modal";
import "leaflet/dist/leaflet.css";
import mapIconGreen from "../../utils/mapIconsGreen";
import mapIconRed from "../../utils/mapIconsRed";
import mapIconYellow from "../../utils/mapIconsYellow";
import { MapPoints } from "../../interfaces/MapPoints";
import "./Map.css";
import { CreateReportModal } from "../CreateReportModal";
import api from "../../services/api";

interface GarbageMapProps {
   mapPoints: MapPoints[];
}

export const GarbageMap: React.FC<GarbageMapProps> = ({ mapPoints }) => {
   const [currentLatitude, setCurrentLatitude] = useState<number>(-30.1084987);
   const [currentLongitude, setCurrentLongitude] = useState<number>(-51.317225);
   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   async function handleSetToInProgress(mapPoint: MapPoints) {
      await api.put(`trashpoint/:${mapPoint.id}`, "in-progress");
   }

   async function handleSetToDone(mapPoint: MapPoints) {
      await api.put(`trashpoint/:${mapPoint.id}`, "in-progress");
   }

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

   const getMapIcon = (mapPoint: MapPoints) => {
      if (mapPoint.progress === "in-progress") return mapIconYellow;
      if (mapPoint.progress === "created") return mapIconRed;
      if (mapPoint.progress === "completed") return mapIconGreen;
   };

   return (
      <>
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
                     icon={getMapIcon(mapPoint)}
                     position={[mapPoint.latitude, mapPoint.longitude]}
                  >
                     <Popup
                        className="map-popup"
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                     >
                        <button
                           type="button"
                           onClick={() => handleSetToInProgress(mapPoint)}
                        >
                           Set to inProgress
                        </button>
                        <button
                           type="button"
                           onClick={() => handleSetToDone(mapPoint)}
                        >
                           Set to done
                        </button>
                     </Popup>
                  </Marker>
               );
            })}
         </Map>

         <button
            type="button"
            className="createReport"
            onClick={(): void => setModalIsOpen(true)}
         >
            <FiPlus size={32} color="#fff" />
         </button>

         <Modal
            className="modal"
            isOpen={modalIsOpen}
            shouldCloseOnEsc={false}
            shouldCloseOnOverlayClick={false}
            style={{ overlay: { zIndex: 100, background: "rgba(0,0,0,0.7)" } }}
         >
            <CreateReportModal onClose={(): void => setModalIsOpen(false)} />
         </Modal>
      </>
   );
};
