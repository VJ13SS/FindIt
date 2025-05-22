import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const [currentState,setCurrentState] = useState('login')
    const [displayLoginPopUp,setDisplayLoginPopUp] = useState(false)
    const [displayBookingPopup,setDisplayBookingPopup] = useState(false)
    const [userLogin,setUserLogin] = useState(false)
    const [shopLogin,setShopLogin] = useState(false)
    const backendUrl = 'http://localhost:5000'

    const value = {
        currentState,setCurrentState,
        displayLoginPopUp,setDisplayLoginPopUp,
        displayBookingPopup,setDisplayBookingPopup,
        userLogin,setUserLogin,
        shopLogin,setShopLogin,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
}