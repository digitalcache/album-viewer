import axios from "axios"

const getAlbums = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/albums').then(res => res.data )
}

export { getAlbums }