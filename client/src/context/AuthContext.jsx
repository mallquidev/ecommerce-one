import {createContext, useState, useContext, useEffect} from 'react'
import { loginRequest, verifyTokenRequest, logoutRequest } from '../admin/api/auth';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

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
    const navigate = useNavigate(); 

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            
            
            if (res.data && res.data.token) {
                Cookies.set('token', res.data.token); 
                setIsAuthenticated(true);
                setUser(res.data.user);
                navigate('/admin/dashboard'); 
            } else {
                throw new Error('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en signin:', error.response ? error.response.data : error.message);
            setIsAuthenticated(false);
        }
    };
    useEffect(() => {
      async function checkLogin() {
        const cookies = Cookies.get()
        
        if(!cookies.token) {
            setIsAuthenticated(false)
            setLoading(false)
            return setUser(null)
            
        }
            try {
                const res = await verifyTokenRequest(cookies.token)
                
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
            
      }
      checkLogin()
    }, [])

    const logout = async () => {
        try {
            await logoutRequest(); 
            Cookies.remove('token'); 
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login'); 
        } catch (error) {
            console.error('Error en logout:', error);
        }
    };
    

    return(
        <AuthContext.Provider value={{
            signin,
            user,
            isAuthenticated,
            loading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}