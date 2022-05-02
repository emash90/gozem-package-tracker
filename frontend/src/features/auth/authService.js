import axios from 'axios'

const API_URL = 'http://localhost:9000/api/user/register'

//register user

const register = async(userData) => {
    const response = await axios.post(API_URL, userData)


    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
const authService ={
    register,
}
export default authService
