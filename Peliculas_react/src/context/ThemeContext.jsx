import { useContext, createContext, useState, useEffect } from "react";


export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')
    const changeTheme = () => {
        console.log(theme)
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
    }
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    } , [theme])
    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => {
    return useContext(ThemeContext)
}