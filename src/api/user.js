import axios from 'axios'

export const getAllUsersAPI = () => {
    return axios.get(`https://jsonplaceholder.typicode.com/users`)
}

export const getUserAPIByUserId = (userId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
}
