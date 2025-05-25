import { useParams } from "react-router-dom";
import "./viewShop.css";
import productsData from "./shopProducts";
import { useContext,useEffect,useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

export default function ViewShop() {
  const { id } = useParams();
  const {backendUrl} = useContext(AppContext)

  const [bookItems,setBookedItems] = useState([])

  const getShopdetails = async () => {
    const response = await axios.post(backendUrl + '/api/shop/get-shop-by-id',{shopId:id})
    console.log(response)
  }
  useEffect(()=>{
    getShopdetails()
  },[])
  
  return (
    <div className="view-shop">
      <div className="shop-header">
        <img src="/Images/FindIt.svg" alt="" />
        <div className="header-data">
          <span>Sumangali Furnitures</span>
          <span>Court Road Alathur</span>
          <span>Alathur,Palakkad</span>
          <span>1234567890</span>
        </div>
      </div>
      {/*Shop Description */}
      <p className="shop-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla
        aliquam ut architecto culpa itaque beatae laudantium maiores modi qui
        delectus iste debitis, eos ea quidem dicta aliquid magnam eum.
      </p>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Availability</th>
            <th>Book Item</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product, indx) => (
            <tr>
              <td>
                <img src={product.img} alt="" />
              </td>
              <td>
                <span>{product.name}</span>
              </td>
              <td>
                <span className={product.status === 'Available'?'available':'not-available'}>{product.status}</span>
              </td>
              <td>
                {product.status === 'Available'? <input type="checkbox" onChange={()=>setBookedItems(prev => ([...prev,product.name]))}/> :<span>...</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={()=>console.log(bookItems)}>Book Your Products?</button>
    </div>
  );
}
