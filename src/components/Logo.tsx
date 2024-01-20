import React from "react";
import { Link } from "react-router-dom";
import LogoSvg from "../assets/logo.svg";

const Logo: React.FC = () => {
  return (
    <Link
      to={"/"}
      className="absolute top-[1.5rem] left-[1.5rem] text-lg flex items-center text-cyan"
    >
      <img src={LogoSvg} alt="CryptoBucks" />
      <div>CryptoBucks</div>
    </Link>
  );
};

export default Logo;
