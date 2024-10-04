import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [role, setRole] = useState(null)
    useEffect(()=> {
        const token = Cookies.get('token')
        console.log(token)
        if(token){
            const decoded = jwtDecode(token)
            setUser(decoded.username)
            setRole(decoded.role)
            console.log(role)
        }
    },[])
    const login = (token) => {
        console.log("Estoy en login")
        console.log(token)
        const decoded = jwtDecode(token)
        console.log(decoded)
        setRole(decoded.role)
        setUser(decoded.username)
    }
    const logout = () => {
        setUser(null)
        Cookies.set(null)
    }
    return (
        <AuthContext.Provider value={{user,role,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}