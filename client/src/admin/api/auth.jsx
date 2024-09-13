import axios from './axios'

export const loginRequest = async(userData) => {
    try {
        return await axios.post('/login', userData)
    } catch (error) {
        console.log(error)
    }
}

export const registerRequest = async(user) => {
    try {
        return await axios.post('/register', user)
    } catch (error) {
        console.log(error)
    }
}

export const verifyTokenRequest = () => axios.get('/verify')

export const logoutRequest = async () => {
    try {
        return await axios.post('/logout');
    } catch (error) {
        console.error(error);
    }
}