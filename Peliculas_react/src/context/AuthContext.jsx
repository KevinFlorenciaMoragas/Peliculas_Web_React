import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [userId, setUserId] = useState(null)
    const token = Cookies.get('token')
    useEffect(()=> {
        if(token){
            const decoded = jwtDecode(token)
            setUser(decoded.username)
            setRole(decoded.role)
            setUserId(decoded.userId)
        }
    },[])
    const login = (token) => {
        const decoded = jwtDecode(token)
        setRole(decoded.role)
        setUser(decoded.username)
        setUserId(decoded.userId)
    }
    const logout = () => {
        setUser(null)
        setRole(null)
        setUserId(null)
        Cookies.remove('token')
    }
    return (
        <AuthContext.Provider value={{user,role,userId,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}