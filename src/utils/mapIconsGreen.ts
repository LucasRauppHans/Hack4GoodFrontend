import Leaflet from "leaflet";
import mapMarkerGreenImg from "../images/trashcan green.svg";

const mapIconGreen = Leaflet.icon({
   iconUrl: mapMarkerGreenImg,

   iconSize: [25, 25],
   iconAnchor: [0, 0],
   popupAnchor: [0, -60],
});

export default mapIconGreen;
