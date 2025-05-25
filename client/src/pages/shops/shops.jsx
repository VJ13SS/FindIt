import { useContext, useEffect, useState } from "react";
import ShopCard from "../../components/shopCard/shopCard";
import "./shops.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

export default function Shops() {
  const { backendUrl } = useContext(AppContext);
  const [shops, setShops] = useState([]);
  const getAllShops = async () => {
    const response = await axios.get(backendUrl + "/api/shop/get-all-shops");
    if (response.data.success) {
      setShops(response.data.shops);
    } else {
      console.log(response.data.message);
    }
  };
  useEffect(() => {
    getAllShops();
  }, []);

  return (
    <div className="shops">
      <h2>Shops Near You!</h2>
      <div className="shop-cards">
        {shops.map((shop, indx) => (
          <ShopCard shop={shop} key={indx} />
        ))}
      </div>
    </div>
  );
}
