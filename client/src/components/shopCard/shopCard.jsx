import './shopCard.css'

export default function ShopCard({shop}){
    return(
        <div className="shop-card" onClick={()=>console.log(shop)}>
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