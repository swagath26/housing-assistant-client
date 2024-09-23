import axios from "axios";
import getCookie from './getCookie';

const handleDelete = async (id) => {
    const csrftoken = getCookie('csrftoken');
    
    try {
        const response = await axios.delete(`/api/properties_list/${id}/`, 
            {headers: { 'X-CSRFToken': csrftoken }}
        );
        console.log(response);
        if(response.status===204) {
            return {
                success: true
            };
        }
        else {
            window.alert('An unexpected error caused..');
            return {
                success: false
            }
        }
    }
    catch (error) {
        let errorMessage = 'An error occured..';
        if (error.response) {
            console.log(error.response);
        } 
        else {
            errorMessage += `\n${error.message}`;
        }
        console.log(error);
        window.alert(errorMessage);
        return {
            success: false
        }
    }
};

export default handleDelete;