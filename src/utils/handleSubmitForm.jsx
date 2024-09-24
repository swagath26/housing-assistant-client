import axios from "axios";
import getCookie from './getCookie';

const handleSubmitForm = async (formData) => {
    const csrftoken = getCookie('csrftoken');
    const data = new FormData();
    for (const key in formData) {
        if (key !== 'images') {
            data.append(key, formData[key]);
        }
    }
    formData.images.forEach((image, index) => {
        data.append('images', image, `images[${index}]`);
    });
    try {
        const response = await axios.post('/api/properties_list/', data, 
            {headers: { 'X-CSRFToken': csrftoken }}
        );
        console.log(response);
        if(response.status===201) {
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
            console.log(error.response.data);
            console.log(error);
            Object.entries(error.response.data).forEach(([key, value]) => {
                console.log(`\n${key}: ${value}`);
                if (key === 'detail') errorMessage += `\n${value}`;
                else errorMessage += `\n${key} is invalid`;
            })
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

export default handleSubmitForm;