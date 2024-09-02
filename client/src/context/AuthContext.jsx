import {createContext, useState, useContext, useEffect} from 'react'
import { loginRequest, verifyTokenRequest } from '../admin/api/auth';
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
    const [loading, setLoading] = useState(true)

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
      async function checkLogin() {
        const cookies = Cookies.get()
        console.log(cookies)
        if(!cookies.token) {
            setIsAuthenticated(false)
            setLoading(false)
            return setUser(null)
            
        }
            try {
                const res = await verifyTokenRequest(cookies.token)
                console.log(res)
                if(!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;

                } 

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
            console.log(cookies.token)
      }
      checkLogin()
    }, [])
    

    return(
        <AuthContext.Provider value={{
            signin,
            user,
            isAuthenticated,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}