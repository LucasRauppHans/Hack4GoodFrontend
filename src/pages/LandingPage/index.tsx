import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { GarbageMap } from "../../components/Map";
import { Statistics } from "../../components/Statistics";
import api from "../../services/api";
import { MapPoints } from "../../interfaces/MapPoints";
import lixo1 from "../../images/lixo1.jpg";
import lixo2 from "../../images/lixo2.jpg";
import lixo3 from "../../images/lixo3.jpg";
import lixo4 from "../../images/lixo4.jpg";
import lixo5 from "../../images/lixo5.jpg";
import lixo6 from "../../images/lixo6.jpg";

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
                     <h1 className="green_text">
                        When we are all together, WeClean
                     </h1>
                     <p>
                        We connect volunteers that are willing to help clean up
                        the cities, send reports about areas with litter, or
                        both!{" "}
                     </p>
                     <p>You can also donate to our community</p>
                  </main>
                  <div className="buttons">
                     <button type="button" className="button">
                        <h2>About volunteering and more</h2>
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
               <div className="lateralMap">
                  <h1 className="MapDescription">
                     How to Report
                  </h1>
                  <div className="mapText">
                     <div>On the map, select the exact spot where you found litter.</div>
                     <div>After that, just fill the form and send it to our community. {" "}</div>
                  </div>
                  
               </div>
               <GarbageMap mapPoints={mapPoints} />
            </div>
            <div className="footer">
               <div className="footerline">
                  <img src={lixo1} className="trashImage" alt="lixo" />
                  <img src={lixo2} className="trashImage" alt="lixo" />
                  <img src={lixo3} className="trashImage" alt="lixo" />
                  <img src={lixo4} className="trashImage" alt="lixo" />
                  <img src={lixo5} className="trashImage" alt="lixo" />
                  <img src={lixo6} className="trashImage" alt="lixo" />
                  <img src={lixo4} className="trashImage" alt="lixo" />
                  <img src={lixo5} className="trashImage" alt="lixo" />
                  <img src={lixo6} className="trashImage" alt="lixo" />
                  <img src={lixo5} className="trashImage" alt="lixo" />
                  <img src={lixo6} className="trashImage" alt="lixo" />
               </div>
               <div className="footerline">
                  <img src={lixo1} className="trashImage" alt="lixo" />
                  <img src={lixo2} className="trashImage" alt="lixo" />
                  <img src={lixo3} className="trashImage" alt="lixo" />
                  <img src={lixo4} className="trashImage" alt="lixo" />
                  <img src={lixo5} className="trashImage" alt="lixo" />
                  <img src={lixo6} className="trashImage" alt="lixo" />
                  <img src={lixo4} className="trashImage" alt="lixo" />
                  <img src={lixo5} className="trashImage" alt="lixo" />
                  <img src={lixo6} className="trashImage" alt="lixo" />
                  <img src={lixo5} className="trashImage" alt="lixo" />
                  <img src={lixo6} className="trashImage" alt="lixo" />
               </div>
            </div>
         </div>
      </>
   );
}

export default Landing;
