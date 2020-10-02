import axios from 'axios'

const apikey = 'YOUR_KEY'

const api = axios.create({
    baseURL: `http://www.omdbapi.com/?apikey=${apikey}`
})

export default api