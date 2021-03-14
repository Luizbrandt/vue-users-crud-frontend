//Axios Import
import axios from 'axios';

//Export URL for other components
export const http = axios.create({
    baseURL: 'https://users-simple-crud.herokuapp.com'
})