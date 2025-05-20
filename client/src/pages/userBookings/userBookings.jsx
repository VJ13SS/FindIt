import './userBookings.css'
import userBookingsData from './userBookingsData'

export default function UserBookings(){
    return(
        <div className="user-bookings">
            <span>Your Bookings</span>
            {userBookingsData.map((booking,indx) => (
                <div>
                    <span>{booking.shop}</span>
                    <span>{booking.location}</span>
                    <span>{booking.phone}</span>
                    <div>
                    {booking.products.map((product) => (<span>{product}</span>))}
                    </div>
                    
                </div>
            ))}
        </div>
    )
}