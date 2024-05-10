

import axios from 'axios'
const BASE_URL='http://localhost:4500/api/v1'

export default axios.create({
  baseURL:BASE_URL,
 withCredentials: true 
})


