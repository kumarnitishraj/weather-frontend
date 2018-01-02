
import { 
    GET_WEATHER_LIST,
    NETWORK_ERROR,
} from "../../../../Config/String";

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case `${GET_WEATHER_LIST}_SUCCESS`:
            return{
                ...state,
                weather:action.payload,
                loaded:true,
            }
        
        case NETWORK_ERROR:
            return {
                ...state,
                error: action.payload.data,
                errorStatus:true,
            }

        default:
            return state
    }
}