import axios from 'axios'

const API_URL = 'http://localhost:9000/api/package/'

//create package

const createPackage = async (newPackage, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, newPackage, config)

    return response.data
}
//get all user packages

const getPackages = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}
const packageService = {
    createPackage,
    getPackages
}
export default packageService