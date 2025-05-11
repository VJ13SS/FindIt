import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const [currentState,setCurrentState] = useState('login')
    const [displayLoginPopUp,setDisplayLoginPopUp] = useState(false)

    const value = {
        currentState,setCurrentState,
        displayLoginPopUp,setDisplayLoginPopUp
    }

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
}