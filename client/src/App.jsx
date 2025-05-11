import { useContext, useState } from "react";
import LoginPopUp from "./components/LoginPopUp/loginPopUp";
import Navbar from "./components/navbar/navbar";
import { AppContext } from "./context/AppContext";
import Hero from "./components/hero/hero";
import Shops from "./shops/shops";

export default function App(){
  const {displayLoginPopUp,setDisplayLoginPopUp} = useContext(AppContext)
  return (
    <>
    {displayLoginPopUp ? <LoginPopUp />:<div className="app">
      <Navbar />
      <Hero />
      <Shops />
      
    </div>}</>
    
  )
}