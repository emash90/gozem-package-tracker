import axios from 'axios'

const API_URL = 'http://localhost:9000/api/users/'

//register user

const register = async(userData) => {
    const response = await axios.post(API_URL + 'register', userData)


    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//login user
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)


    if(response.data) {
        const data = JSON.stringify(response.data)
        localStorage.setItem('user', data)
        localStorage.setItem('userType', JSON.stringify(response.data.userType))
    }
    return response.data
}
//logout user
const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
}

const authService ={
    register, logout, login
}
export default authService
