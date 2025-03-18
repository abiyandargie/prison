import axios from 'axios'
const BASE_URL='http://localhost:5000';
const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
    },

});
axiosInstance.interceptors.request.use((config)=>{
    const accessToken=localStorage.getItem("token");
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}` ;
    }
    return config;

},
(error)=>{
    return Promise.reject(error);
})

export default axiosInstance;