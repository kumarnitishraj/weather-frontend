import axios from "axios";
import { SERVER_BASE_API, LOCAL_BASE_API } from '../../../Config/String';

const BASE_API = LOCAL_BASE_API;

var api = axios.create({
    baseURL: BASE_API.URL
});

class Api {
    static headers() {
        return {
            'Authorization': BASE_API.AUTH_KEY,
        }
    }

    static get(route) {
        return this.request(route, null, 'GET');
    }

    static put(route, params) {
        return this.request(route, params, 'PUT')
    }

    static post(route, params) {
        return this.request(route, params, 'POST')
    }

    static delete(route, params) {
        return this.request(route, params, 'DELETE')
    }

    static request(route, params, verb) {
        const host = BASE_API.URL;
        const url = `${host}${route}`
        const options = {
            'method': verb,
            'data': params,
            enctype: 'multipart/form-data',
        }
        options.headers = Api.headers()
        return axios(url, options);
    }
}
export default Api;
