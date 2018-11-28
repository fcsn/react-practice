import axios from 'axios'

export const getUsersAPI = () => {
    return axios.get(`https://jsonplaceholder.typicode.com/users`)
}

export const getUserAPI = (userId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
}
