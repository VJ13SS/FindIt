import { useNavigate } from 'react-router-dom'
import productsData from '../../pages/viewShop/shopProducts'
import './bookingPopup.css'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

export default function BookingPopup(){
    const products = productsData
    const navigate = useNavigate()
    const {setDisplayBookingPopup} = useContext(AppContext)
    const handleClose = () => {
        setDisplayBookingPopup(false)
        document.body.classList.remove('no-scroll')
    }

    return(
        <div className="booking-popup-container">
            
            <div className="booking-popup">
                <img className='cross-icon'src="/Images/cross_icon.png" alt="" onClick={handleClose}/>
                <span>Book your items</span>
                <div className="booking-products">
                {productsData.map((product,indx) => (
                    <div className='booking-product'>
                        <img src={product.img} alt="" />
                        <span>{indx + 1}{product.name}</span>
                        {product.status === 'Available' && <input type='checkbox'/>}
                    </div>
                ))}
                </div>
                

                <form action="">
                    <span>Enter Your Contact Details</span>
                    <input type="text" placeholder='Enter Your Name: ' required/>
                    <input type="email" placeholder='Enter Your Email' required />
                    <input type="number" placeholder='Enter Your Contact Number: ' required />
                    <button>Book Your Order</button>
                </form>
            </div>
        </div>
    )
}