import React from "react";
import TableComponent from "../components/TableComponent";
import Filters from "../components/Filters";
import { Outlet } from "react-router-dom";

const Crypto: React.FC = () => {
  return (
      <section className="w-[80%] mx-auto h-full flex flex-col mt-16 mb-24 relative">
        <Filters />
        <TableComponent />
        <Outlet />
      </section>
  );
};

export default Crypto;
