import Leaflet from "leaflet";
import mapMarkerRedImg from "../images/trashcan red.svg";

const mapIconRed = Leaflet.icon({
   iconUrl: mapMarkerRedImg,

   iconSize: [25, 25],
   iconAnchor: [0, 0],
   popupAnchor: [0, -60],
});

export default mapIconRed;
