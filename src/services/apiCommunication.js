//Import Base URL from config module
import { http } from './configUrl';

//Export API methods
export default{
    
    create_user: async (endpoint, data) => {
        return await http.post(endpoint, data);
    },

    list_users: async (endpoint) => {
        return await http.get(endpoint);
    },

    delete_user: async (endpoint, data) => {
        return await http.delete(endpoint, data);
    },

    edit_user: async (endpoint, data) => {
        return await http.put(endpoint, data);
    },
}