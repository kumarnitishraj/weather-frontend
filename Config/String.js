export const SERVER_BASE_API = {
    URL: "http://xxxxxxxxx/api/",
    AUTH_KEY:"JWT ...."
} 

export const LOCAL_BASE_API = {
    URL: "http://192.168.0.2:8000/api/",
    AUTH_KEY: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im5pdGlzaEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im5pdGlzaCIsImV4cCI6MTU0MDQ0Mjk2MX0.Z6yJ2ofQGn9c33MCDVMfgTzzzIVSA18ttsbS3I2o-KY"
} 


export const HOME_URL = {
    WEATHER:'home/',
}


/* ---------------- Home  Reducer -------- */


export const GET_WEATHER_LIST = '@auth-action-GET_WEATHER_LIST';
export const NETWORK_ERROR = '@axios-action-NETWORK_ERROR';


