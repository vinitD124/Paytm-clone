import axios from 'axios'

export const axiosInstnace = axios.create({})

export const apiConnector = (method,url,bodyData,headers,params) =>{
    return axiosInstnace({
        method:`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData : null,
        headers:headers ? headers : null,
        params:params ? params : null,
    })
}