import axios from "axios"

const getUsers = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data )
}

export { getUsers }