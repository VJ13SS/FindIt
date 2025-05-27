import "./userBookings.css";
import userBookingsData from "./userBookingsData";

//for displaying the booking orders of registered users
export default function UserBookings() {
  return (
    <div className="user-bookings-container">
      <h2>Your Bookings</h2>
      <div className="user-bookings">
        {userBookingsData.map((booking, indx) => (
          <div className="user-booking">
            <span>Shop : {booking.shop}</span>
            <span>Location : {booking.location}</span>
            <span>Contact : {booking.phone}</span>
            <span>Products: </span>
            <div className="booked-products">
              {booking.products.map((product) => (
                <span>{product} ,</span>
              ))}
            </div>
            <span className={`${booking.staus === "accepted" ? "accepted" :"rejected"}`}>Booking {booking.staus}</span>
          </div>
          
        ))}
      </div>
    </div>
  );
}
