import { useContext, useState } from "react";
import LoginPopUp from "./components/LoginPopUp/loginPopUp";
import Navbar from "./components/navbar/navbar";
import { AppContext } from "./context/AppContext";
import Hero from "./components/hero/hero";
import Shops from "./shops/shops";
import Footer from "./components/footer/footer";
import DevelopersNote from "./components/note/developersNote";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import ViewShop from "./components/viewShop/viewShop";

export default function App(){
  const {displayLoginPopUp,setDisplayLoginPopUp} = useContext(AppContext)
  return (
    <>
    {displayLoginPopUp ? <LoginPopUp />:<div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visit-shop/:id" element={<ViewShop />} />
      </Routes>
      <Footer />
      
    </div>}</>
    
  )
}