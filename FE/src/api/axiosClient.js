import axios from "axios";
const BASE_URL ="http://localhost:3000/api"

const axiosClient = axios.create({
    baseURL: BASE_URL,
})


axiosClient.interceptors.request.use(async (config) => {
    const authToken =  JSON.parse(localStorage.getItem("user"))
    if ((config.method === 'delete' || config.method === 'put' || config.method === 'post') && authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    return config;
});

axiosClient.interceptors.response.use(res => {
    if(res && res.data){
        return res.data
    }
    return res
},
    err => {
    window.location.href="not-found"
    throw(err)
}
)

export default axiosClient