import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";
import { TrendingProvider } from "../context/TrendingContext";
import { StorageProvider } from "../context/StorageContext";

const Home: React.FC = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <main className="w-full h-full flex flex-col items-center relative text-white first-letter:">
            <div className="w-screen h-screen bg-gray-300 -z-10 fixed"></div>
            <Logo />
            <Navigation />
            <Outlet />
          </main>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
