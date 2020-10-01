import axios from 'axios'

const apikey = '772b13f6'

const api = axios.create({
    baseURL: `http://www.omdbapi.com/?apikey=${apikey}`
})

export default api