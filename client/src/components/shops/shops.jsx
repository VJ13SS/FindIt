import { useContext, useEffect, useState } from "react";
import ShopCard from "../shopCard/shopCard";
import "./shops.css";
import { AppContext } from "../../context/AppContext";


export default function Shops() {
  const { getAllShops, shops, setShops, backendUrl } = useContext(AppContext);

  useEffect(() => {
    getAllShops();
  }, []);

  return (
    <div className="shops" id="shops">
      {shops.length > 0 ?<h2>Some Of Our Registered Shops!</h2>:<h2>Your Search Results</h2>}
      {shops.length > 0 ?
      <div className="shop-cards">
        {shops.map((shop, indx) => (
          <ShopCard shop={shop} key={indx} />
        ))}
      </div> : <span>Sorry...No Shops Available</span>}
    </div>
  );
}
