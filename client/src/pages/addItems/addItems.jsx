import { useState, useEffect, useContext } from "react";
import "./addItems.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

export default function AddItems({ setProducts }) {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    product: "",
    price: "",
  });

  const { dashBoardOption, setDashBoardOption, backendUrl, userDetails } =
    useContext(AppContext);

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formData = new FormData();

  formData.append("product", data["product"]);
  formData.append("price", data["price"]);
  formData.append("image", image);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if(!image){
      alert('Upload Image')
      return
    }
    const response = await axios.post(
      backendUrl + "/api/shop/add-product",
      formData,
      { headers: { token: userDetails.token } }
    );
    console.log(response.data);
    setProducts((prev) => [...prev, formData]);
    setData({
      product: "",
      price: "",
    });
    setImage(false);
  };

  useEffect(() => {
    setDashBoardOption("add-items");
  }, []);

  return (
    <div className="add-items">
      <form action="" onSubmit={onSubmitHandler}>
        <label htmlFor="product-image">
          <span>Upload the Product Image</span>
          <img
            src={image ? URL.createObjectURL(image) : "/Images/upload_area.png"}
            alt=""
          />
        </label>
        <input
          type="file"
          id="product-image"
          required
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <span>Product Name</span>
        <input
          type="text"
          placeholder="Type here "
          name="product"
          onChange={onChangeHandler}
          value={data.product}
          required
        />
        <span>Price</span>
        <input
          type="number"
          placeholder="2000 "
          name="price"
          onChange={onChangeHandler}
          value={data.price}
          required
        />
        <button>Add</button>
      </form>
    </div>
  );
}
