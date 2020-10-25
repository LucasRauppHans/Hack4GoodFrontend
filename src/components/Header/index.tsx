import React from "react";
import logo from "../../images/logo.svg";
import "./Header.css";
import { AiOutlineInstagram } from "react-icons/ai";

export const Header: React.FC = () => {
   return (
      <div className="bar">
         <img src={logo} alt="logo" />
         <div className="insta">
            <AiOutlineInstagram color="black" size={30} />
            <h2 className="text">@WeClean</h2>
         </div>
      </div>
   );
};
