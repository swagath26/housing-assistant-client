import axios from "axios";

const Estimate = async (formData) => {

    const predict = async (query) => {
        const response = await axios.get(`https://swagath26.pythonanywhere.com/predict_price?${query}`);
        const data = response.data
        return data;
    };

    const query = `total_sqft=${formData.area || ''}&location=${formData.location || ''}&area_type=${formData.home_type || ''}&bath=${formData.bathrooms}&bedrooms=${formData.bedrooms}`
    const response = await predict(query);
    console.log(response);
    if (response.success === true)
        return response.estimated_price;
    else
        return 'ERR';
}

export default Estimate;