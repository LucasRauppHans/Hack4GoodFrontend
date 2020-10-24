import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from "react-bootstrap/ProgressBar"
import { FiArrowRight, FiPlus } from "react-icons/fi";
import logoImg from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { GarbageMap } from "../../components/Map";
import { Statistics } from '../../components/Statistics';
import api from "../../services/api";
import { MapPoints } from "../../interfaces/MapPoints";


function Landing() {
   const [mapPoints, setMapPoints] = useState<MapPoints[]>([]);

   useEffect(() => {
      api.get("trashpoint").then((response) => {
         setMapPoints(response.data);
         console.log(response.data)
      });
   }, [mapPoints]);



   return (
      <>
         <div className="grid-container">
            <div className="infos">
               <div className="logo">
                  <div>{/* <img src={logoImg} alt="Happy" /> */}</div>
               </div>
               <div className="message">
                  <main>
                     <h1>Help us to make the world cleaner!</h1>
                     <p>Find someone who needs you.</p>

                  </main>
                  <Link to="/app" className="button">
                     {/* <FiArrowRight size={26} color="rgba(0,0,0,0.6)" /> */}
                     <p>Join us</p>
                  </Link>
               </div>

            </div>
            <div className="statisticContainer">
               <Statistics />
            </div>
            <div className="mapContainer">
               <GarbageMap mapPoints={mapPoints} />
            </div>
            <div>
               <p>Footer</p>
            </div>
         </div>
      </>
   );
}

export default Landing;
