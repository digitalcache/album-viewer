import axios from "axios"

const getPhotos = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/photos').then(res => res.data )
}

export { getPhotos }