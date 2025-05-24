import { useContext, useEffect, useState } from "react";
import products_list from "./manageArray";
import "./manageItems.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

export default function ManageItems() {
  const { backendUrl, userDetails } = useContext(AppContext);
  const [shopProducts, setShopProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(backendUrl + "/api/shop/get-products", {
        headers: { token: userDetails.token },
      });
      if (response.data.success) {
        setShopProducts(response.data.products);
      } else {
        console.log(response.data.message);
      }
      console.log(shopProducts);
    };

    getProducts();
  }, []);

  return (
    <div className="manage-ietms">
      <span>All Products</span>

      <div className="products-list">
        <div className="header products-list-format">
          <span>Image</span>
          <span>Name</span>
          <span>Price</span>
          <span>Status</span>
        </div>

        {products_list.map((product, indx) => (
          <div className="product products-list-format">
            <img src={product.product_image} alt="" />
            <span>{product.product_name}</span>
            <span>{product.price}</span>
            <div className="product-status-container">
            <span
              className={`${
                product.status === "available" ? "available" : "not-available"
              }`}
            >
              {product.status}
            </span>
            <div className="product-options">
              <span className="available">Available</span>
              <span className="not-available">Not-Available</span>
              <span className="hide">Hide</span>
            </div>
            </div>
            
            
          </div>
        ))}
      </div>
    </div>
  );
}
