import axios from "axios"
import Constents from "./constents";

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
            if(error.response && error.response.status === 400){
                window.showSnack("Bad Request (Missing Dependecy)!".toUpperCase(), {variant:"error"})
            }else if(error.response && error.response.status === 401){
                localStorage.removeItem("token")
                this.setAuth(Constents.getUserDetails())
            }else{
                window.showSnack(error.response?.data?.message?.toUpperCase() || "Internal server error!".toUpperCase(), {variant:"error"})
            }
            return Promise.reject(error);
            // eslint-disable-next-line
        }.bind(this));
    }

    listProduct() {
        return axios.get(`${this.baseUrl}/product/list`)
    }
    addProduct(data) {
        return axios.post(`${this.baseUrl}/product/add`, data)
    }
    getProductDetails(id, adminId) {
        return axios.get(`${this.baseUrl}/product/details/${id}${adminId ? `?adminId=${adminId}` : ''}`)
    }
    updateProduct(data) {
        return axios.put(`${this.baseUrl}/product/update`, data)
    }
    listUser(role, city) {
        let query = `?role=${role}`
        if (role === 2 && city) {
            query += `&city=${city}`
        }
        return axios.get(`${this.baseUrl}/user/list${role !== undefined ? query : ""}`)
    }
    getCitys() {
        return axios.get(`${this.baseUrl}/city`)
    }
    userLogin(data) {
        return axios.post(`${this.baseUrl}/user/login`, data)
    }
    createUser(data) {
        return axios.post(`${this.baseUrl}/user/create`, data)
    }
    createOrder(data) {
        return axios.post(`${this.baseUrl}/order/create`, data)
    }
    fetchGallery() {
        return axios.get(`${this.baseUrl}/media/`)
    }
    fileUpload(file) {
        return axios.post(`${this.baseUrl}/media/upload`, file)
    }
    getCategory() {
        return axios.get(`${this.baseUrl}/category/list`)
    }
    createCategory(data) {
        return axios.post(`${this.baseUrl}/category/create`, data)
    }
    listOrder(query) {
        return axios.get(`${this.baseUrl}/order/list${query}`)
    }
    getOrderDetails(id) {
        return axios.get(`${this.baseUrl}/order/details/${id}`)
    }
    updateOrder(data) {
        return axios.put(`${this.baseUrl}/order/update/`, data)
    }
    updateStock(data) {
        return axios.put(`${this.baseUrl}/stock/update`, data)
    }
    listStock(userId){
        return axios.get(`${this.baseUrl}/stock/list` + (userId ? `?userId=${userId}` : ""))
    }
    removeOrder(orderId){
        return axios.delete(`${this.baseUrl}/order/${orderId}`)
    }
    getStockDetails(userId, productId){
        return axios.get(`${this.baseUrl}/stock/details?userId=${userId}&productId=${productId}`)
    }
}


const apiHelper = new ApiHelper()

export default apiHelper
