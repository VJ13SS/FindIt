import { useContext, useState } from "react";
import LoginPopUp from "./components/LoginPopUp/loginPopUp";
import Navbar from "./components/navbar/navbar";
import { AppContext } from "./context/AppContext";
import Footer from "./components/footer/footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import ViewShop from "./components/viewShop/viewShop";
import Dashboard from "./pages/dashboard/dashboard";
import AddItems from "./pages/addItems/addItems";
import ManageItems from "./pages/manageItems/manageItems";
import Bookings from "./pages/bookings/bookings";

export default function App() {
  const { displayLoginPopUp, setDisplayLoginPopUp } = useContext(AppContext);
  return (
    <>
      {displayLoginPopUp ? (
        <LoginPopUp />
      ) : (
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visit-shop/:id" element={<ViewShop />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-items" element={<AddItems />} />
              <Route path="manage-items" element={<ManageItems />} />
              <Route path="bookings" element={<Bookings />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}
