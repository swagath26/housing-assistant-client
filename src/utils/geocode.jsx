import axios from "axios";

const geocode = async (address) => {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const lat = response.data[0]?.lat;
    const lng = response.data[0]?.lon;
    return [lat, lng];
};

export default geocode;