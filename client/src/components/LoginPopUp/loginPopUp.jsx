import { useContext, useState } from "react";
import "./loginPopUp.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios"
import { toast } from "react-toastify";

export default function LoginPopUp() {
  const {
    currentState,
    setCurrentState,
    setDisplayLoginPopUp,
    userLogin,
    shopLogin,
    backendUrl,
    setUserLogin,
    setShopLogin,
  } = useContext(AppContext);

  const [image, setImage] = useState(false);
  const [data, setData] = useState({});

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if(userLogin){
      if(currentState === 'sign-in'){
        const response = await axios.post(backendUrl + '/api/user/sign-up',data)
      }
    }
    
  }

  return (
    <div className="login-popup-container">
      <form className="login-popup" onSubmit={(e) => onSubmitHandler(e)}>
        <img
          src="/Images/cross_icon.png"
          className="cross-icon"
          alt=""
          onClick={() => setDisplayLoginPopUp(false)}
        />
        {currentState === "sign-in" && (
          <input
            type="text"
            placeholder={userLogin ?'Name of User: ':"Name of the Shop: "}
            name="name"
            required
            onChange={(e) => onChangeHandler(e)}
          />
        )}
        <input
          type="email"
          placeholder="Email Id: "
          name="email"
          required
          onChange={(e) => onChangeHandler(e)}
        />
        <input
          onChange={(e) => onChangeHandler(e)}
          type="password"
          placeholder={
            currentState === "login"
              ? "Password: "
              : "Password(Minimum 8 characters): "
          }
          name="password"
          required
        />
        {currentState == "sign-in" && shopLogin && (
          <>
            <input
              type="text"
              placeholder="Shop Address: "
              onChange={(e) => onChangeHandler(e)}
              required
              name="address"
            />
            <input
              type="text"
              placeholder="City(Eg: Alathur,Palakkad): "
              required
              onChange={(e) => onChangeHandler(e)}
              name="city"
            />
            <input
              type="number"
              name="contact_number"
              id=""
              onChange={(e) => onChangeHandler(e)}
              required
              placeholder="Contact Number: "
            />
            <div className="img-upload">
              <label htmlFor="shop-image">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "/Images/profile_icon.png"
                  }
                  alt=""
                />
              </label>
              <p>{image ? image.name : "Upload Image of your Shop"}</p>
              <input
                type="file"
                required
                id="shop-image"
                name=""
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
              
            </div>
          </>
        )}

        {currentState === "login" ? (
          <p>
            Create New Account?{" "}
            <span onClick={() => setCurrentState("sign-in")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("login")}>Login Here</span>
          </p>
        )}

        <p>
        <input type="checkbox" name="" id="" required />
          I am agreeing to all terms and conditions
        </p>
        <button>
          {currentState === "login" ? "Login" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
