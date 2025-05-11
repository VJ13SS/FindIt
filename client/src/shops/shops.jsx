import ShopCard from '../components/shopCard/shopCard'
import data from './shopData'
import './shops.css'

export default function Shops(){
    return(
        <div className="shops">
            <h2>Shops Near You!</h2>
            <div className='shop-cards'>
            {data.map((shop,indx) => (<ShopCard shop={shop} key={indx}/>))}
            </div>
            
        </div>
    )
}