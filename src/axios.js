// This enables us to interact with the APIs on the server-side

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : `https://api.covid19api.com/`
})

export default axiosInstance;