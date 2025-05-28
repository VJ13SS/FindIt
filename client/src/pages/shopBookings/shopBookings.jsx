import { useContext, useEffect, useState } from "react";
import "./shopBookings.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

//for displaying the booking orders of registered shops.
//Ecah shop can book their products from other shops

export default function ShopBookings() {
  const { backendUrl, userDetails } = useContext(AppContext);
  const [shopBookings, setShopBookings] = useState([]);

  const getBookingOrders = async () => {
    const response = await axios.post(
      backendUrl + "/api/user/get-booked-orders",
      { userEmail: userDetails.email }
    );
    setShopBookings(response.data.bookedOrders);
  };
  useEffect(() => {
    getBookingOrders();
  }, []);
  return (
    <div className="shop-bookings">
      <span>Your Bookings</span>
      <div className="booked-orders">
        {shopBookings.map((booking, indx) => (
          <div className="booked-order" key={indx}>
            <span>Shop Name : {booking.shopName}</span>
            <span>Shop Email : {booking.shopEmail}</span>
            <span>Shop Contact : {booking.shopContact}</span>
            <p> Items : {booking.items}</p>
            
           <span className={`${booking.status === "Pending" ? 'pending' : booking.status === 'Accepted' ? 'accepted' :'rejected'}`}>{booking.status}</span>
            
          </div>
        ))}
      </div>
    </div>
  );
}
