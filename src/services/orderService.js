import axios from 'axios'

const ORDERS_API_BASE_URL = 'http://localhost:8080/api/orders'

class orderServce{
    getOrders(){
        return axios.get(ORDERS_API_BASE_URL);
    }
    

}

export default new orderServce()