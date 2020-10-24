import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapIcon from "../../utils/mapIconsGreen";
import "./CreateReportModal.css";
import { LeafletMouseEvent } from "leaflet";
import api from "../../services/api";
import { FiPlus } from "react-icons/fi";

interface CreateReportModalProps {
   onClose: () => void;
}

export const CreateReportModal: React.FC<CreateReportModalProps> = ({
   onClose,
}) => {
   const [currentLatitude, setCurrentLatitude] = useState<number>(-30.1084987);
   const [currentLongitude, setCurrentLongitude] = useState<number>(-51.317225);

   const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [description, setDescription] = useState("");
   const [severity, setSeverity] = useState("");
   const [images, setImages] = useState<File[]>([]);
   const [previewImages, setPreviewImages] = useState<string[]>([]);

   async function handleSubmit(event: FormEvent) {
      event.preventDefault();
      const { latitude, longitude } = position;

      const data = new FormData();
      data.append("reporterName", name);
      data.append("reporterContact", email);
      data.append("latitude", String(latitude));
      data.append("longitude", String(longitude));
      data.append("description", description);
      data.append("severity", severity);
      data.append("assignee", " ");
      data.append("assigneeContact", " ");
      data.append("progress", "created");
      images.forEach((image) => {
         data.append("images", image);
      });

      console.log(data);

      await api.post("trashpoint", data);
      alert("Cadastro realizado com sucesso");
      onClose();
   }

   function handleMapClick(event: LeafletMouseEvent) {
      const { lat, lng } = event.latlng;
      setPosition({
         latitude: lat,
         longitude: lng,
      });
   }

   function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
      if (!event.target.files) return;
      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);
      const selectedImagesPreview = selectedImages.map((image) => {
         return URL.createObjectURL(image);
      });
      setPreviewImages(selectedImagesPreview);
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

   return (
      <>
         <main>
            <form className="reportForm">
               <fieldset>
                  <Map
                     center={[currentLatitude, currentLongitude]}
                     style={{ width: "100%", height: 250 }}
                     zoom={16}
                     onClick={handleMapClick}
                  >
                     <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                     />

                     {position.latitude !== 0 && (
                        <Marker
                           interactive={false}
                           icon={mapIcon}
                           position={[position.latitude, position.longitude]}
                        />
                     )}
                  </Map>

                  <div className="inputContainer">
                     <label htmlFor="name">Name</label>
                     <input
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                     />
                  </div>

                  <div className="inputContainer">
                     <label htmlFor="email">Email</label>
                     <input
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                     />
                  </div>

                  <div className="inputContainer">
                     <label htmlFor="description">Description</label>
                     <input
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                     />
                  </div>

                  <div className="inputContainer">
                     <label htmlFor="severity">Severity</label>
                     <select
                        className="severityDropdown"
                        onChange={(event) => setSeverity(event.target.value)}
                     >
                        <option value="Low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                     </select>
                  </div>

                  <div className="inputContainer">
                     <label htmlFor="images">Fotos</label>

                     <div className="imagesContainer">
                        {previewImages.map((image) => {
                           return <img key={image} src={image} alt={name} />;
                        })}
                        <label htmlFor="image[]" className="new-image">
                           <FiPlus size={24} color="#15b6d6" />
                        </label>
                     </div>
                     <input
                        multiple
                        type="file"
                        id="image[]"
                        onChange={handleSelectImages}
                     />
                  </div>
               </fieldset>
               <div className="buttons">
                  <button
                     className="confirmButton"
                     type="button"
                     onClick={handleSubmit}
                  >
                     Confirmar
                  </button>
                  <button
                     className="closeButton"
                     type="button"
                     onClick={onClose}
                  >
                     close
                  </button>
               </div>
            </form>
         </main>
      </>
   );
};
