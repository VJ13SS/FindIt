import { useContext } from 'react'
import './shopCard.css'
import {useNavigate} from "react-router-dom"
import { AppContext } from '../../context/AppContext'
export default function ShopCard({shop}){

    const {backendUrl} = useContext(AppContext)
    const navigate = useNavigate()
    return(
        <div className="shop-card" onClick={()=>navigate(`/visit-shop/${shop._id}`)}>
            <img src={backendUrl + '/files/' + shop.image} alt="" />
            <div className="shop-details">
                <h3>{shop.name}</h3>
                <p>{shop.address}</p>
                <span>City: {shop.city}</span>
                <span>Ph: {shop.contact}</span>
            </div>
        </div>
    )
}