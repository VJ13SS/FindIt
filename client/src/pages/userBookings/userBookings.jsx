import { useContext, useEffect, useState } from "react";
import "./userBookings.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import moment from "moment"

//for displaying the booking orders of registered users
export default function UserBookings() {
  const [userBookings, setUserBookings] = useState([]);
  const { backendUrl } = useContext(AppContext);

  const getBookingOrders = async () => {
    const response = await axios.post(
      backendUrl + "/api/user/get-booked-orders",
      { userEmail: JSON.parse(localStorage.getItem("userDetails")).user.email }
    );

    if (response.data.success) {
      setUserBookings(response.data.bookedOrders);
    }
  };

  useEffect(() => {
    getBookingOrders();
  }, []);

  return (
    <div className="user-bookings-container">
      <h2>Your Bookings</h2>
      <div className="user-bookings">
        {userBookings.map((booking, indx) => (
          <div className="booked-order" key={indx}>
            
            <span>Shop Name : {booking.shopName}</span>
            <span>Shop Email : {booking.shopEmail}</span>
            <span>Shop Contact : {booking.shopContact}</span>
           
            <p> Items : {booking.items}</p>
            <span>Booked {moment(booking.date).fromNow()}</span>
            <span
              className={`${
                booking.status === "Pending"
                  ? "pending"
                  : booking.status === "Accepted"
                  ? "accepted"
                  : "rejected"
              }`}
            >
              
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
