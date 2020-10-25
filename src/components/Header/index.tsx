import React from "react";
import logo from "../../images/logo.svg";
import "./Header.css";

export const Header: React.FC = () => {
   return (
      <div className="bar">
         <img src={logo} alt="logo" />
      </div>
   );
};
