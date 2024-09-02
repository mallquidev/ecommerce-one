import {createContext, useState, useContext, useEffect} from 'react'
import { loginRequest } from '../admin/api/auth';
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const signin = async(user) => {
        try {
            const res = await loginRequest(user)
            console.log(`la respuesta es ${res}`)
            console.log(res)
            setIsAuthenticated(true)
        } catch (error) {
            
           console.error(error.response.data)
        }
    }
    useEffect(() => {
      const cookies = Cookies.get()
      console.log(cookies)
      if(cookies.token) {
        console.log(cookies.token)
      }
    }, [])
    

    return(
        <AuthContext.Provider value={{
            signin,
            user,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}