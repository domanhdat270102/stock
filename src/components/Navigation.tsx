import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="w-[40%] flex border mt-16 justify-around align-middle rounded-lg border-cyan">
      <NavLink
        to="/"
        end
        className={({ isActive }) => {
          return `w-full m-2.5 text-center text-base ${
            isActive
              ? "bg-cyan text-gray-300"
              : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
          } border-0 cursor-pointer rounded capitalize font-semibold'>`;
        }}
      >
        Crypto
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `w-full m-2.5 text-center text-base ${
            isActive
              ? "bg-cyan text-gray-300"
              : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
          } border-0 cursor-pointer rounded capitalize font-semibold'>`;
        }}
      >
        trending
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `w-full m-2.5 text-center text-base ${
            isActive
              ? "bg-cyan text-gray-300"
              : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
          } border-0 cursor-pointer rounded capitalize font-semibold'>`;
        }}
      >
        saved
      </NavLink>
    </nav>
  );
};

export default Navigation;
