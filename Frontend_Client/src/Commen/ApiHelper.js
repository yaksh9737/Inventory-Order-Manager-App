import axios from "axios"
import Constents from "./Constents";

class ApiHelper {
    constructor() {
        // this.baseUrl = "http://localhost:5000"
        // this.baseUrl  = "http://192.168.29.33:5000"
        // this.baseUrl  = "http://api.mevadakalgitea.scriptscholer.in"
        this.baseUrl  = "https://inventory-order-management-1-z6ss.onrender.com"


        axios.interceptors.request.use(function (config) {
            config.headers.set("token", localStorage.getItem("token"))
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        axios.interceptors.response.use((function (response) {
            return response;
            // eslint-disable-next-line
        }).bind(this), function (error) {
            console.log(error)
            if(error.response && error.response.status === 401){
                localStorage.removeItem("token")
                this.setAuth(Constents.getUserDetails())
            }
            return Promise.reject(error);
            // eslint-disable-next-line
        }.bind(this));
    }

    getCitys() {
        return axios.get(`${this.baseUrl}/city`)
    }
    createUser(data) {
        return axios.post(`${this.baseUrl}/user/create`, data)
    }
    userLogin(data) {
        return axios.post(`${this.baseUrl}/user/login`, data)
    }
    listUser(city) {
        let role = 1
        let query = `?role=${role}`
        return axios.get(`${this.baseUrl}/user/list${role !== undefined ? query : ""}`)
    }
    listProduct(distributorId){
        let query = `?userId=${distributorId}`
        return axios.get(`${this.baseUrl}/stock/list${distributorId !== undefined ? query : ""}`)
    }
    listProductById(id){
        let query = `?id=${id}`
        return axios.get(`${this.baseUrl}/stock/listbyid${id !== undefined ? query : ""}`)
    }
    createOrder(data){
        return axios.post(`${this.baseUrl}/order/create`, data)
    }
    listOrder(query) {
        return axios.get(`${this.baseUrl}/order/list${query}`)
    }
    updateOrder(data){
        return axios.put(`${this.baseUrl}/order/update` , data)
    }
}


const apiHelper = new ApiHelper()

export default apiHelper
