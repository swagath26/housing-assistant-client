import axios from "axios";
import { useRef, useState } from "react";

const PriceEstimator = () => {

    const estimateFormRef = useRef(null);

    const [formData, setFormData] = useState({
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        home_type: '',
    })

    const handleDataEntry = (event) => {
        const {name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const predict = async (query) => {
        const response = await axios.get(`https://swagath26.pythonanywhere.com/predict_price?${query}`);
        const data = response.data
        return data;
    };

    const IndianRupeeFormatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      });

    const handleEstimate = async () => {
        const query = `total_sqft=${formData.area}&location=${formData.location}&area_type=${formData.home_type}&bath=${formData.bathrooms}&bedrooms=${formData.bedrooms}`
        const response = await predict(query);
        console.log(response)
        if (response.success === true)
            setEstimatedprice(IndianRupeeFormatter.format(response.estimated_price));
        else
            setEstimatedprice('API error');
    }

    const [estimatedPrice, setEstimatedprice] = useState('');

    return (
        <div>
            <h1 className="my-4 px-5">Estimate Price for Your property</h1>
            <form id="estimate-form" ref={estimateFormRef} className="sell-form needs-validation ps-5 pe-lg-2 pe-5 flex-column" noValidate>

                <div className="my-4 col-lg-4">
                    <div className="input-group">
                        <label className="input-group-text" htmlFor="hometype">Home Type</label>
                        <select className="form-control-sellpage w-50 py-1" id="hometype" 
                            name="home_type" value={formData.home_type} onChange={handleDataEntry}>
                            <option value=''>Choose...</option>
                            <option>House</option>
                            <option>Apartment</option>
                            <option>Studio</option>
                            <option>Multi-Family</option>
                        </select>
                    </div>
                </div>

                <div className="my-3">
                    <div className={`d-flex col-lg-6 form-group-sellpage ${formData.bedrooms ? 'filled' : ''}`} >
                        <input type="number" className="form-control form-control-sellpage w-50" id="bedrooms"
                            name="bedrooms" value={formData.bedrooms} onChange={handleDataEntry} required/>
                        <label htmlFor="bedrooms" className="sellpage-label">No. of Bedrooms *</label>
                        <div className="invalid-feedback mx-2 p-2 w-50">Provide a valid number</div>
                    </div>
                </div>
                                
                <div className="my-3">
                    <div className={`d-flex col-lg-6 form-group-sellpage ${formData.bathrooms ? 'filled' : ''}`} >
                        <input type="number" className="form-control form-control-sellpage w-50" id="bathrooms" 
                            name="bathrooms" value={formData.bathrooms} onChange={handleDataEntry} required/>
                        <label htmlFor="bathrooms" className="sellpage-label">No. of Bathrooms *</label>
                        <div className="invalid-feedback mx-2 p-2 w-50">Provide a valid number</div>
                    </div>
                </div>

                <div className="my-4">
                    <div className={`d-flex col-lg-6 form-group-sellpage ${formData.area ? 'filled' : ''}`} >
                        <input type="number" className="form-control form-control-sellpage w-50" id="area"
                            name="area" value={formData.area} onChange={handleDataEntry} required/>
                        <label htmlFor="area" className="sellpage-label">Area *</label><span className="input-group-text">Sqft</span>
                        <div className="invalid-feedback mx-2 p-2 w-50">Provide a valid number</div>
                    </div>
                </div>

                <div className="my-4">
                    <div className={`d-flex form-group-sellpage ${formData.location ? 'filled' : ''}`}>
                        <input type="text" className="form-control form-control-sellpage w-50" id="location" 
                            name="location" value={formData.location} onChange={handleDataEntry} required/>
                        <label htmlFor="location" className="sellpage-label">Location</label>
                        <div className="invalid-feedback px-2 p-2 w-25">Invalid Location</div>
                    </div>
                </div>


                <div className="my-4">
                    <div className="d-flex justify-content-between">

                        <button type="submit" className="btn btn-success" 
                            onClick={(event) => {
                                estimateFormRef.current.classList.add('was-validated');
                                event.preventDefault();
                                if(estimateFormRef.current.checkValidity()) {
                                    handleEstimate();
                                }
                            }}>
                            Estimate
                        </button>
                        
                    </div>
                </div>
            </form>

            <div className="px-5 my-5 fs-2">
                Estimated Price: {estimatedPrice}
            </div>
        </div>
    )
}

export default PriceEstimator;