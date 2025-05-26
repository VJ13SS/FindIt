import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [currentState, setCurrentState] = useState("login");
  const [displayLoginPopUp, setDisplayLoginPopUp] = useState(false);
  const [displayBookingPopup, setDisplayBookingPopup] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [shopLogin, setShopLogin] = useState(false);
  const backendUrl = "http://localhost:5000";
  const [userDetails, setUserDetails] = useState({});
  const [dashBoardOption, setDashBoardOption] = useState("add-items");
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate()
  const [shops, setShops] = useState([]);

  const searchTypedItem = async () => {
    const response = await axios.post(backendUrl + '/api/user/search' ,{searchedItem:searchItem})
    if (response.data.success) {
      setShops(response.data.results);
    } else {
      alert(response.data.message);
      console.log(response.data.message)
    }
    navigate('/')
    setSearchItem('')
  }

  
    const getAllShops = async () => {
      const response = await axios.get(backendUrl + "/api/shop/get-all-shops");
      if (response.data.success) {
        setShops(response.data.shops);
      } else {
        console.log(response.data.message);
      }
    };

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      setUserDetails((prev) => ({
        ...prev,
        token: JSON.parse(localStorage.getItem("userDetails")).token,
        id: JSON.parse(localStorage.getItem("userDetails")).user._id,
        address: JSON.parse(localStorage.getItem("userDetails")).user.address,
        city: JSON.parse(localStorage.getItem("userDetails")).user.city,
        contact: JSON.parse(localStorage.getItem("userDetails")).user.contact,
        email: JSON.parse(localStorage.getItem("userDetails")).user.email,
        image: JSON.parse(localStorage.getItem("userDetails")).user.image,
        name: JSON.parse(localStorage.getItem("userDetails")).user.name,
        userType: JSON.parse(localStorage.getItem("userDetails")).userType,
        description: JSON.parse(localStorage.getItem("userDetails")).user
          .description
          ? JSON.parse(localStorage.getItem("userDetails")).user.description
          : "",
      }));
    }
  }, [localStorage.getItem("userDetails")]);

  const value = {
    currentState,
    setCurrentState,
    displayLoginPopUp,
    setDisplayLoginPopUp,
    displayBookingPopup,
    setDisplayBookingPopup,
    userLogin,
    setUserLogin,
    shopLogin,
    setShopLogin,
    backendUrl,
    userDetails,
    setUserDetails,
    dashBoardOption,
    setDashBoardOption,
    searchItem,
    setSearchItem,
    searchTypedItem,
    shops,setShops,getAllShops
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
