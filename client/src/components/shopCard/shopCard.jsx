import './shopCard.css'
import {useNavigate} from "react-router-dom"
export default function ShopCard({shop}){

    const navigate = useNavigate()
    return(
        <div className="shop-card" onClick={()=>navigate('/visit-shop/67')}>
            <img src={shop.img} alt="" />
            <div className="shop-details">
                <h3>{shop.name}</h3>
                <p>{shop.address}</p>
                <span>City: {shop.city}</span>
                <span>Ph: {shop.contact}</span>
            </div>
        </div>
    )
}