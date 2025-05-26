import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./navbar.css";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  //<span>Sumangali furnitures</span>

  const { searchTypedItem,searchItem,setSearchItem,setDisplayLoginPopUp,setUserLogin,setShopLogin,setCurrentState,userDetails,setUserDetails,backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const userLoginHandler = () => {
    setUserLogin(true)
    setShopLogin(false)
    setCurrentState('login')
    setDisplayLoginPopUp(true)
  }
  const shopLoginHandler = () => {
    setShopLogin(true)
    setUserLogin(false)
    setDisplayLoginPopUp(true)
    setCurrentState('login')
  }

  const logOutHandler = () => {
    setUserDetails({})
    localStorage.removeItem('userDetails')
    navigate('/')
  }

  

  return (
    <nav>
      <div className="nav-left">
        <img src="/Images/FindIt.svg" alt="" onClick={() => navigate("/")} />
      </div>
      <div className="nav-right">
        
        <div className="search-container">
          <input type="text" placeholder="Find It" onChange={(e)=>setSearchItem(e.target.value)} value={searchItem}/>
          <a href="#shops">
          <img src="/Images/search_icon.png" alt="" onClick={()=>searchTypedItem(searchItem)}/></a>
        </div>

        
        <div className="login-options-container">
        {localStorage.getItem("userDetails") ? <span>{userDetails.name}</span>:<><span onClick={userLoginHandler}>User Login</span>
          <span>/</span>
          <button className="log-in" onClick={shopLoginHandler}>
            Shop Login
          </button></>}
          
          {localStorage.getItem("userDetails") && <div className="login-options">
            {userDetails.userType === "shop" ?  <span onClick={()=> navigate('/dashboard/add-items')}>Dashboard</span>: <span onClick={()=> navigate('/customer-bookings')}>Bookings</span>}
            <span className="log-out" onClick={logOutHandler}>LogOut</span>
          </div>}
          
        </div>
      </div>
    </nav>
  );
}
