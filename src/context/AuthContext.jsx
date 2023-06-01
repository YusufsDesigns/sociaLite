import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { auth } from "../firebase"

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        return () => {
            unSub()
        }
    }, [])
    
    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.object.isRequired
}
