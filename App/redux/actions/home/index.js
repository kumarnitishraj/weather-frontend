import network from '../../network';
import { 
    GET_WEATHER_LIST,
    NETWORK_ERROR,
} from '../../../../Config/String'

export const getWeatherInfo = (auth, params) => {
    return dispatch => {
        
        network.getWeatherInfo()
            .then((response) => {
                dispatch({
                    type: `${GET_WEATHER_LIST}_SUCCESS`,
                    payload:response
                    
                })
            })
            .catch((error) => {
                dispatch({
                    type: NETWORK_ERROR,
                    payload: error.response
                })
            })
    }
}
