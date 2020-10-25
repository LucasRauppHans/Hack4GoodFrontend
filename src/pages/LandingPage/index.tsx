import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { makeStyles } from "@material-ui/core/styles";
// import logoImg from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { GarbageMap } from "../../components/Map";
import { Statistics } from "../../components/Statistics";
import api from "../../services/api";
import { MapPoints } from "../../interfaces/MapPoints";

function Landing() {
   const [mapPoints, setMapPoints] = useState<MapPoints[]>([]);

   useEffect(() => {
      api.get("trashpoint").then((response) => {
         setMapPoints(response.data);
         console.log(response.data);
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
                     <h1 className="green_text">When we are all together, WeClean</h1>
                     <p >We connect volunteers that are willing to help clean up the cities, send reports about areas with litter, or both! </p>
                     <p>You can also donate to our community</p>
                  </main>
                  <div className="buttons">
                     <button type="button" className="button">
                        <h2>More information</h2>
                     </button>
                     <button type="button" className="button">
                        <a
                           className="link"
                           href="https://crowdsofts.com/?gclid=CjwKCAjwoc_8BRAcEiwAzJevtamlVZojuxc_gtqcKvTQnO07yk-cSvrNXpB4OuAVHCMJMYCRdoHWexoCB6gQAvD_BwE"
                        >
                           <h2>Donate</h2> 
                        </a>
                     </button>
                  </div>
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
