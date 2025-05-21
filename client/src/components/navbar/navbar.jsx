import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  //<span>Sumangali furnitures</span>

  const { displayLoginPopUp, setDisplayLoginPopUp } = useContext(AppContext);
  const navigate = useNavigate();
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
          <button className="log-in" onClick={() => setDisplayLoginPopUp(true)}>
            Login
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
