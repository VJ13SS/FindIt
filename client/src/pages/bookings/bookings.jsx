import "./bookings.css";
import bookings from "./bookingsData";
import { useState } from "react";

export default function Bookings() {

  const [bookingsData, setBookingsData] = useState(bookings);
  const changeStatus = (id, option) => {
    const modified = bookingsData.map((booking) =>
      booking.id === id ? {...booking, status: option } : booking
    );
    setBookingsData(modified);
  };


  return (
    <div className="bookings">
      <span>Bookings</span>

      <div className="bookings-list">
        {bookingsData.map((booking, indx) => {
          return (
            <div className="booking-order bookings-list-format">
              <span>{booking.name}</span>
              <span>{booking.email}</span>
              <span>{booking.phone}</span>
              <div className="booked-products">
                {booking.produts.map((product, indx) => (
                  <span className="booked-product">{product}</span>
                ))}
              </div>
              <div className="options">
                <span className={`option ${booking.status === 'accepted' ? 'accepted':''}`} onClick={()=> changeStatus(booking.id,'accepted')}>Accept</span>
                <span className={`option ${booking.status === 'rejected' ? 'rejected':''}`} onClick={()=> changeStatus(booking.id,'rejected')}>Reject</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
