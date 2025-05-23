import { useContext, useState } from "react";
import LoginPopUp from "./components/LoginPopUp/loginPopUp";
import Navbar from "./components/navbar/navbar";
import { AppContext } from "./context/AppContext";
import Footer from "./components/footer/footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import ViewShop from "./pages/viewShop/viewShop";
import Dashboard from "./pages/dashboard/dashboard";
import AddItems from "./pages/addItems/addItems";
import ManageItems from "./pages/manageItems/manageItems";
import Bookings from "./pages/bookings/bookings";
import UserBookings from "./pages/userBookings/userBookings";
import Events from "./pages/events/events";
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const { displayLoginPopUp, setDisplayLoginPopUp,displayBookingPopup,userDetails } = useContext(AppContext);
  const [products,setProducts] = useState([])
  console.log(products,userDetails)
  return (
    <>
      {displayLoginPopUp ? (
        <LoginPopUp />
      ) : (
        <div className="app">
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visit-shop/:id" element={<ViewShop />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-items" element={<AddItems setProducts={setProducts}/>} />
              <Route path="manage-items" element={<ManageItems products ={products} setProducts={setProducts}/>} />
              <Route path="booking-orders" element={<Bookings />} />
              <Route path="events" element={<Events />} />
            </Route>
            <Route path="/customer-bookings" element={<UserBookings />} />
          </Routes>
          
          <Footer />
        </div>
      )}
    </>
  );
}
