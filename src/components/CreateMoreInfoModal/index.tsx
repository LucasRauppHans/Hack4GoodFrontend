import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./CreateMoreInfoModal.css";
import api from "../../services/api";

interface MapPoint {
   id: number;
   reporterName: string;
   reporterContact: string;
   latitude: number;
   longitude: number;
   description: number;
   assignee: string;
   assigneeContact: string;
   severity: string;
   images: {
      id: number;
      url: string;
   }[];
}

interface CreateMoreInfoModalProps {
   id: number;
   onClose: () => void;
}

export const CreateMoreInfoModal: React.FC<CreateMoreInfoModalProps> = ({
   id,
   onClose,
}) => {
   const [mapPoint, setMapPoint] = useState<MapPoint>();
   const [activeImageIndex, setActiveImageIndex] = useState(0);

   useEffect(() => {
      api.get(`trashpoint/${id}`).then((response) => {
         setMapPoint(response.data);
      });
   }, []);

   if (!mapPoint) {
      return <p>Carregando...</p>;
   }

   return (
      <div id="page-orphanage">
         <main>
            <div className="orphanage-details">
               <img
                  src={mapPoint.images[activeImageIndex].url}
                  alt="Lar das meninas"
               />

               <div className="images">
                  {mapPoint.images.map((image, index) => {
                     return (
                        <button
                           key={image.id}
                           className={
                              activeImageIndex === index ? "active" : ""
                           }
                           type="button"
                           onClick={() => {
                              setActiveImageIndex(index);
                           }}
                        >
                           <img src={image.url} alt={mapPoint.reporterName} />
                        </button>
                     );
                  })}
               </div>
               <div className="orphanage-details-content">
                  <label className="title" htmlFor="name">
                     Description
                  </label>
                  <div className="input">
                     <h4>{mapPoint.description}</h4>
                  </div>
               </div>

               <div className="close">
                  <button className="button" onClick={onClose}>
                     Close
                  </button>
               </div>
            </div>
         </main>
      </div>
   );
};
