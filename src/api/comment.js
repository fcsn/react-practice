import axios from 'axios';

export const getAllCommentsAPI = () => {
    return axios.get('https://jsonplaceholder.typicode.com/comments')
}

export const getCommentAPIByPostId = postId => {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
}
