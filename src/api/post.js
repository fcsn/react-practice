import axios from 'axios';

export const getAllPostsAPI = () => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts`)
}

export const getPostAPI = (num) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${num}`)
}

export const getPostAPIByUserId = (userId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
}
