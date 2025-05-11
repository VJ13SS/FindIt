import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./navbar.css";

export default function Navbar() {
  //<span>Sumangali furnitures</span>

  const { displayLoginPopUp, setDisplayLoginPopUp } = useContext(AppContext);

  return (
    <nav>
      <div className="nav-left">
        <img src="/Images/FindItLogo.png" alt="" />
      </div>
      <div className="nav-right">
        <div className="search-container">
          <input type="text" placeholder="Find It" />
          <img src="/Images/search_icon.png" alt="" />
        </div>

        <button className="login" onClick={() => setDisplayLoginPopUp(true)}>Login</button>
      </div>
    </nav>
  );
}
