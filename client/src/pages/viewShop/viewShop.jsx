import { useParams } from "react-router-dom";
import "./viewShop.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import EventCard from "../../components/eventCard/eventCard";

export default function ViewShop() {
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [bookItems, setBookedItems] = useState([]);
  const [shopDetails, setShopDetails] = useState({});
  const [shopProducts, setShopProducts] = useState([]);
  const [shopEvents, setShopEvents] = useState([]);

  const getShopdetails = async (id) => {
    const response = await axios.post(backendUrl + "/api/shop/get-shop-by-id", {
      shopId: id,
    });
    if (response.data.success) {
      setShopDetails((prev) => ({
        ...prev,
        name: response.data.shopDetails.shop.name,
        image: response.data.shopDetails.shop.image,
        address: response.data.shopDetails.shop.address,
        city: response.data.shopDetails.shop.city,
        contact: response.data.shopDetails.shop.contact,
        description: response.data.shopDetails.shop.description,
      }));
      setShopProducts(response.data.shopDetails.displayProducts);
      setShopEvents(response.data.shopDetails.displayEvents);
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    getShopdetails(id);
  }, []);

  return (
    <div className="view-shop">
      <div className="shop-header">
        <img src={backendUrl + "/files/" + shopDetails.image} alt="" />
        <div className="header-data">
          <span>{shopDetails.name}</span>
          <span>{shopDetails.address}</span>
          <span>{shopDetails.city}</span>
          <span>{shopDetails.contact}</span>
        </div>
      </div>
      {/*Shop Description */}
      <p className="shop-description">{shopDetails.description}</p>
      <div className="shop-items">
      {shopEvents.length > 0 && <div className="shop-events">
          {shopEvents.map((event,indx) => (<EventCard event={event} key={indx} />))}
        </div>}
        {shopProducts.length > 0 ? 
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Status</th>
              <th>Book Item</th>
            </tr>
          </thead>
          <tbody>
            {shopProducts.map((product, indx) => (
              <tr key={indx}>
                <td>
                  <img src={backendUrl + "/files/" + product.image} alt="" />
                </td>
                <td>
                  <span>{product.name}</span>
                </td>
                <td>
                  <span>{product.price}</span>
                </td>
                <td>
                  <span
                    className={
                      product.status === "Available"
                        ? "available"
                        : "not-available"
                    }
                  >
                    {product.status}
                  </span>
                </td>
                <td>
                  {product.status === "Available" ? (
                    <input
                      type="checkbox"
                      onChange={() =>
                        setBookedItems((prev) => [...prev, product.name])
                      }
                    />
                  ) : (
                    <span>...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>:<span>No Products Available</span>}
        
        
      </div>

      <button onClick={() => console.log(bookItems)}>
        Book Your Products?
      </button>
    </div>
  );
}
