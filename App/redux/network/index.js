import Api from '../api/api';
import { HOME_URL } from '../../../Config/String'

module.exports = {
    getWeatherInfo: function () {
        return Api.get(HOME_URL.WEATHER).then(res=>res.data);
    },
    save: function (params) {
        var formData = new FormData();
        formData.append('day_name', params.day_name);
        formData.append('temperature', params.temperature);
        formData.append('weather', params.weather);
        return Api.post(HOME_URL.WEATHER, formData).then(res => res.data);
    },
};