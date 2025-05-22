import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  //<span>Sumangali furnitures</span>

  const { displayLoginPopUp, setDisplayLoginPopUp,setUserLogin,setShopLogin,setCurrentState } = useContext(AppContext);
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

  return (
    <nav>
      <div className="nav-left">
        <img src="/Images/FindIt.svg" alt="" onClick={() => navigate("/")} />
      </div>
      <div className="nav-right">
        <div className="search-container">
          <input type="text" placeholder="Find It" />
          <img src="/Images/search_icon.png" alt="" />
        </div>

        <div className="login-options-container">
          <span onClick={userLoginHandler}>User Login</span>
          <span>/</span>
          <button className="log-in" onClick={shopLoginHandler}>
            Shop Login
          </button>
          
          <div className="login-options">
            <span>Options</span>
            <span className="log-out">LogOut</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
