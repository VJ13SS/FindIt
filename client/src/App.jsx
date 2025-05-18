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
import BookingPopup from "./components/bookingPopup/bookingPopup";

export default function App() {
  const { displayLoginPopUp, setDisplayLoginPopUp,displayBookingPopup } = useContext(AppContext);
  const [products,setProducts] = useState([])
  console.log(products)
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
              <Route path="bookings" element={<Bookings />} />
            </Route>
          </Routes>
          {displayBookingPopup && <BookingPopup />}
          
          <Footer />
        </div>
      )}
    </>
  );
}
