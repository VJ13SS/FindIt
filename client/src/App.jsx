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
import UserBookings from "./pages/userBookings/userBookings";
import 'react-toastify/dist/ReactToastify.css'
import AddEvents from "./pages/addEvents/addEvents";
import ManageEvents from "./pages/manageEvents/manageEvents";
import ManageBookingOrders from "./pages/manageBookingOrders/manageBookingOrders";
import ShopBookings from "./pages/shopBookings/shopBookings";

export default function App() {
  const { displayLoginPopUp } = useContext(AppContext);
  const [products,setProducts] = useState([])
  
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
              <Route path="add-items" element={<AddItems setProducts={setProducts}/>} />
              <Route path="manage-items" element={<ManageItems products ={products} setProducts={setProducts}/>} />
              <Route path="booking-orders" element={<ManageBookingOrders />} />
              <Route path="add-events" element={<AddEvents />} />
              <Route path="manage-events" element={<ManageEvents />} />
              <Route path="shop-bookings" element={<ShopBookings />} />
            </Route>
            <Route path="/customer-bookings" element={<UserBookings />} />
          </Routes>
          
          <Footer />
        </div>
      )}
    </>
  );
}
