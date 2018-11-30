import axios from 'axios'

export const getAllPhotos = () => {
    return axios.get('https://jsonplaceholder.typicode.com/photos')
}

export const getPhotosByAlbumId = (albumId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
}
