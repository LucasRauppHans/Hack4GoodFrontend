import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { GarbageMap } from "../../components/Map";
import { Statistics } from "../../components/Statistics";
import api from "../../services/api";
import { MapPoints } from "../../interfaces/MapPoints";
import lixo1 from "../../images/lixo1.jpg";
import lixo2 from "../../images/lixo2.jpg";
import lixo3 from "../../images/lixo3.jpg";
import limpo1 from "../../images/863cd90e-6f1c-470f-b299-5befb418523c.jpg";
import limpo2 from "../../images/denisse-leon-KaZ88TwgYhA-unsplash.jpg";
import limpo3 from "../../images/isaac-sloman-9CuyHFUinFI-unsplash.jpg";
import setaDireita from "../../images/iconmonstr-arrow-17.svg";

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
                        <a
                           className="link"
                           href="https://drive.google.com/file/d/1GdZD2C-eFikm32FXLTx-ZoivgU_s4Xkr/view"
                        >
                           <h2>About volunteering and more</h2>
                        </a>
                     </button>
                     <button type="button" className="button">
                        <a className="link" href="https://www.vakinha.com.br/">
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
                  <h1 className="MapDescription">How to Report</h1>
                  <div className="mapText">
                     <div>
                        On the map, select the exact spot where you found
                        litter.
                     </div>
                     <div>
                        After that, just fill the form and send it to our
                        community.{" "}
                     </div>
                  </div>
               </div>
               <GarbageMap mapPoints={mapPoints} />
            </div>
            <div className="footer">
               <div className="footerTitle">
                  <h1>Spots We Cleaned</h1>
               </div>
               <div className="footerline">
                  <div className="compare">
                     <img src={lixo1} className="trashImage" alt="lixo" />
                     <img src={setaDireita} alt="seta" className="arrow" />
                     <img src={limpo1} className="trashImage" alt="lixo" />
                  </div>
                  <div className="compare">
                     <img src={lixo2} className="trashImage" alt="lixo" />
                     <img src={setaDireita} alt="seta" className="arrow" />
                     <img src={limpo2} className="trashImage" alt="lixo" />
                  </div>
                  <div className="compare">
                     <img src={lixo3} className="trashImage" alt="lixo" />
                     <img src={setaDireita} alt="seta" className="arrow" />
                     <img src={limpo3} className="trashImage" alt="lixo" />
                  </div>
               </div>
               <div className="footerMessage">
                  <div className="footerText">
                     <h2>
                        Our main goal is to make the world a better place to
                        live! With your help, we can keep our cities clean and
                        environmentally friendlier.
                     </h2>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Landing;
