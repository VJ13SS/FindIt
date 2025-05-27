import "./manageBookingOrders.css";
import bookings from "./bookingsData";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";


//for managing the booking oredrs of each shop
export default function ManageBookingOrders() {

  const {backendUrl,userDetails} = useContext(AppContext)
  const [bookingsData, setBookingsData] = useState(bookings);
  const changeStatus = async (id, option) => {

    const response = await axios.post(backendUrl + '/api/shop/change-booking-order-status',{bookingId:id,status:option})

    console.log(response.data.message)
    getBookingsData()
  };

  const getBookingsData = async () => {
    const response = await axios.get(backendUrl + '/api/shop/get-all-booking-orders',{headers:{token:userDetails.token}} )
    if(response.data.success){
      setBookingsData(response.data.bookingOrders)
    }
    else{
      console.log(response.data.message)
    }
    
  }

  useEffect(()=>{
    getBookingsData()
  },[])

  return (
    <div className="bookings">
      <span>Booking Orders</span>

      <div className="bookings-list">
        {bookingsData.map((booking, indx) => {
          return (
            <div className="booking-order bookings-list-format">
              <span>User : {booking.userName}</span>
              <span>Email : {booking.userEmail}</span>
              <span>Contact : {booking.userContact}</span>
              <div className="booked-products">
                <span>Booked Items : </span>
                {booking.items}
              </div>
              {booking.status != 'Pending' ?<span className={`option ${booking.status === 'Accepted' ? 'accepted':'rejected'}`}>{booking.status}</span>
                :
              <div className="options">
                <span className="option" onClick={()=> changeStatus(booking._id,'Accepted')}>Accept</span>
                <span className="option" onClick={()=> changeStatus(booking._id,'Rejected')}>Reject</span>
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
