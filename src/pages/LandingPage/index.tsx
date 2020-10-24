import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { FiArrowRight } from "react-icons/fi";
import logoImg from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { GarbageMap } from "../../components/Map";
import api from "../../services/api";
import { MapPoints } from "../../interfaces/MapPoints";

function Landing() {
   const [mapPoints, setMapPoints] = useState<MapPoints[]>([]);

   useEffect(() => {
      api.get("orphanages").then((response) => {
         setMapPoints(response.data);
      });
   }, []);

   return (
      <>
         <div className="grid-container">
            <div className="infos">
               <div className="logo">
                  <div>
                     <img src={logoImg} alt="Happy" />
                  </div>
               </div>
               <div className="massage">
                  <main>
                     <h1>Help us to make the world cleaner!</h1>
                     <p>Find someone who needs you.</p>
                  </main>

                  <Link to="/app" className="button">
                     {/* <FiArrowRight size={26} color="rgba(0,0,0,0.6)" /> */}
                     <text>Join us</text>
                  </Link>
               </div>
            </div>
            <div className="statisticContainer">
               <text>Insert statistics</text>
            </div>
            <div className="mapContainer">
               <GarbageMap mapPoints={mapPoints} />
            </div>
            <div>
               <text>Footer</text>
            </div>
         </div>
      </>
   );
}

export default Landing;
