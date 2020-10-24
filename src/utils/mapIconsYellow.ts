import Leaflet from "leaflet";
import mapMarkerYellowImg from "../images/trashcan yellow.svg";

const mapIconYellow = Leaflet.icon({
   iconUrl: mapMarkerYellowImg,

   iconSize: [25, 25],
   iconAnchor: [0, 0],
   popupAnchor: [0, -60],
});

export default mapIconYellow;
