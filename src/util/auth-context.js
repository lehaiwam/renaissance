import React, { createContext, useState } from "react";

export const AuthContext = createContext({
    id : '',
    firstName: '',
    lastName : '',
    authLevel: 0,
    authUser: {},
    setAuthUser: () => {},
})

export function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState({});
    
    const value = {
        id : '',
        firstName: '',
        lastName : '',
        authLevel: 0,
        authUser: authUser,
        setAuthUser: setAuthUser,
    }

    return (
        <AuthContext.Provider value={ value } >
            { children }
        </AuthContext.Provider>
    )
}
