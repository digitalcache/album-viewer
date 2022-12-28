import axios from "axios"

const getUsers = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/users').then((res: any) => res.data )
}

export { getUsers }