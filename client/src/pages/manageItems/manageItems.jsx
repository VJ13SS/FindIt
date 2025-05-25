import { useContext, useEffect, useState } from "react";
import "./manageItems.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

export default function ManageItems() {
  const { backendUrl, userDetails } = useContext(AppContext);
  const [shopProducts, setShopProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(backendUrl + "/api/shop/get-products", {
      headers: { token: userDetails.token },
    });
    if (response.data.success) {
      setShopProducts(response.data.products);
    } else {
      console.log(response.data.message);
    }
  };

  const changeProductStatus = async (id, status) => {
    const response = await axios.post(
      backendUrl + "/api/shop/update-product-status",
      {
        product_id: id,
        status: status,
      }
    );
    console.log(response.data.message);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="manage-items">
      <span>All Products</span>

      <div className="products-list">
        <div className="header products-list-format">
          <span>Image</span>
          <span>Name</span>
          <span>Price</span>
          <span>Status</span>
        </div>

        {shopProducts.map((product, indx) => (
          <div className="product products-list-format" key={indx}>
            <img src={backendUrl + "/files/" + product.image} alt="" />
            <span>{product.name}</span>
            <span>{product.price}</span>
            <div className="product-status-container">
              <span
                className={`${
                  product.status === "Available"
                    ? "available"
                    : product.status === "Not-available"
                    ? "not-available"
                    : "hidden"
                }`}
              >
                {product.status}
              </span>
              <div className="product-options">
                <span
                  className="available"
                  onClick={() => changeProductStatus(product._id, "Available")}
                >
                  Available
                </span>
                <span
                  className="not-available"
                  onClick={() =>
                    changeProductStatus(product._id, "Not-available")
                  }
                >
                  Not-Available
                </span>
                <span
                  className="hidden"
                  onClick={() => changeProductStatus(product._id, "Hidden")}
                >
                  Hide Product
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
